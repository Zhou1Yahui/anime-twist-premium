/**
 * @param {string} title
 * @param {string} slug
 */
ATP.WatchListEntry = function(title, slug) {
	this.title = title
	this.slug = slug
	this.date = new Date()
	this.url = ATP.buildAnimeURL(slug)
}
