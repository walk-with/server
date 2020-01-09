import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from './Users';
import { Boards } from './Boards';
@Entity()
export class Chats {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => Users, user => user.chat)
    user: Users;

    @ManyToOne(type => Boards, board => board.chats)
    board: Boards;
}