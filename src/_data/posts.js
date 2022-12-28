const fs = require('fs').promises;
const { archiveCache } = require('../helpers.js');
const getActor = require('./actor.js');

module.exports = async function() {
	const actor = await getActor();
	const outboxFile = actor.outbox;
	const dataRaw = await fs.readFile(`${archiveCache}/${outboxFile}`, 'utf8');
	const data = JSON.parse(dataRaw);
	return data.orderedItems
					.reverse()
					.filter(item => item.type === 'Create')
					.filter(item => item.object.inReplyTo === null);
};
