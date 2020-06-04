ATP.WatchList = function() {
	this.entry = null
	this.entries = []
	this.initialized = false
}

/**
 * @param  {LocalStorage} localStorage
 */
ATP.WatchList.prototype.initialize = function(localStorage) {
	ATP.log("[atp] Initializing watchlist", localStorage.getItem("atp_entries"))
	let entriesData = []
	if(localStorage.getItem("atp_entries") !== null) {
		entriesData = JSON.parse(localStorage.getItem("atp_entries"))
	}
	entriesData.forEach(data => this.addEntry(data))
	this.initialized = true
}

/**
 * @param  {Object} data
 * @param  {string} data.title
 * @param  {string} data.slug
 * @return {WatchListEntry}
 */
ATP.WatchList.prototype.addEntry = function(data) {
	// ATP.log("[atp] Adding entry to watchlist", data)
	const entry = new ATP.WatchListEntry(data.title, data.slug, data.state)
	this.entries.push(entry)
	if(this.initialized) {
		localStorage.setItem("atp_entries", JSON.stringify(this.entries))
	}
	return entry
}

/**
 * @param  {WatchListEntry} entry
 */
ATP.WatchList.prototype.removeEntry = function(entry) {
	ATP.log("[atp] Removing entry from watchlist", entry)
	this.entries.splice(this.entries.indexOf(entry), 1)
	localStorage.setItem("atp_entries", JSON.stringify(this.entries))
}

/**
 * @param  {WatchListEntry} entry
 * @param  {object} data
 */
ATP.WatchList.prototype.updateEntry = function(entry, data) {
	ATP.log("[atp] Updating watchlist entry", entry, data)
	for(const key in data) {
		entry[key] = data[key]
	}
	localStorage.setItem("atp_entries", JSON.stringify(this.entries))
}

ATP.WatchList.prototype.clearEntries = function() {
	ATP.log("[atp] Clearing watchlist entries", this.entries.length)
	this.entry = null
	this.entries = []
	localStorage.setItem("atp_entries", JSON.stringify(this.entries))
}