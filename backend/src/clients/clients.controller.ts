import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, // <--- Importante: Adicionado Query
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() body: any) {
    // Extrai o userId do corpo e o resto é o DTO do cliente
    const { userId, ...createClientDto } = body;
    return this.clientsService.create(createClientDto, userId);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    // Pega o userId da URL (ex: GET /clients?userId=xyz)
    return this.clientsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
