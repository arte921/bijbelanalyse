const https = require('https');

const doeRequest = (opties) => {
    let antwoord = '';
    return new Promise ((resolve) => {
            const request = https.request(opties, (response) => {
                response.on('data', (deel) => antwoord += deel);
                response.on('end', () => {
                    const resultaat = JSON.parse(antwoord);
                    if (resultaat.statusCode == 429) {
                        setTimeout(async () => resolve((await doeRequest(opties))), 100);
                    } else {
                        resolve(resultaat);
                    }
                });
            });
            request.end();
        }
    );
};

module.exports = async (vertaling) => await doeRequest({
    host: 'getbible.net',
    path: `/v1/${vertaling}.json`
});