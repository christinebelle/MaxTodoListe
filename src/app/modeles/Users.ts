import { Profil } from './Profil';

export class Users {

    constructor(    public id?: number,
                    public username?: string,
                    public password?: string,
                    public role?: Profil

    ) {}
}