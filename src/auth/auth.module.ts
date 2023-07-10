import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    
    PassportModule.register({ defaultStrategy: 'jwt' }),
/*     JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }), */
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES')
        }
      }),
    }),
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
