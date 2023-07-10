import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";


export const GetUser  = createParamDecorator((data, ctx: ExecutionContext): User =>{
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})
