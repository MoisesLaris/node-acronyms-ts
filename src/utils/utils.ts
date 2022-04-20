import fs from "fs";

export function mapAndTransformJson() {
    try {
        let data = fs.readFileSync('acronym.json', { encoding: "utf8" });
        return JSON.parse(data).map((acr: any) => {
            const entry = Object.entries(acr)[0];
            return {
                acronym: entry[0],
                definition: entry[1],
            };
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}
