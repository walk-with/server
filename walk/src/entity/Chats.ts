import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Timestamp } from "typeorm";
import { Users } from './Users';
import { Walks } from "./Walks";
@Entity()
export class Chats {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    time: string;

    @ManyToOne(type => Users, user => user.chat, {
        onDelete: "CASCADE"
    })
    user: Users;

    @ManyToOne(type => Walks, walk => walk.chats, {
        onDelete: "CASCADE"
    })
    walk: Walks;
}