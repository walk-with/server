import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import { Boards } from "./Boards";
import { Pets } from './Pets';
import { Chats } from "./Chats";
@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Pets, pet => pet.user)
    pet: Pets[];

    @OneToMany(type => Boards, board => board.user)
    board: Boards[];

    @OneToMany(type => Chats, chat => chat.user)
    chat: Chats[];
}