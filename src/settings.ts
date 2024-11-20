import JSON5 from 'json5';

interface Settings {
  [key: string]: any;
}

export function organizeSettings(text: string, space: number): string {
  let settings = JSON5.parse(text);
  settings = decompose(settings);
  settings = condense(settings);
  settings = sortKeys(settings);
  return JSON.stringify(settings, null, space);
}

export function decompose(settings: Settings): Settings {
  let result: Settings = {};
  for (let key in settings) {
    const subkeys = key.split('.');
    const value = settings[key];

    if (subkeys.length > 1) {
      const topKey = subkeys[0];
      const subValue = { [subkeys.slice(1).join('.')]: value };
      if (topKey in result) {
        let joinedSettings = { ...result[topKey], ...subValue };
        result[topKey] = decompose(joinedSettings);
      } else {
        result[topKey] = decompose(subValue);
      }
    } else {
      if (typeof value === 'object' && !Array.isArray(value)) {
        result[key] = decompose(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

export function condense(settings: Settings): Settings {
  let result: Settings = {};
  for (let key in settings) {
    const value = settings[key];
    if (key.startsWith('[')) {
      result[key] = condense(value);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      const keys = Object.keys(value);
      if (keys.length === 1) {
        const subkey = keys[0];
        result[`${key}.${subkey}`] = value[subkey];
      } else {
        result[key] = condense(value);
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function sortKeys(settings: Settings): Settings {
  let result: Settings = {};
  for (let key of Object.keys(settings).sort(compare)) {
    const value = settings[key];
    if (typeof value === 'object' && !Array.isArray(value)) {
      result[key] = sortKeys(value);
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
