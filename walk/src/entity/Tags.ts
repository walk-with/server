import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Walks } from "./Walks";

@Entity()
export class Tags {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @ManyToMany(type => Walks, walk => walk.tags)
    boards: Walks[];
}