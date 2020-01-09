import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Users } from './Users';
import { Boards } from './Boards';
@Entity()
export class Pets {

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

    @ManyToOne(type => Users, user => user.pet)
    user: Users;

    @ManyToMany(type => Boards, board => board.pet)
    boards: Boards[];
}