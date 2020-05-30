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
			element.title = "Remove from Watchlist"
		} else {
			element.textContent = "➕"
			element.title = "Add to Watchlist"
		}
	}))

	listeners.push(UserInterface.listen(watchList, "entry removed", () => {
		if(watchList.entry === null) {
			element.textContent = "➕"
			element.title = "Add to Watchlist"
		} else {
			element.textContent = "🗑️"
			element.title = "Remove from Watchlist"
		}
	}))

	listeners.push(UserInterface.listen(watchList, "entries clear", () => {
		element.textContent = "➕"
			element.title = "Add to Watchlist"
	}))

	element.addEventListener("click", () => {
		if(watchList.entry === null) {
			const entry = {
					title: document.querySelector(".series-title").textContent.trim(),
					slug: ATP.getSlug(location.pathname)
			}
			UserInterface.announce(atp, "popup controls open", [
				{
					text: "Watching",
					action: "watchlist entry add",
					model: "collection.button",
					value: {
						...entry,
						state: ATP.WatchListEntry.STATE_WATCHING
					}
				},
				{
					text: "Completed",
					action: "watchlist entry add",
					model: "collection.button",
					value: {
						...entry,
						state: ATP.WatchListEntry.STATE_COMPLETED
					}
				},
				{
					text: "Plan to Watch",
					action: "watchlist entry add",
					model: "collection.button",
					value: {
						...entry,
						state: ATP.WatchListEntry.STATE_PLAN_TO_WATCH
					}
				}
			])
			// UserInterface.announce(watchList, "entry add", {
			// 	title: document.querySelector(".series-title").textContent.trim(),
			// 	slug: ATP.getSlug(location.pathname),
			// 	state: ATP.WatchListEntry.STATE_WATCHING
			// })
		} else {
			UserInterface.announce(atp, "popup confirm open", { eventYes: "watchlist entry remove", data: { entry: watchList.entry }, text: "Are you sure?" })
		}
	})

})
