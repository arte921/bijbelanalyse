import {
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
} from "#f/io.js";

console.log(
    rtxt().split(/[\n,]/).reverse().reduce((acc, stuk) => {
        const [begin, einde = begin] = stuk.split(/-/);
        
    })
)