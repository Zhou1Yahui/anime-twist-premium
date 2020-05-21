UserInterface.model({
	name: "watch_list",
	method: UserInterface.insertBefore,
	properties: {
		tagName: "div"
	}
})

UserInterface.bind("watch_list", async (element) => {

	alert()

	const watchList = new WatchList()

	watchList.initialize(localStorage, document.querySelector(".series-title"))

	new MutationObserver(mutationsList => {
		if(watchList.entries.filter(entry => entry.url === location.pathname).length === 0)
			loop:for(let mutation of mutationsList) {
				for(let addedNode of mutation.addedNodes) {
					if(addedNode.className === "page-enter page-enter-active") { // FIX
						UserInterface.runModel("watchlist.add", { parentNode: document.body, bindingArgs: [watchList] })
						break loop
					}
				}
			}
	}).observe(document.documentElement, { attributes: true, childList: true, subtree: true })

	await UserInterface.runModel("watchlist.menu", { bindingArgs: [watchList] })
	if(watchList.entries.filter(entry => entry.url === location.pathname).length === 0) {
		await UserInterface.runModel("watchlist.add", { parentNode: document.querySelector(".video-data +.donations"), bindingArgs: [watchList] })
	}

})
