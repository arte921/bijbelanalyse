import YAML from "yaml";
import fss from "fs";
import fs from "fs/promises";

// parse
const pcsv = (csv, separator = ",") => csv.split("\n").map(l => l.split(separator)).slice(1).filter(l => l.length > 1);
const pyaml = YAML.parse;

// generate
const gtxt = (data) => [data].flat(30).join("\n");
const gcsv = (data, separator = ",") => data.map((a) => [a].flat(9).join(separator)).join("\n");
const gyaml = YAML.stringify;

// read
const rtxt = () => fss.readFileSync(0).toString();
const rcsv = async (pad, separator = ",") => pcsv((await fs.readFile(pad)).toString(), separator);
const ryaml = async (pad) => pyaml((await fs.readFile(pad)).toString());

// write
const wcsv = (data) => console.log(gcsv(data));
const wyaml = (data) => console.log(gyaml(data));
const wtxt = (data) => console.log(gtxt(data));

export {
    pcsv,
    pyaml,
    gtxt,
    gcsv,
    gyaml,
    rtxt,
    rcsv,
    ryaml,
    wcsv,
    wyaml,
    wtxt
};

