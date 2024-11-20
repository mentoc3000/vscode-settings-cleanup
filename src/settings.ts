export function parseFile(text: string): number {
    let obj = JSON.parse(text);
    return Object.keys(obj).length;
}
