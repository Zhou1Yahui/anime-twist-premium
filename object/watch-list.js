function WatchList() {
	this.entry = null
	this.entries = []
}

/**
 * @param  {LocalStorage} localStorage
 * @param  {string}       pathname
 */
WatchList.prototype.initialize = function(localStorage, pathname) {
	let entriesData = []
	if(localStorage.getItem("entries") === null) {
		localStorage.setItem("entries", JSON.stringify(this.entries))
	} else {
		entriesData = JSON.parse(localStorage.getItem("entries"))
	}
	entriesData.forEach(data => this.addEntry(data))
	const entry = this.entries.find(entry => entry.slug === WatchList.slugify(pathname))
	if(entry) {
		this.entry = entry
	}
}

/**
 * @param  {Object} data
 * @param  {string} data.name
 * @param  {string} data.slug
 * @return {Entry}
 */
WatchList.prototype.addEntry = function(data) {
	const entry = new WatchListEntry(data.name, data.slug)
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

/**
 * @param  {string} pathname
 * @return {string}
 */
WatchList.slugify = function(pathname) {
	return pathname.split("/")[2]
}