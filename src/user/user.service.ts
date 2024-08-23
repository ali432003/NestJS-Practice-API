import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { error } from 'console';
import { CreateUserDto } from './dto/createuser-dto';
import { UpdateUserDto } from './dto/updateUser-dto';

@Injectable()
export class UserService {
    private users = [
        {
            id: 1,
            name: "John Doe",
            role: "Admin",
            age: 35,
            email: "john.doe@example.com"
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "User",
            age: 28,
            email: "jane.smith@example.com"
        },
        {
            id: 3,
            name: "Robert Johnson",
            role: "Moderator",
            age: 42,
            email: "robert.johnson@example.com"
        },
        {
            id: 4,
            name: "Emily Davis",
            role: "User",
            age: 23,
            email: "emily.davis@example.com"
        },
        {
            id: 5,
            name: "Michael Brown",
            role: "Admin",
            age: 30,
            email: "michael.brown@example.com"
        }
    ];

    findAll(role?: 'Moderator' | 'Admin' | 'User') {
        if (role) {
            const roledUser = this.users.filter(user => user.role === role)
            if (roledUser.length === 0) throw new NotFoundException("user with this role is not found")
            return { message: `Only ${role} user fetched`, data: roledUser }
        }
        return { message: "All users fetched", data: this.users }
    }

    create(user: CreateUserDto) {
        if (!user.name || !user.email || !user.role || !user.age) {
            throw new BadRequestException("Fill All Fields")
        }
        //check if this user already exist
        const alreadyUser = this.users.find(u => u.email === user.email)
        if (alreadyUser) {
            throw new ConflictException("Email Already exist")
        }
        // Create a new user
        const newUser = { id: this.users.length + 1, ...user }; // Add a unique `id` to the new user
        this.users.push(newUser); // Add the new user to the array
        return { message: "user added sucessfuly", data: this.users }
    }


    findOne(id: number) {
        return this.users.find(user => user.id === id)
    }

    findByIdAndUpdate(id: number, Upduser: UpdateUserDto) {
        const userToUpdated = this.users.find(u => u.id === id)
        if (!userToUpdated) {
            throw new NotFoundException(`User Not found on id: ${id}`)
        }
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...Upduser }
            }
            return user
        })
        return { message: `user update on ${id} successfuly`, data: this.findOne(id) }
    }

    findByIdAndDelete(id: number) {
        const filterUser = this.users.filter(user => user.id !== id)  //it gets all user other than the id is given
        if (filterUser.length === this.users.length) throw new NotFoundException("User not exist")
        return { message: `user deleted on ${id}`, data: filterUser }
    }
}
