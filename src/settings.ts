export function parseFile(text: string): number {
    let obj = JSON.parse(text);
    return Object.keys(obj).length;
}

interface Settings { [key: string]: any }

export function decompose(settings: Settings): Settings {
    let result: Settings = {};
    for (let key in settings) {

        const subkeys = key.split('.');
        const value = settings[key];

        if (subkeys.length > 1) {
            const topKey = subkeys[0];
            const subValue = {[subkeys.slice(1).join('.')]: value};
            if (topKey in result) {
                let joinedSettings = {...result[topKey], ...subValue};
                result[topKey] = decompose(joinedSettings);
            } else {
                result[topKey] = decompose(subValue);
            }
        } else {
            if (typeof value === 'object') {
                result[key] = decompose(value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}
