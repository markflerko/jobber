import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/auth';
import { hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  getUsers() {
    return this.prismaService.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: { ...data, password: await hash(data.password, 10) },
    });
  }

  async getUser(args: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: args,
    });
  }
}
