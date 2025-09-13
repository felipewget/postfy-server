import { Module } from '@nestjs/common';
import { JwtModule as JwtModuleLib } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModuleLib.register({
      secret: 'minha-super-senha-secreta',
      signOptions: { expiresIn: '7h' },
    }),
  ],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService],
})
export class JwtModule {}
