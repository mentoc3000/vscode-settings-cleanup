// import { assert } from "console";


// type Value = any;

// type SettingsTree = {
//     key: string | null,
//     value: SettingsTree[] | Value,
// };

export function parse(text: string): number {
    return text.length;
}

// function parseSetting(text: string): [SettingsTree, string] {
//     text = text.trim();

//     const key = parseKey(text);
//     text = text.slice(key.length).trim();

//     assert(text.startsWith(':'));
//     text = text.slice(1).trim();

//     const [value, rest] = parseValue(text);

//     return [{ key, value }, rest];
// }

// function parseKey(text: string): string | null {
//     assert(text.startsWith('"'));

//     const key = text.match(/^"([^"]+)"/);

//     if (!key) {
//         return null;
//     }

//     return key[1];
// }

// function parseValue(text: string): [SettingsTree[]] {
//     text = text.trim();

//     // parse json

// }
