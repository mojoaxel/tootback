const fs = require('fs').promises;
const { archiveCache } = require('../helpers.js');

module.exports = async function() {
	const dataRaw = await fs.readFile(`${archiveCache}/actor.json`, 'utf8');
	const data = JSON.parse(dataRaw);
	return data;
};
