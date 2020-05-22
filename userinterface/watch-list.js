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

	watchList.initialize(localStorage, location.pathname)

	UserInterface.listen(watchList, "entry add", async data => {
		const entry = watchList.addEntry(data)
		UserInterface.announce(watchList, "entry added", entry)
	})

	UserInterface.listen(watchList, "entry remove", entry => {
		watchList.removeEntry(entry)
		if(watchList.entries.length === 0) {
			UserInterface.announce(watchList, "popup close")
		}
		UserInterface.announce(watchList, "entry removed", entry)
	})

	await UserInterface.runModel("collection.popup", { parentNode: document.body, bindingArgs: [watchList] })
	await UserInterface.runModel("watchlist.menu", { parentNode: element, bindingArgs: [watchList] })
	await UserInterface.runModel("watchlist.add", { parentNode: element, bindingArgs: [watchList] })

})
