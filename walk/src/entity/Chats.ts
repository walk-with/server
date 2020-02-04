import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from './Users';
import { Walks } from "./Walks";
@Entity()
export class Chats {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => Users, user => user.chat, {
        onDelete: "CASCADE"
    })
    user: Users;

    @ManyToOne(type => Walks, walk => walk.chats, {
        onDelete: "CASCADE"
    })
    board: Walks;
}