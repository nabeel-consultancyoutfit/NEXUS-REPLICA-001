import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 'Bearer' })
  tokenType: string;

  @ApiProperty({
    example: {
      id: '60d0fe4f5311236168a109ca',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    },
  })
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
