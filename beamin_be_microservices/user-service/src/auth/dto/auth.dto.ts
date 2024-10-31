import { ApiBody, ApiProperty } from '@nestjs/swagger';

// @InputType()
export class LoginInput {
  // @Field()
  @ApiProperty({ example: '1@gmail.com' })
  email: string;

  @ApiProperty({ example: '1', minimum: 8 })

  // @MinLength(8)
  password: string;
}
export class RegisterInput {
  // @Field()
  @ApiProperty({ example: '1@gmail.com' })
  email: string;

  @ApiProperty({ example: 'A' })
  username: string;

  @ApiProperty({ example: '1' })
  // @MinLength(8)
  password: string;

  @ApiProperty({ example: 'SaiGOn' })
  address: string;

  @ApiProperty({ example: '0987654321' })
  phone_number: string;
}
