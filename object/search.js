ATP.Search = function() {
	this.entries = []
}

/**
 * @param  {Object} data
 * @param  {string} data.title
 * @param  {string} data.slug
 * @return {SearchEntry}
 */
ATP.Search.prototype.addEntry = function(data) {
	console.log("[atp] Adding a new search entry...")
	const entry = new ATP.SearchEntry(data.title, data.slug)
	this.entries.push(entry)
	return entry
}

ATP.Search.prototype.getRandomEntry = function() {
	return this.entries[Math.floor(Math.random()*this.entries.length)]
}