UserInterface.model({
	name: "watchlist.add",
	method: UserInterface.appendChild,
	properties: {
		tagName: "button",
		disabled: true,
		style: "display: none",
		className: "add_to_watchlist",
		textContent: "➕",
		title: "Add to Watchlist"
	}
})

UserInterface.bind("watchlist.add", (element, watchList) => {

	if(watchList.entry === null) {
		element.disabled = false
	}

	if(document.location.pathname.startsWith("/a/")) {
		element.style.display = "block"
	}

	UserInterface.listen(watchList, "entry removed", entry => {
		if(entry === watchList.entry) {
			element.disabled = false
		}
	})

	UserInterface.listen(watchList, "entry set", entry => {
		if(!watchList.entry) {
			element.disabled = false
		} else if(entry === watchList.entry) {
			element.disabled = true
		}
	})

	UserInterface.listen(watchList, "pathname update", data => {
		if(data.current.startsWith("/a/")) {
			element.style.display = "block"
		} else {
			element.style.display = "none"
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
