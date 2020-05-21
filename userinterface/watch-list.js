UserInterface.model({
	name: "watchlist",
	method: UserInterface.insertBefore,
	properties: {
		tagName: "div"
	}
})

UserInterface.bind("watchlist", async (element) => {

	const watchList = new WatchList()

	watchList.initialize(localStorage, document.querySelector(".series-title"))

	new MutationObserver(mutationsList => {
		if(watchList.entries.filter(entry => entry.url === location.pathname).length === 0)
			loop:for(let mutation of mutationsList) {
				for(let addedNode of mutation.addedNodes) {
					if(addedNode.className === "page-enter page-enter-active") { // FIX
						UserInterface.runModel("watchlist.add", { parentNode: document.body, bindingArgs: [watchList] })
						break loop
					} else if(addedNode.className === "donations" && watchList.entries.filter(entry => entry.url === WatchList.slugify(location.pathname)).length === 0) {
						UserInterface.runModel("watchlist.add", { parentNode: document.querySelector(".video-data +.donations"), bindingArgs: [watchList] })
					}
				}
			}
	}).observe(document.documentElement, { attributes: true, childList: true, subtree: true })

	await UserInterface.runModel("watchlist.menu", { bindingArgs: [watchList] })

})
