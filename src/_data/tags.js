const fs = require('fs').promises;
const { archiveCache } = require('../helpers.js');
const getActor = require('./actor.js');

module.exports = async function() {
	const actor = await getActor();
	const outboxFile = actor.outbox;
	const dataRaw = await fs.readFile(`${archiveCache}/${outboxFile}`, 'utf8');
	const data = JSON.parse(dataRaw);

	const tagsMap = data.orderedItems
			.map(item => item.object)
			.filter(object => object.tag && object.tag.length > 0)
			.flatMap(object => object.tag)
			.filter(tag => tag.type === 'Hashtag')
			.reduce((tagSet, tag) => {
				const count = tagSet.has(tag.name) ? tagSet.get(tag.name).count + 1 : 1;
				tagSet.set(tag.name, {
					...tag,
					count
				});
				return tagSet;
			}, new Map());
	let tags = Array.from(tagsMap.values())
		.sort((a, b) => a.name.localeCompare(b.name));

	const tagsMaxCount = tags.reduce((max, tag) => Math.max(max, tag.count), 0);

	// Add scaling between 0..1
	tags = tags.map(tag => ({
		...tag,
		scaling: Math.round(tag.count / tagsMaxCount)
	}));

	return tags;
};
