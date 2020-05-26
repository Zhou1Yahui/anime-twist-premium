ATP = function() {
	this.state = ATP.STATE_IDLE
}


/**
 * @param  {string} slug
 * @return {string}
 */
ATP.buildAnimeURL = slug => {
	return location.origin + "/a/" + slug + "/first"
}

/**
 * @param  {string} pathname
 * @return {string}
 */
ATP.getSlug = pathname => {
	return pathname.split("/")[2]
}

/**
 * @param  {string} pathname
 * @return {string}
 */
ATP.isAnimePage = pathname => {
	return pathname.startsWith("/a/")
}

ATP.STATE_IDLE = "STATE_IDLE"
ATP.STATE_RENDERING = "STATE_RENDERING"
ATP.STATE_RENDERED = "STATE_RENDERED"