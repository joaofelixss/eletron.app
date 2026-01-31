import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { memoryStorage } from 'multer'; // <--- IMPORTANTE: Usar Memória, não Disco

@Controller('uploads')
export class UploadsController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // <--- O arquivo fica na memória RAM temporariamente
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Envia para o Cloudinary
    const result = await this.cloudinaryService.uploadImage(file);

    // Retorna a URL segura (HTTPS) que funciona em qualquer lugar
    return {
      url: result.secure_url,
      filename: result.public_id,
    };
  }
}
