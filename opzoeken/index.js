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

// Array.prototype.layer = function(callback, firstValue) {
//     return this.reduce((acc, x, i) => acc.concat(callback(x, (acc[acc.length - 1] || [firstValue])[0], acc, i)), []).map(e => e[1]);
// }

Array.prototype.vervangLaatste = function(array) {
    if (array[0]) console.log(array)
    const p = [this.slice(0, this.length - array.length), array].flat();
    console.log(p);
    return p.slice(p.findLastIndex(e => e.match(/[a-zA-Z]/)))
}

let context = [];

rtxt().split(/[\n,]/).forEach((stuk) => {
    stuk.split(/-/).forEach((verwijzing) => {
        context = context.vervangLaatste(verwijzing.split(/ |:/));
        console.log(context);

    })
    // const [begin, einde = begin] = stuk.split(/-/).map((verwijzing) => {
    //     console.log(verwijzing)
    //     return ["a", "b"]
    //     // return verwijzing.split(/ |:/).layer((v, c) => {
    //     //     console.log(v, c);
    //     //     return v
    //     // })
    // });
})