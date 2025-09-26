import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async me(@Req() { user }) {
    const account = await this.userService.findOne(user.id);

    if (!account) return;

    return account;

    // return accountTransformer.transform(account);
  }

  @Post()
  @HttpCode(201)
  //   async create(@Body() createAccountDto: CreateAccountDto) {
  async create(@Body() createAccountDto: any) {
    await this.userService.create(createAccountDto);
  }

  @Patch()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateMe(
    @Req() { user },
    @UploadedFile() file: Express.Multer.File,
    @Body() payload,
  ) {
    return this.userService.updateuser(user.id, payload, file);
  }
}
