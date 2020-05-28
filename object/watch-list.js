ATP.WatchList = function() {
	this.entry = null
	this.entries = []
}

/**
 * @param  {LocalStorage} localStorage
 */
ATP.WatchList.prototype.initialize = function(localStorage) {
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
 * @param  {string} data.title
 * @param  {string} data.slug
 * @return {WatchListEntry}
 */
ATP.WatchList.prototype.addEntry = function(data) {
	if(data.name) { // Moving from name to title. Condition should be removed in two version or so
		data.title = data.name
	}
	const entry = new ATP.WatchListEntry(data.title, data.slug)
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