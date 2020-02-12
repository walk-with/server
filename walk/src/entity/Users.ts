import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Walks } from "./Walks";
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

    @OneToMany(type => Walks, walk => walk.user, {
        cascade: true
    })
    board: Walks[];

    @OneToMany(type => Chats, chat => chat.user, {
        cascade: true
    })
    chat: Chats[];
}