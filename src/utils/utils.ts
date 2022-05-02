import fs from "fs";

export const mapAndTransformJson = () => {
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

export const isUUID = (uuid: string = '') => {
    let s: any = uuid.trim();

    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
}
