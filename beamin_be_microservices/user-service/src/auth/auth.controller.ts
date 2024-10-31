import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

import { LoginInput, RegisterInput } from './dto/auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('logIn')
  logIn(@Payload() payload: LoginInput) {
    return this.authService.login(payload);
  }

  @MessagePattern('signIn')
  signIn(@Payload() payload: RegisterInput) {
    return this.authService.register(payload);
  }
}
