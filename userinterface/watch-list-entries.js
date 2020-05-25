UserInterface.model({
	name: "watchlist.entries",
	method: UserInterface.appendChild,
	properties: {
		tagName: "nav",
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

UserInterface.bind("watchlist.entries", async (element, watchList) => {

	const entriesNode = element.querySelector(".entries")

	for(const entry of watchList.entries) {
		await UserInterface.runModel("watchlist.entry", { data: entry, parentNode: entriesNode, bindingArgs: [watchList, entry] })
	}

	element.querySelector(".clear").addEventListener("click" , () => {
		UserInterface.announce(watchList, "popup confirm open", { eventYes: "entry clear", eventNo: "entries popup", text: "Are you sure?" })
	})


})



