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
    validDaysLeft?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    foodId?: number;
    // userId?: string;

    constructor(
                name: string,
                description?: string,
                code?: string,
                purchaseDate?: string,
                produceDate?: string,
                validPeriod?: number,
                expireDate?: string,
                validDaysLeft?: number,
                status?: string,
                createAt?: string,
                updateAt?: string,
                foodId?: number)
    {
        this.name = name;
        this.description = description;
        this.code = code;
        this.purchaseDate = purchaseDate;
        this.produceDate = produceDate;
        this.validPeriod = validPeriod;
        this.expireDate = expireDate;
        this.validDaysLeft = validDaysLeft;
        this.status = status;
        this.createdAt = createAt;
        this.updatedAt = updateAt;
        this.foodId = foodId;
        // this.userId = userId;
    }
}