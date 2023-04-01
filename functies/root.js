import path from "path";
import { fileURLToPath } from 'url';

const root = path.dirname(path.join(fileURLToPath(import.meta.url), ".."));
const o = `${root}/opzoeken/opslag`;

export {
    root,
    o
};