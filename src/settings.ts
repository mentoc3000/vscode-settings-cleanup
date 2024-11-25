import { CommentObject, parse } from 'comment-json';

export function organizeSettings(text: string, tabSize: number): string {
  let settings = parse(text) as CommentObject;
  settings = decompose(settings);
  settings = condense(settings);
  settings = sortKeys(settings);
  return JSON.stringify(settings, null, tabSize);
}

export function decompose(settings: CommentObject): CommentObject {
  let result = {} as CommentObject;
  for (let key in settings) {
    const subkeys = key.split('.');
    const value = settings[key];

    if (subkeys.length > 1) {
      const topKey = subkeys[0];
      const subValue = { [subkeys.slice(1).join('.')]: value };
      if (topKey in result) {
        let joinedSettings = {
          ...(result[topKey] as CommentObject),
          ...subValue,
        };
        result[topKey] = decompose(joinedSettings);
      } else {
        result[topKey] = decompose(subValue as CommentObject);
      }
    } else {
      if (typeof value === 'object' && !Array.isArray(value)) {
        result[key] = decompose(value as CommentObject);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

export function condense(settings: CommentObject): CommentObject {
  let result = {} as CommentObject;
  for (let key in settings) {
    const value = settings[key];
    if (key.startsWith('[')) {
      result[key] = condense(value as CommentObject);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      const keys = Object.keys(value as CommentObject);
      if (keys.length === 1) {
        const condensedValue = condense(value as CommentObject);
        const subkey = Object.keys(condensedValue)[0];
        result[`${key}.${subkey}`] = condensedValue[subkey];
      } else {
        result[key] = condense(value as CommentObject);
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function sortKeys(settings: CommentObject): CommentObject {
  let result = {} as CommentObject;
  for (let key of Object.keys(settings).sort(compare)) {
    const value = settings[key];
    if (Array.isArray(value)) {
      result[key] = value.sort();
    } else if (typeof value === 'object') {
      result[key] = sortKeys(value as CommentObject);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function compare(a: string, b: string): number {
  // Sort alphabetically, putting keys in brackets last
  if (a.startsWith('[') !== b.startsWith('[')) {
    return a.startsWith('[') ? 1 : -1;
  }
  return a.localeCompare(b);
}
