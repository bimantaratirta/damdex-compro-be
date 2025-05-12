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
}
