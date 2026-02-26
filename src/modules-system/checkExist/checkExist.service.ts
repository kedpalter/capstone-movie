import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CheckExistService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async checkExist(model: keyof PrismaService, where: any) {
        return await (this.prisma as any)[model].findUnique({
            where: {
                ...where,
                isDeleted: false
            }
        })
    }
}