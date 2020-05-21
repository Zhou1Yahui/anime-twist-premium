function WatchList() {
	this.serieTitle = null
	this.entries = []
}

/**
 * @param  {LocalStorage} localStorage
 * @param  {string}       serieTitle
 */
WatchList.prototype.initialize = function(localStorage, serieTitle) {
	this.serieTitle = serieTitle
	let entriesData = []
	if(localStorage.getItem("entries") === null) {
		localStorage.setItem("entries", [])
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
WatchList.prototype.addEntry = function(data) {
	const entry = new Entry(data.name, data.slug)
	this.entries.push(entry)
	localStorage.setItem("entries", JSON.stringify(this.entries))
	return entry
}

/**
 * @param  {Entry} entry
 */
WatchList.prototype.removeEntry = function(entry) {
	this.entries.splice(this.entries.indexOf(entry), 1)
	localStorage.setItem("entries", JSON.stringify(this.entries))
}