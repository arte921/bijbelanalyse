import stringSimilarity from "string-similarity";

const zoekObject = (array, search) => {
    const keys = array.map(([_, ...keywords]) => keywords).flat(9);
    const match = stringSimilarity.findBestMatch(search, keys).bestMatch.target;
    console.log(keys);
    return array.find(([_, ...keywords]) => keywords.includes(match))[0];
};

export default zoekObject;