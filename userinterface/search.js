UserInterface.model({
	name: "search",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "atp-search"
	}
})

UserInterface.bind("search", async (element, atp) => {

	const search = new ATP.Search()

	let _seriesNodes = null
	const _observer = new MutationObserver(() => {
		UserInterface.announce(search, "entries render state")
	})

	UserInterface.listen(atp, "search entry navigate", (entry) => {
		window.location.href = ATP.buildAnimeURL(entry.slug)
	})

	UserInterface.listen(search, "entries render state", () => {
		if(_observer) {
			_observer.disconnect()
		}
		for(const seriesNode of _seriesNodes) {
			const titleNode = seriesNode.querySelector(".series-title")
			const slug = ATP.getSlug(titleNode.href)
			entry = ATP.watchList.entries.find(entry => entry.slug === slug)
			if(entry && entry.slug === slug) {
				seriesNode.classList.remove("completed", "plan-to-watch", "watching")
				if(entry.state === ATP.WatchListEntry.STATE_COMPLETED) {
					seriesNode.classList.add("completed")
				} else if(entry.state === ATP.WatchListEntry.STATE_PLAN_TO_WATCH) {
					seriesNode.classList.add("plan-to-watch")
				} else if(entry.state === ATP.WatchListEntry.STATE_WATCHING) {
					seriesNode.classList.add("watching")
				}
			}
		}
		_observer.observe(document.querySelector(".series ul"), { childList: true, subtree: true, attributes: true })
	})

	UserInterface.listen(ATP.watchList, "entry removed", () => {
		if(_seriesNodes !== null) {
			UserInterface.announce(search, "entries render state")
		}
	})

	UserInterface.listen(ATP.watchList, "entry updated", () => {
		if(_seriesNodes !== null) {
			UserInterface.announce(search, "entries render state")
		}
	})

	UserInterface.listen(atp, "page rendered", async () => {
		ATP.log("[atp] Rendering search...")
		search.clearEntries()

		if(_observer) {
			_observer.disconnect()
		}

		if(ATP.isAnimePage(location.pathname) === false) {
			const seriesNode = document.querySelector(".series")
			_seriesNodes = [...document.querySelectorAll(".series li")]

			for(const seriesNode of _seriesNodes) {
				const titleNode = seriesNode.querySelector(".series-title")
				search.addEntry({
					title: titleNode.textContent.trim(),
					slug: ATP.getSlug(titleNode.href)
				})
			}

			UserInterface.announce(search, "entries render state")

			seriesNode.parentNode.classList.add("atp-search")

			await UserInterface.runModel("search.random", {
				parentNode: seriesNode,
				bindingArgs: [atp, search]
			})

			_observer.observe(document.querySelector(".series ul"), { childList: true, subtree: true, attributes: true })
		} else {
			_seriesNodes = null
		}
	})

})
