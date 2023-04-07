import * as io from "#f/io.js";
import { o } from "#f/root.js";
import { bijbelregex } from "#f/bijbelregex.js";
import zoekObject from "#f/zoekObject.js";

(async () => {
    const bijbel = await io.rtxt(`${o}/bijbel.txt`);
    const zoekArray = bijbel.split("\n").map((vers) => [
        vers,
        vers,
        vers.replace(bijbelregex, "$1$2 $3"),
        vers.replace(bijbelregex, "$1$2:$3"),
        vers.replace(bijbelregex, "$4")
    ]);
    console.log(zoekObject(zoekArray, io.arg.join(" ")));
})()