// TODO: Try to not depend on '@nestjs/mapped-types'
// import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   // id: number;
// }

export interface UpdateUserDto extends CreateUserDto {
  id: number;
}