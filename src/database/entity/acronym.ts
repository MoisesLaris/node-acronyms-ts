import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Acronym {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 100
    })
    acronym: string;

    @Column("text")
    description: string;
}