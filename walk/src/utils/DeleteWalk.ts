import { Day } from './Date';
import { getRepository } from 'typeorm';
import { Walks } from '../entity/Walks';
// tslint:disable-next-line:class-name
export class deleteOldData {
    day: number;
    constructor() {
        this.day = Number(Day.replace("/", ""));
    }
    DeleteWalkData() {
        console.log("this.day", this.day, typeof this.day);
    
    }
} 
