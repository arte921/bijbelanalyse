import stringSimilarity from "string-similarity";

Array.prototype.ongeveer = function(string) {
    return stringSimilarity.findBestMatch(string, this).bestMatch.target;
};

export default undefined;