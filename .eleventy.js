const path = require("path"); 
const prettier = require("prettier");
const meta = require('./src/_data/meta.js');

const { userFromUrl, archiveCache } = require('./src/helpers.js');

module.exports = function(eleventyConfig) {
	eleventyConfig.ignores.add("./README.md");

	eleventyConfig.addPassthroughCopy({
		'src/theme.css': 'theme.css',
		[`${archiveCache}/media_attachments`]: 'media_attachments',
		[`${archiveCache}/avatar.*`]: '/',
		[`${archiveCache}/header.*`]: '/'
	});

	eleventyConfig.addFilter("isoString", (date = Date.now()) => 
		new Date(date).toISOString()
	);

	eleventyConfig.addFilter("localDateTime", (date = Date.now()) => 
		new Date(date).toLocaleString(meta.lang, { timeZone: meta.timeZone })
	);

	eleventyConfig.addFilter('json', (obj, spaces = 2) => 
		JSON.stringify(obj, null, spaces)
	);

	eleventyConfig.addFilter('userServerFormat', url => {
		return userFromUrl(url);
	});
	
	eleventyConfig.addTransform("prettier", function (content, outputPath) {
		const extname = path.extname(outputPath);
		switch (extname) {
			case ".html":
			case ".json":
				// Strip leading period from extension and use as the Prettier parser.
				const parser = extname.replace(/^./, "");
				return prettier.format(content, { parser });
			default:
				return content;
		}
	});

	return {
		dir: {
			input: "src",
			output: "_site",
		},
	};
};