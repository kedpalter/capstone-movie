import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Role } from 'src/common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserService } from './user.service';
import { ProtectGuard } from 'src/common/guards/protect.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@UseGuards(ProtectGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  // 1. Get 
  @Get('get-roles')
  getRoles() {
    return this.userService.getRoles()
  }

  // 2. User Info
  @Get('profile')
  userInfo(
    @Req()
    req: any
  ) {
    return this.userService.myAccount(+req.user.userId)
  }

  // 3. Update Proflle
  @Put('update-profile')
  updateProfile(
    @Req()
    req: any,
    @Body()
    updateProfileDto: UpdateProfileDto
  ) {
    return this.userService.updateProfile(+req.user.userId, updateProfileDto)
  }

  // 4. DELETE Account
  @Delete('delete-acount')
  deleteAccount(@Req() req: any) {
    return this.userService.deleteAccount(+req.user.userId);
  }

  // 5. GET Users
  @Get('all-users')
  @Role('admin')
  getAllUsers(
    @Query('role')
    role?: string,
    @Query('page')
    page?: string,
    @Query('pageSize')
    pageSize?: string
  ) {
    return this.userService.getAllUsers(role,
      page ? +page : undefined,
      pageSize ? +pageSize : undefined);
  }

  // 6. POST User
  @Post('add-new')
  @Role('admin')
  createUser(
    @Body()
    createUserDto: CreateUserDto
  ) {
    return this.userService.createUser(createUserDto);
  }

  // 7. Set Role
  @Put('set-role')
  @Role('admin')
  updateRole(
    @Body()
    updateRoleDto: UpdateRoleDto
  ) {
    return this.userService.updateRole(updateRoleDto);
  }

}
