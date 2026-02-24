import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor() { }

    async login(body: LoginDto) {
        return 'hello login'
    }
}
