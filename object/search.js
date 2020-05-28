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
	const entries = this.entries.filter(entry => !ATP.watchList.entries.find(entry_ => entry_.slug === entry.slug))
	console.log(this.entries)
	console.log(entries.length)
	return entries[Math.floor(Math.random()*this.entries.length)]
}

ATP.Search.prototype.clearEntries = function() {
	this.entries = []
}