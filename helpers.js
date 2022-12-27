const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Takes in a url in that format:
 *   https://server.tld/@username
 * and returns a string like this:
 *   @username@server.tld
 */
function userFromUrl(url) {
	const urlObj = new URL(url);
	const user = urlObj.pathname
					.replace('/users/', '@')
					.replace(/^\//,'')
					.replace(/\/$/,'');
	const server = urlObj.host;
	return `${user}@${server}`;
};

/* Extract all *.tar.gz files from the folder "./archives" into the folder ".cache" */
function extractAllZips() {
	const zips = fs.readdirSync('./archives').filter((file) => file.endsWith('.tar.gz'));
	if (!zips.length) {
		console.warn('No zipped archives found in "./archives"');
		return;
	}
	zips.forEach((zip) => {
		const targetFolder = `.cache/${zip.replace('.tar.gz', '')}`;
		console.log(`Extracting "${zip}" to "${targetFolder}"`);
		if (!fs.existsSync(targetFolder)){
			fs.mkdirSync(targetFolder);
		}
		execSync(`tar -xzf ./archives/${zip} -C ${targetFolder}`);
	});
}

function getCachedArchives() {
	const archiveFolders = fs.readdirSync('.cache').filter((file) => file.startsWith('archive-'));
	return archiveFolders.map(f => `.cache/${f}`);
}

function getLatestArchiveCache() {
	let archiveFolders = getCachedArchives()

	if (!archiveFolders.length) {
		console.log('No archive cache found. Looking for zipped archives in "./archives"...');
		extractAllZips();
		archiveFolders = getCachedArchives();
	}

	const latestArchiveCache = archiveFolders[archiveFolders.length - 1];
	return latestArchiveCache;
}


if (!fs.existsSync('.cache')) {
	fs.mkdirSync('.cache');
}
const archiveCache = getLatestArchiveCache();

module.exports = {
	userFromUrl,
	archiveCache
}