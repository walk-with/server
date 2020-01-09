import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Users } from './Users';
import { Chats } from './Chats';
import { Tags } from './Tags';
import { Pets } from './Pets';

@Entity()
export class Walks {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    Longitude: string;

    @Column()
    Latitude: string;

    @Column()
    spot: string;

    @Column()
    time: string;

    @ManyToOne(type => Users, user => user.board)
    user: Users;

    @OneToMany(type => Chats, chat => chat.board)
    chats: Chats[];

    @ManyToMany(type => Tags, tag => tag.boards)
    @JoinTable()
    tags: Tags[];

    @ManyToMany(type => Pets, pet => pet.boards)
    @JoinTable()
    pet: Pets[];
}