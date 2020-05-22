UserInterface.model({
	name: "watchlist.add",
	method: UserInterface.appendChild,
	properties: {
		tagName: "button",
		disabled: true,
		className: "add_to_watchlist",
		textContent: "➕",
		title: "Add to Watchlist"
	}
})

UserInterface.bind("watchlist.add", (element, watchList) => {

	if(watchList.entry === null) {
		element.disabled = false
	}

	UserInterface.listen(watchList, "entry removed", entry => {
		if(entry === watchList.entry) {
			element.disabled = false
		}
	})

	UserInterface.listen(watchList, "entry set", entry => {
		if(entry === watchList.entry) {
			element.disabled = false
		}
	})

	element.addEventListener("click", () => {
		element.disabled = true
		UserInterface.announce(watchList, "entry add", {
			name: document.querySelector(".series-title").textContent.trim(),
			slug: WatchList.slugify(location.pathname)
		})
	})

})
