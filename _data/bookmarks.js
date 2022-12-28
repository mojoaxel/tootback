const fs = require('fs').promises;
const { archiveCache } = require('../helpers.js');
const getActor = require('./actor.js');

module.exports = async function() {
	const actor = await getActor();
	const bookmarksFile = actor.bookmarks;
	const dataRaw = await fs.readFile(`${archiveCache}/${bookmarksFile}`, 'utf8');
	const data = JSON.parse(dataRaw);
	return data.orderedItems
		.sort((likeA, likeB) => likeA.localeCompare(likeB));
};
