const path = require("path");
const { archiveCache, getFilesFromDirectory } = require('../helpers.js');

module.exports = async function() {
	return getFilesFromDirectory(
		path.join(archiveCache, 'media_attachments')
	);
};
