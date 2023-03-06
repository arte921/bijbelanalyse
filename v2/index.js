import fs from "fs/promises";
import { XMLParser } from "fast-xml-parser";

const xml = await fs.readFile("./statenvertaling.xml");


console.log((new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    isArray: () => true
}).parse(xml)).XMLBIBLE[0].BIBLEBOOK
    .map((b) => b.CHAPTER
        .map((c) => c.VERS
            .map((v) => `${b._bname} ${c._cnumber} ${v._vnumber} ${v["#text"] || ""}`)
        )
    ).flat(30).join("\n"));

// console.log(JSON.stringify(new XMLParser({
//         ignoreAttributes: false,
//         attributeNamePrefix: "_",
//         isArray: () => true
//     }).parse(xml)))

// console.log((new XMLParser({
//     ignoreAttributes: false,
//     attributeNamePrefix: "_"
// }).parse(xml)).XMLBIBLE.BIBLEBOOK.map(b => b.CHAPTER))