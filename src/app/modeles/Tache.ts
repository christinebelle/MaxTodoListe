import { Projet } from './Projet';

export class Tache {

    constructor(public id:number,                 
                public position:String,
                public tache:String,
                public maxListe:Projet) {}
}