import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema, Types } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';
import { UpdateUserDto } from 'src/modules/user/dto/updateUser.dto';

export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        
        let user = new this.userModel({
            name: createUserDto.name,
            email: createUserDto.email,
            address: createUserDto.address,
            phone: createUserDto.phone
        });
        
        user = await user.save();

        return user;
    }

    async updateUser(id: string, updateUser: UpdateUserDto) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            name: updateUser.name,
            email : updateUser.email,
            address : updateUser.address,
            phone: updateUser.phone,
            updatedAt: actualDate,
        };

        let user;
        try {
            user = await this.userModel
                .findOneAndUpdate({ _id: id }, updateData, {
                    new: true,
                })
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new ConflictException('Error trying to update user');
        }

        return user;
    }

    async getUsers(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let users: User[];

        try {
            if (limit === 0) {
                users = await this.userModel
                    .find()
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                users = await this.userModel
                    .find()
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            return users
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getUserById(id: string) {
        let product;
        try {
            product = await this.userModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new NotFoundException('The product with this id does not exist');
        }

        return product;
    }
}