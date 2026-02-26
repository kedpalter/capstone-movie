import { Global, Module } from '@nestjs/common'
import { CheckExistService } from './checkExist.service';

@Global()
@Module({
    providers: [CheckExistService],
    exports: [CheckExistService]
})
export class CheckExistModule { }