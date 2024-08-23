import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser-dto';
import { UpdateUserDto } from './dto/updateUser-dto';

@Controller('user')
export class UserController {
    /*

        @GET()  /users
        @POST() /users
        @PATCH() /users/:id
        @DELETE() /users/:id

    */
        constructor(private readonly userServices: UserService) { }   // this is for injecting the services into these controller

        @Get('getAllUsers')  // /users/getAllUsers?role=value
        findAll(@Query('role') role?: "Moderator" | "Admin" | "User") {
            return this.userServices.findAll(role)  
        }
    
        @Post('create')      // http://localhost:3000/users/create  with metod POST
        create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
            return this.userServices.create(createUserDto)
        }
    
        @Patch('update/:id')    // /user/update/:id  usage of params but if we create another route beneath of it , they replace this :id
        findByIdAndUpdate(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
            return this.userServices.findByIdAndUpdate(id, updateUserDto)
        }
    
        @Delete('delete/:id')   //   /user/delete/:id
        findByIdAndDelete(@Param('id', ParseIntPipe) id: number) {   //here parseIntPipe act as a middleware changing id(string) to number
            return this.userServices.findByIdAndDelete(id)
        }
}
