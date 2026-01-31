import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check-phone')
  checkPhone(@Body('phone') phone: string) {
    return this.authService.checkPhone(phone);
  }

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('send-otp')
  sendOtp(@Body('phone') phone: string) {
    return this.authService.sendOtp(phone);
  }

  @Post('validate-otp')
  validateOtp(@Body() body: { phone: string; code: string }) {
    return this.authService.validateOtp(body.phone, body.code);
  }
}
