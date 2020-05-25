ATP = {}

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
ATP.slugify = pathname => {
	return pathname.split("/")[2]
}

