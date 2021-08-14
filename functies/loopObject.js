const loopObject = (object, functie) => {
    for (const [sleutel, waarde] of Object.entries(object)) {
        functie(waarde, sleutel);
    }
};

const objectNaarArray = (object) => {
    const array = [];
    loopObject(object, (waarde, sleutel) => array.push({
        waarde,
        sleutel
    }));
    return array;
};

module.exports = {
    loopObject,
    objectNaarArray
};