import { Expose } from 'class-transformer';

export class AuthResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  token?: string;
}
