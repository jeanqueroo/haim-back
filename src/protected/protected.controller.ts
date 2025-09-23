import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../infrastructure/auth/roles.decorator';
import { RolesGuard } from '../infrastructure/auth/roles.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getData() {
    return { msg: 'Ruta protegida 🚀' };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('admin')
  getAdminData() {
    return { msg: 'Ruta solo para administradores 🔐' };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'vendedor')
  @Get('vendedor')
  getVendedorData() {
    return { msg: 'Ruta para administradores y vendedores 💼' };
  }
}
