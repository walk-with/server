import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Boards } from "./Boards";

@Entity()
export class Tags {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @ManyToMany(type => Boards, board => board.tags)
    boards: Boards[];
}