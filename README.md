# tootback

Take ownership of your Mastodon data and get your toots back

## Usage

1. Clone or donwload this repository,
1. In your terminal `cd` to the folders of the project.
1. install [Node.js](https://nodejs.org/).
1. Download your mastodon archive and put the resulting `archive-xxxxxx.tar.gz` in the projects `archive` folder. You can have multiple archives in that folder, we will always use the newest.
1. Build the website by calling `npm run build`.
1. Copy everything from the `_site` folder to a static webserver.