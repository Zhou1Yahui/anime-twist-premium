UserInterface.model({
	name: "watchlist",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "atp"
	}
})

UserInterface.bind("watchlist", async (element) => {

	const watchList = new WatchList()

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
		UserInterface.announce(watchList, "entry set", entry)
		UserInterface.announce(watchList, "entry added", entry)
	})

	UserInterface.listen(watchList, "entry remove", entry => {
		watchList.removeEntry(entry)
		if(watchList.entries.length === 0) {
			UserInterface.announce(watchList, "popup close")
		}
		UserInterface.announce(watchList, "entry removed", entry)
	})

	UserInterface.listen(watchList, "initialize", async () => {
		await UserInterface.runModel("collection.popup", { parentNode: document.body, bindingArgs: [watchList] })
		await UserInterface.runModel("watchlist.menu", { parentNode: element, bindingArgs: [watchList] })
		await UserInterface.runModel("watchlist.add", { parentNode: element, bindingArgs: [watchList] })
	})

	new MutationObserver(mutationsList => {
		loop:for(let mutation of mutationsList) {
			for(let addedNode of mutation.addedNodes) {
				if(location.pathname !== _pathname) {
					UserInterface.announce(watchList, "pathname update", { previous: _pathname, current: location.pathname })
					_pathname = location.pathname
				}
				if(addedNode.tagName === "BODY") {
					document.body.appendChild(element)
				}
				if(addedNode.id === "__nuxt") {
					_nuxtCount++
				}
				if(addedNode.tagName === "MAIN" || _nuxtCount === 2) { // FIX
					// console.log("[atp] WatchList loaded")
					_nuxtCount = 0
					if(watchList.state === WatchList.STATE_IDLE) {
						watchList.state = WatchList.STATE_INITIALIZED
						// console.log("[atp] Initializing")
						UserInterface.announce(watchList, "initialize")
					} else if(watchList.state === WatchList.STATE_INITIALIZED) {
						// console.log("[atp] Resetting entry")
						watchList.entries = []
						watchList.entry = null
						watchList.initialize(localStorage, location.pathname)
						UserInterface.announce(watchList, "entry set", watchList.entry)
					}
					break loop
				}
			}
		}
	}).observe(document.documentElement, { attributes: true, childList: true, subtree: true })

})
