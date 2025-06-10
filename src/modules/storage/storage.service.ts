import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as Minio from 'minio';
import { extname } from 'path';
import storageConfig from 'src/config/storage.config';
import internal from 'stream';

class StorageFile {
    buffer: Buffer;
    contentType: string;
    metadata?: Map<string, string>;
}

@Injectable()
export class StorageService {
    private minioClient: Minio.Client;
    private bucketName: string;
    
    constructor() {
        this.minioClient = new Minio.Client({
            endPoint: storageConfig().IS3_END_POINT,
            secretKey: storageConfig().IS3_SECRET_ACCESS_KEY_ID,
            accessKey: storageConfig().IS3_ACCESS_KEY_ID,
            port: 443,
            useSSL: true,
        });

        this.bucketName = storageConfig().IS3_BUCKET_NAME;
    }

    async save(path: string, contentType: string, file: Express.Multer.File): Promise<string> {
        const metadata: Minio.ItemBucketMetadata = {
          contentType,
        };
    
        const randomString = randomBytes(8).toString('hex');
        const fileName = `${randomString}-${Date.now()}${extname(file.originalname)}`;
        const pathFile: string = path.length > 0 ? `${path}/${fileName}` : fileName;
    
        await this.minioClient.putObject(this.bucketName, pathFile, file.buffer, file.size, {
            ...metadata,
        });
    
        return `${pathFile}`;
    }

    async getPresignedUrl(path: string) {
        return await this.minioClient.presignedUrl('GET', this.bucketName, path, 86400);
    }
    
    async get(path: string): Promise<StorageFile> {
        const file: internal.Readable = await this.minioClient.getObject(this.bucketName, path);
    
        const buffer: Buffer = Buffer.concat(await file.toArray());
    
        const tags: Minio.BucketItemStat = await this.minioClient.statObject(this.bucketName, path);
        const metaData: [string, string][] = Object.entries(tags.metaData || {}).map((iterator) => [iterator[0], String(iterator[1])]);
    
        const storageFile: StorageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.contentType = tags.metaData['contenttype'];
        storageFile.metadata = new Map<string, string>(metaData);
        return storageFile;
    }
    
    async remove(path: string): Promise<void> {
        await this.minioClient.removeObject(this.bucketName, path, {
            forceDelete: true,
        });
    }

    async savePublicImage(path: string, contentType: string, file: Express.Multer.File) {
        // Define metadata for the object, including content type and the public-read ACL.
        // The 'x-amz-acl' header is crucial for setting public readability.
        const metadata: Minio.ItemBucketMetadata = {
            'Content-Type': contentType, // Use 'Content-Type' as the key
            'x-amz-acl': 'public-read'  // This header makes the file public-read
          };
      
          const randomString = randomBytes(8).toString('hex');
          const fileName = `${randomString}-${Date.now()}${extname(file.originalname)}`;
          const pathFile: string = path.length > 0 ? `${path}/${fileName}` : fileName;
      
          try {
              // Upload the object with the specified path, buffer, size, and metadata.
              // The metadata now includes the 'x-amz-acl': 'public-read' header.
              await this.minioClient.putObject(this.bucketName, pathFile, file.buffer, file.size, metadata);
          
              // Return the full URL to the uploaded file if your Minio client setup supports it
              // or a path that can be used to construct the public URL.
              // For S3-compatible services, the public URL is usually:
              // http(s)://<endpoint>/<bucketName>/<pathFile>
              return `${pathFile}`; // Or construct the full public URL if available
          } catch (error) {
              console.error('Error uploading file to Minio:', error);
              throw new Error('Failed to upload file.');
          }
    }

    async uploadPublicImage(file: Express.Multer.File) {
        const pathPublicImage = 'public';
        const pathFile = await this.savePublicImage(pathPublicImage, file.mimetype, file);
        
        const body = {
            publicUrl: `https://${storageConfig().IS3_END_POINT}/${this.bucketName}/${pathFile}`,
            path: pathFile,
        }
    
        return body;
    }
}
