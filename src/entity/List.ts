import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from "./User"

@Entity()
export class List {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.lists)
    user: User;
}