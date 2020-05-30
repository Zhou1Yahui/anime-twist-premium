UserInterface.model({
	name: "watchlist.list",
	method: UserInterface.appendChild,
	callback: data => ({
		tagName: "div",
		className: `list ${data.className}`,
		children: [
			{
				tagName: "h2",
				className: "title",
				title: "Toggle List",
				textContent: data.title
			},
			{
				tagName: "div",
				className: "entries",
			},
			{
				tagName: "p",
				className: "no-result",
				textContent: "There's nothing here."
			}
		]
	})
})

UserInterface.bind("watchlist.list", async (element, atp, watchList, entryState) => {

	const entriesNode = element.querySelector(".entries")
	const listeners = []

	listeners.push(UserInterface.listen(atp, "popup close", () => {
		listeners.forEach(listener => UserInterface.removeListener(listener))
	}))

	listeners.push(UserInterface.listen(watchList, "lists render", async () => {
		ATP.log("[atp] Rendering watchlist entries...", entryState)

		const entries = watchList.entries.filter(entry => entry.state === entryState)
		for(const entry of entries) {
			await UserInterface.runModel("watchlist.entry", { data: entry, parentNode: entriesNode, bindingArgs: [atp, watchList, entry] })
		}
	}))

	listeners.push(UserInterface.listen(watchList, "entry updated", async data => {
		if(data.data.state === entryState) {
			await UserInterface.runModel("watchlist.entry", { data: data.entry, parentNode: entriesNode, bindingArgs: [atp, watchList, data.entry] })
		}
	}))

	element.querySelector(".title").addEventListener("click", () => {
		element.classList.toggle("hidden")
	})

})



