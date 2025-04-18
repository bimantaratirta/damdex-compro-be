import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder().setTitle('API Damdex').setDescription('Documentation list API that Damdex website used').build();

export default swaggerConfig;
