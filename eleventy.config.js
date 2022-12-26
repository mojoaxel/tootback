const { archiveCache } = require('./helpers.js');

module.exports = function(eleventyConfig) {
	eleventyConfig.ignores.add("./README.md");

	eleventyConfig.addPassthroughCopy(`${archiveCache}/media_attachments`);
	eleventyConfig.addPassthroughCopy(`${archiveCache}/avatar.*`);
	eleventyConfig.addPassthroughCopy(`${archiveCache}/header.*`);
};