export class Country{
    en!: string;
    pol!: string;
    cca2!: string;
    latlng!: Number[];

    constructor(en: string, pol: string, cca2: string, latlng: Number[]){
        this.en = en;
        this.pol = pol;
        this.cca2 = cca2;
        this.latlng = latlng;
    }
}