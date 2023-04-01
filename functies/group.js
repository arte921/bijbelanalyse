const cmp = function(a, b) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
};

Array.prototype.sortBy = function(...callbacks) {
    return this.sort((a, b) => callbacks.map((c) => cmp(c(a), c(b))).find(b => b));
}

Array.prototype.group = function(callback) {
    return this.reduce((acc, element) => {
        const key = callback(element);
        acc[key] = acc[key] || [];
        acc[key].push(element);
        return acc;
    }, {});
};

Object.prototype.invert = function() {
    return Object.fromEntries(Object.entries(this).map(([k, v]) => v.map(v => [v, k])).flat())
}

Array.prototype.distinct = function(callback) {
    return Object.values(this.group(callback)).map(v => v[0]);
}

Array.prototype.unique = function(callback) {
    return Object.keys(this.group(callback));
}

Array.prototype.mirror = function() {
    const l = Math.max(...this.map(l => l.length));
    return new Array(l).fill().map((_, i) => this.filter(l => l.length > i).map(l => l[i]));
}

export default null;

// const sortLike = (values, callback, example) => example.map((e) => values.filter((v) => callback(v) == e)).flat();

