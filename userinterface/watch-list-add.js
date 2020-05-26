UserInterface.model({
	name: "watchlist.add",
	method: UserInterface.insertBefore,
	properties: {
		tagName: "button",
		style: "display: none",
		textContent: "➕",
		title: "Add to Watchlist"
	}
})

UserInterface.bind("watchlist.add", (element, atp, watchList) => {

	const listeners = []

	if(watchList.entry !== null) {
		element.textContent = "🗑️"
	}

	if(ATP.isAnimePage(location.pathname)) {
		element.style.display = "block"
	}

	listeners.push(UserInterface.listen(atp, "pathname update", data => {
		if(ATP.isAnimePage(data.current) === false) {
			listeners.forEach(listener => UserInterface.removeListener(listener))
		}
	}))

	listeners.push(UserInterface.listen(watchList, "entry added", entry => {
		if(entry === watchList.entry) {
			element.textContent = "🗑️"
		} else {
			element.textContent = "➕"
		}
	}))

	listeners.push(UserInterface.listen(watchList, "entry removed", () => {
		if(watchList.entry === null) {
			element.textContent = "➕"
		} else {
			element.textContent = "🗑️"
		}
	}))

	listeners.push(element.addEventListener("click", () => {
		if(watchList.entry === null) {
			UserInterface.announce(watchList, "entry add", {
				name: document.querySelector(".series-title").textContent.trim(),
				slug: ATP.getSlug(location.pathname)
			})
		} else {
			UserInterface.announce(watchList, "entry remove", watchList.entry)
		}
	}))

})
