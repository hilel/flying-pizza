import { Controller, Get, Post, Body, Patch, Param,  Delete, UseGuards } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';

import { CreateUserDto, UpdateUserDto } from '@flying-pizza/model';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';
import { UsersService } from './users.service';

@Controller({ path: 'users' })
export class UsersController {
  private _db: Firestore | undefined;
  private get db(): Firestore {
    if (!this._db) {
      this._db = firestore();
    }
    return this._db;
  }
  
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll() {
    // return this.usersService.findAll();
    return this._db.collection('users');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
