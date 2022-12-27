const fs = require('fs').promises;
const { archiveCache } = require('../helpers.js');
const getActor = require('./actor.js');

module.exports = async function() {
	const actor = await getActor();
	const outboxFile = actor.outbox;
	const dataRaw = await fs.readFile(`${archiveCache}/${outboxFile}`, 'utf8');
	const data = JSON.parse(dataRaw);
	return data.orderedItems
		.map(item => item.object)
		.filter(object => object.tag && object.tag.length > 0)
		.flatMap(object => object.tag)
		.filter((tag, index, array) => array.indexOf(tag) === index)
};
