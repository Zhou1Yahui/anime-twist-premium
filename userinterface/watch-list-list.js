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
				title: "Toggle list",
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
	const _listeners = []

	_listeners.push(UserInterface.listen(atp, "popup close", async () => {
		_listeners.forEach(listener => UserInterface.removeListener(listener))
		await UserInterface.announce(atp, "paginator destroy")
	}))

	_listeners.push(UserInterface.listen(watchList, "lists render", async () => {
		ATP.log("[atp] Rendering watchlist list...", entryState)

		const entries = watchList.entries.filter(entry => entry.state === entryState)

		if(entries.length >= 1) {
			UserInterface.runModel("paginator", {
				parentNode: entriesNode,
				bindingArgs: [atp, "watchlist.entry", [atp, watchList], 5, entries]
			})
		}

	}))

	_listeners.push(UserInterface.listen(watchList, "entry updated", async data => {
		if(data.data.state === entryState) {
			await UserInterface.runModel("watchlist.entry", { data: data.entry, parentNode: entriesNode, bindingArgs: [atp, watchList, data.entry] })
		}
	}))

	element.querySelector(".title").addEventListener("click", () => {
		element.classList.toggle("hidden")
	})

})



