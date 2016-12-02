/**
 * Created by mxu on 11/29/2016.
 */
export class Food {
    name: string;
    description?: string;
    code?: string;
    purchaseDate?: string;
    produceDate?: string;
    validPeriod?: number;
    expireDate?: string;
    // userId?: string;

    constructor(name: string,
                description?: string,
                code?: string,
                purchaseDate?: string,
                produceDate?: string,
                validPeriod?: number,
                expireDate?: string)
    {
        this.name = name;
        this.description = description;
        this.code = code;
        this.purchaseDate = purchaseDate;
        this.produceDate = produceDate;
        this.validPeriod = validPeriod;
        this.expireDate = expireDate;
        // this.userId = userId;
    }
}