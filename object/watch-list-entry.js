/**
 * @param {string} name
 * @param {string} slug
 */
ATP.WatchListEntry = function(name, slug) {
	this.name = name
	this.origin = origin
	this.slug = slug
	this.date = new Date()
	this.url = ATP.buildAnimeURL(slug)
}
