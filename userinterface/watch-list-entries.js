UserInterface.model({
	name: "watchlist.entries",
	method: UserInterface.appendChild,
	properties: {
		tagName: "nav",
		style: "display: grid; grid-gap: 10px",
		className: "entries"
	}
})

UserInterface.bind("watchlist.entries", async (element, watchList) => {

	for(let entry of watchList.entries) {
		await UserInterface.runModel("watchlist.entry", { data: entry, parentNode: element, bindingArgs: [watchList, entry] })
	}

})



