export function convertDecimalToRoman(decimal: number): string {
    let roman: any = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    let str = "";
    
    for (let i of Object.keys(roman)) {
        let q = Math.floor(decimal / roman[i]);
        decimal -= q * roman[i];
        str += i.repeat(q);
    }
    
    return str;
};