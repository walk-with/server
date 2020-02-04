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
    StartTime: string;

    @Column()
    EndTime: string;

    @Column()
    contents: string;

    @ManyToOne(type => Users, user => user.board, {
        onDelete: "CASCADE"
    })
    user: Users;

    @OneToMany(type => Chats, chat => chat.board, {
        cascade: true
    })
    chats: Chats[];

    @ManyToMany(type => Tags, tag => tag.walk)
    @JoinTable()
    tags: Tags[];

    @ManyToMany(type => Pets, pet => pet.boards)
    @JoinTable()
    pet: Pets[];
}