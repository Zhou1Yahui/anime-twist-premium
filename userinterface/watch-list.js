UserInterface.model({
	name: "watchlist",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "atp-watchlist"
	}
})

UserInterface.bind("watchlist", async (element, atp) => {

	const watchList = new ATP.WatchList()

	let _menuLoaded = false

	watchList.initialize(localStorage, location.pathname)

	UserInterface.listen(atp, "page rendered", async () => {
		const entry = watchList.entries.find(entry => entry.slug === ATP.getSlug(location.pathname))
		if(entry) {
			watchList.entry = entry
		} else {
			watchList.entry = null
		}
		if(_menuLoaded === false) {
			_menuLoaded = true
			await UserInterface.runModel("watchlist.menu", {
				parentNode: document.querySelector(".toggle-settings"),
				bindingArgs: [atp, watchList]
			})
		}
		if(ATP.isAnimePage(location.pathname)) {
			await UserInterface.runModel("watchlist.add", {
				parentNode: document.querySelector(".video-data"),
				bindingArgs: [atp, watchList]
			})
		}
	})

	UserInterface.listen(atp, "watchlist entries popup", () => {
		UserInterface.announce(watchList, "entries popup")
	})

	UserInterface.listen(atp, "watchlist entry remove", async entry => {
		await UserInterface.announce(watchList, "entry remove", entry)
		UserInterface.announce(watchList, "entries popup", entry)
	})

	UserInterface.listen(atp, "watchlist entries clear", () => {
		UserInterface.announce(watchList, "entries clear")
	})

	UserInterface.listen(watchList, "entries popup", () => {
		UserInterface.announce(atp, "popup open", {
			model: "watchlist.entries",
			bindingArgs: [atp, watchList]
		})
	})

	UserInterface.listen(watchList, "entry add", async data => {
		const entry = watchList.addEntry(data)
		watchList.entry = entry
		UserInterface.announce(watchList, "entry added", entry)
	})

	UserInterface.listen(watchList, "entry remove", entry => {
		watchList.removeEntry(entry)
		if(watchList.entry === entry) {
			watchList.entry = null
		}
		if(watchList.entries.length === 0) {
			UserInterface.announce(atp, "popup close")
		}
		UserInterface.announce(watchList, "entry removed", entry)
	})

	UserInterface.listen(watchList, "entry clear", async () => {
		for(const entry of watchList.entries) {
			await UserInterface.announce(watchList, "entry remove", entry)
		}
	})

})
