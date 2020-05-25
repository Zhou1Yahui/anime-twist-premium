UserInterface.model({
	name: "watchlist",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "atp"
	}
})

UserInterface.bind("watchlist", async (element) => {

	const watchList = new ATP.WatchList()

	let _nuxtCount = 0
	let _pathname = location.pathname

	watchList.initialize(localStorage, _pathname)

	UserInterface.listen(watchList, "entries popup", () => {
		UserInterface.announce(watchList, "popup open", {
			model: "watchlist.entries",
			bindingArgs: [watchList]
		})
	})

	UserInterface.listen(watchList, "entry add", async data => {
		const entry = watchList.addEntry(data)
		watchList.entry = entry
		UserInterface.announce(watchList, "entry added", entry)
	})

	UserInterface.listen(watchList, "entry remove", entry => {
		watchList.removeEntry(entry)
		watchList.entry = null
		if(watchList.entries.length === 0) {
			UserInterface.announce(watchList, "popup close")
		}
		UserInterface.announce(watchList, "entry removed", entry)
	})

	UserInterface.listen(watchList, "entry clear", async () => {
		for(const entry of watchList.entries) {
			await UserInterface.announce(watchList, "entry remove", entry)
		}
	})

	UserInterface.listen(watchList, "initialize", async () => {
		await UserInterface.runModel("collection.popup", { parentNode: document.body, bindingArgs: [watchList] })
		await UserInterface.runModel("watchlist.menu", {
			parentNode: document.querySelector(".toggle-settings"),
			bindingArgs: [watchList]
		})
		if(location.pathname.startsWith("/a/")) {
			await UserInterface.runModel("watchlist.add", {
				parentNode: document.querySelector(".video-data"),
				bindingArgs: [watchList]
			})
		}
	})

	new MutationObserver(async mutationsList => {
		loop:for(const mutation of mutationsList) {
			for(const addedNode of mutation.addedNodes) {
				if(location.pathname !== _pathname) {
					UserInterface.announce(watchList, "pathname update", { previous: _pathname, current: location.pathname })
					_pathname = location.pathname
				}
				if(addedNode.id === "__nuxt") {
					_nuxtCount++
				}
				if(addedNode.tagName === "MAIN" || _nuxtCount === 2) { // FIX
					if(addedNode.tagName === "BODY") {
						document.body.appendChild(element)
					}
					console.log("[atp] WatchList loaded")
					_nuxtCount = 0
					if(watchList.state === ATP.WatchList.STATE_IDLE) {
						watchList.state = ATP.WatchList.STATE_INITIALIZED
						console.log("[atp] Initializing")
						UserInterface.announce(watchList, "initialize")
					} else if(watchList.state === ATP.WatchList.STATE_INITIALIZED) {
						console.log("[atp] Resetting entry")
						watchList.entries = []
						watchList.entry = null
						watchList.initialize(localStorage, location.pathname)
						if(location.pathname.startsWith("/a/")) {
							await UserInterface.runModel("watchlist.add", {
								parentNode: document.querySelector(".video-data"),
								bindingArgs: [watchList]
							})
						}
					}
					break loop
				}
			}
		}
	}).observe(document.documentElement, { attributes: true, childList: true, subtree: true })

})
