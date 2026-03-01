import { BadRequestException, flatten, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly roles = ["admin", "user"]
  constructor(
    private prisma: PrismaService
  ) { }

  getRoles() {
    return this.roles
  }

  async getAllUsers() {
    return await this.prisma.users.findMany({
      where: {
        isDeleted: false
      },
      select: {
        userId: true,
        userFullname: true,
        userEmail: true,
        userType: true
      }
    });
  }

  async findOne(userId: number) {
    const userExist = await this.prisma.users.findUnique({
      where: {
        userId,
        isDeleted: false
      },
      select: {
        userId: true,
        userFullname: true,
        userEmail: true,
        userPhone: true,
        userType: true,
        createAt: true,
        updateAt: true
      }
    })
    if (!userExist) {
      throw new NotFoundException("User Not Found!")
    }
    return userExist;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const userExist = await this.prisma.users.findUnique({
      where: {
        userId,
        isDeleted: false
      }
    })
    if (!userExist) {
      throw new NotFoundException("User Not Found")
    }
    return await this.prisma.users.update({
      where: {
        userId
      },
      data: updateUserDto
    })
  }

  async deleteUser(userId: number) {
    const userExist = await this.prisma.users.findUnique({
      where: {
        userId,
        isDeleted: false
      }
    })
    if (!userExist) {
      throw new BadRequestException("Delete Failed!")
    }
    await this.prisma.users.update({
      where: {
        userId
      },
      data: {
        isDeleted: true
      }
    })
    return true;
  }
}
