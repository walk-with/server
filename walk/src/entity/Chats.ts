import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from './Users';
import { Boards } from './Boards';
@Entity()
export class Chats {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: string;

    @Column()
    gender: string;

    @Column()
    image: string;

    @Column()
    keyword: string;

    @ManyToOne(type => Users, user => user.chat)
    user: Users;

    @ManyToOne(type => Boards, board => board.chats)
    board: Boards[];
}