import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Acronym {

    constructor({acronym, definition}: {acronym?: string, definition?: string} = {}){
        if(acronym) this.acronym = acronym;
        if(definition) this.definition = definition;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 100
    })
    acronym: string;

    @Column("text")
    definition: string;
}