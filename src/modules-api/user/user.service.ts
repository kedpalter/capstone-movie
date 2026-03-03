import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { queryPrisma } from 'src/common/helpers/queryPrisma.helper';

@Injectable()
export class UserService {
  private readonly roles = ["admin", "user"]
  constructor(
    private prisma: PrismaService
  ) { }

  getRoles() {
    return this.roles
  }

  async myAccount(userId: number) {
    return await this.prisma.users.findFirst({
      where: { userId },
      select: {
        userEmail: true,
        userFullname: true,
        userPhone: true,
        userType: true
      }
    })
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    console.log({ userId, updateProfileDto })
    if (updateProfileDto.userEmail) throw new BadRequestException("Bad Request!")
    return await this.prisma.users.update({
      where: { userId },
      data: {
        ...updateProfileDto,
        userEmail: undefined
      }
    })
  }

  async deleteAccount(userId: number) {
    const isUser = await this.prisma.users.update({
      where: {
        userId,
        isDeleted: false
      },
      data: {
        isDeleted: true
      }
    })
    if (!isUser) throw new BadRequestException("Delete Failed!")
    return true;
  }

  async getAllUsers(role?: string, page?: number, pageSize?: number) {
    const { pagePagi, pageSizePagi, index } = queryPrisma(page, pageSize)
    const res = await this.prisma.users.findMany({
      where: {
        isDeleted: false,
        userType: role
      },
      select: {
        userId: true,
        userFullname: true,
        userEmail: true,
        userType: true
      },
      skip: index,
      take: pageSizePagi
    });

    return {
      userType: role,
      page: pagePagi,
      pageSize: pageSizePagi,
      items: res
    }
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

  async createUser(createUserDto: CreateUserDto) {
    const isUser = await this.prisma.users.findUnique({
      where: {
        userEmail: createUserDto.userEmail
      }
    })
    if (isUser) throw new BadRequestException("User Existed!")
    const hassPassword = bcrypt.hashSync(createUserDto.userPassword, 10)
    if (!this.roles.includes(createUserDto.userType)) throw new BadRequestException("Wrong Type!")

    await this.prisma.users.create({
      data: {
        ...createUserDto,
        userPassword: hassPassword
      }
    })
  }


  async updateRole(updateRoleDto: UpdateRoleDto) {
    const isUser = await this.prisma.users.findUnique({ where: { userId: updateRoleDto.userId } })
    if (!isUser) throw new NotFoundException("User Not Found")
    if (!this.roles.includes(updateRoleDto.userType)) throw new BadRequestException("Wrong Type!")

    await this.prisma.users.update({
      where: { userId: updateRoleDto.userId, isDeleted: false },
      data: { userType: updateRoleDto.userType }
    })
    return true
  }

}
