import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginInput) {
    const checkAccount = await this.prisma.users.findFirst({
      where: { email: data.email },
    });

    if (!checkAccount) {
      throw new NotFoundException('User not found!');
    }

    if (!(await bcrypt.compare(data.password, checkAccount.password))) {
      throw new NotFoundException('Invalid password!');
    }

    const payload = {
      userId: checkAccount.user_id,
      sub: {
        name: checkAccount.username,
      },
    };
    const { password, ...result } = checkAccount;
    return {
      user: { ...result },
      access_token: await this.jwtService.sign(payload),
      refresh_token: await this.jwtService.sign(
        {
          user_id: checkAccount.user_id,
          type: 'REFRESH',
        },
        {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    };
  }

  async register(data: RegisterInput) {
    const findEmail = await this.prisma.users.findFirst({
      where: { email: data.email },
    });

    if (findEmail) {
      throw new BadRequestException(`User already exists!`);
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.users.create({
        data: { ...data, password: hashedPassword },
      });

      const payload = {
        username: user.username,
      };

      return payload;
    }
  }
}
