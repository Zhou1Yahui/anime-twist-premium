ATP.WatchList = function() {
	this.entry = null
	this.entries = []
}

/**
 * @param  {LocalStorage} localStorage
 * @param  {string}       pathname
 */
ATP.WatchList.prototype.initialize = function(localStorage, pathname) {
	let entriesData = []
	if(localStorage.getItem("entries") === null) {
		localStorage.setItem("entries", JSON.stringify(this.entries))
	} else {
		entriesData = JSON.parse(localStorage.getItem("entries"))
	}
	entriesData.forEach(data => this.addEntry(data))
}

/**
 * @param  {Object} data
 * @param  {string} data.name
 * @param  {string} data.slug
 * @return {Entry}
 */
ATP.WatchList.prototype.addEntry = function(data) {
	const entry = new ATP.WatchListEntry(data.name, data.slug, data.completed)
	this.entries.push(entry)
	localStorage.setItem("entries", JSON.stringify(this.entries))
	return entry
}

/**
 * @param  {Entry} entry
 */
ATP.WatchList.prototype.removeEntry = function(entry) {
	this.entries.splice(this.entries.indexOf(entry), 1)
	localStorage.setItem("entries", JSON.stringify(this.entries))
}