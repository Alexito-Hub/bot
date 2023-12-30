const { key } = require('../lib/simple')
const { fetchJson } = require('./utils.js')

async function Api(api) {
    try {
        const response = await fetchJson(`https://api-zio.replit.app/api/${api}?key=${key}`);
        return response.result
    } catch (e) {
        console.error('Error al obtener la API:', e);
        throw e;
    }
}

const Json = (string) => JSON.stringify(string, null, 2)

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

module.exports = { Api, Json, removeAccents }
