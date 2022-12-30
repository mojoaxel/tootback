# tootback

Host your own Mastodon archive.

## Usage

1. Clone or download this repository,
1. In your terminal `cd` to the folders of the project.
1. Download your mastodon archive and put the resulting `archive-xxxxxx.tar.gz` in the projects `archive` folder. You can have multiple archives in that folder, we will always use the newest.
1. Adopt settings in `_data/meta.json`.
1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.
1. Install all dependencies by running `npm ci`.
1. Build the website by calling `npm run build`.
1. Copy everything from the `_site` folder to a static webserver or simply enable [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for the `gh-pages` branch.

## FAQs

### Why?

Like everything in this universe Mastodon servers are ephemeral. They often come to life in a highly energetic moment, glow for some time and than vanish out of existence again because some update goes wrong or human things happen.
If you want your toots to be hosted after your server is long gone you could use this repository to generate a static website with your content.

### How?

I used the wonderful static page generator [11ty](https://www.11ty.dev/) for this.
Eleventy was a perfect fit for this! Not only does it support multiple templating languages and other nice features, it also supports dynamic [JS data files](https://www.11ty.dev/docs/data-js/) so the content can directly get pulled out of the zipped archive.

### Related Projects?

* ✨[tweetback](https://github.com/tweetback/tweetback)✨ by [@zachleat](https://github.com/zachleat)
* [mastodon-data-viewer.py](https://github.com/blackle/mastodon-data-viewer.py) by [@blackle](https://github.com/blackle)
* [mastodon-archive-viewer](https://github.com/kit-ty-kate/mastodon-archive-viewer) by [@kit-ty-kate](https://github.com/kit-ty-kate)
* [mastodon-archive-viewer](https://github.com/dizzy-labs/mastodon-archive-viewer) by [@dizzy-labs](https://github.com/dizzy-labs)

## License

Copyright 2022 by [Alexander Wunschik](https://github.com/mojoaxel).

Licensed under a [AGPL-3.0-or-later](./LICENSE) license.

**If you change the code you are legally required to publish it!<br>
This is the idea of #OpenSource, please respect it!**
