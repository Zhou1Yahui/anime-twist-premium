UserInterface.model({
	name: "watchlist.entries",
	method: UserInterface.appendChild,
	properties: {
		tagName: "nav",
		id: "atp-watch-list-entries",
		style: "display: grid; grid-gap: 10px",
		children: [
			{
				tagName: "div",
				style: "display: grid; grid-gap: 10px",
				className: "entries"
			},
			{
				tagName: "button",
				className: "clear",
				textContent: "Clear"
			}
		]
	}
})

UserInterface.bind("watchlist.entries", async (element, atp, watchList) => {

	const entriesNode = element.querySelector(".entries")

	for(const entry of watchList.entries) {
		await UserInterface.runModel("watchlist.entry", { data: entry, parentNode: entriesNode, bindingArgs: [atp, watchList, entry] })
	}

	element.querySelector(".clear").addEventListener("click" , () => {
		UserInterface.announce(watchList, "popup confirm open", { eventYes: "watchlist entry clear", eventNo: "watchlist entries popup", text: "Are you sure?" })
	})


})



