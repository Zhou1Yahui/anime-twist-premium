UserInterface.model({
	name: "watchlist.entries",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "atp-watch-list-entries",
		children: [
			{
				tagName: "h2",
				textContent: "Watching"
			},
			{
				tagName: "div",
				className: "entries-watching"
			},
			{
				tagName: "h2",
				textContent: "Completed"
			},
			{
				tagName: "div",
				className: "entries-completed"
			},
			{
				tagName: "div",
				className: "controls",
				children: [
					{
						tagName: "button",
						className: "clear",
						textContent: "Clear"
					},
					{
						tagName: "button",
						className: "export",
						textContent: "Export"
					},
					{
						tagName: "button",
						className: "import",
						textContent: "Import"
					}
				]
			}
		]
	}
})

UserInterface.bind("watchlist.entries", async (element, atp, watchList) => {

	const listeners = []

	listeners.push(UserInterface.listen(atp, "popup close", () => {
		listeners.forEach(listener => UserInterface.removeListener(listener))
	}))

	listeners.push(UserInterface.listen(watchList, "entries render", async () => {
		ATP.log("[atp] Rendering watchlist entries...", watchList.entries.length)
		for(const entry of watchList.entries) {
			let entriesNode
			if(entry.state === ATP.WatchListEntry.STATE_COMPLETED) {
				entriesNode = element.querySelector(".entries-completed")
			} else {
				entriesNode = element.querySelector(".entries-watching")
			}
			await UserInterface.runModel("watchlist.entry", { data: entry, parentNode: entriesNode, bindingArgs: [atp, watchList, entry] })
		}
	}))

	listeners.push(UserInterface.listen(watchList, "entry updated", async data => {
		if(data.data.state) {
			let entriesNode
			if(data.data.state === ATP.WatchListEntry.STATE_COMPLETED) {
				entriesNode = element.querySelector(".entries-completed")
			} else {
				entriesNode = element.querySelector(".entries-watching")
			}
			await UserInterface.runModel("watchlist.entry", { data: data.entry, parentNode: entriesNode, bindingArgs: [atp, watchList, data.entry] })
		}
	}))

	element.querySelector(".clear").addEventListener("click" , () => {
		UserInterface.announce(atp, "popup confirm open", { eventYes: "watchlist entries clear", eventNo: "watchlist entries popup", text: "Are you sure?" })
	})

	element.querySelector(".export").addEventListener("click" , () => {
		UserInterface.announce(watchList, "export")
	})

	element.querySelector(".import").addEventListener("click" , () => {
		UserInterface.announce(watchList, "import")
	})

	UserInterface.announce(watchList, "entries render")

})



