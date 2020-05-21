UserInterface.model({
	name: "watchlist.entries",
	method: UserInterface.insertBefore,
	properties: {
		tagName: "nav",
		className: "entries"
	}
})

UserInterface.bind("watchlist.entries", async (element, watchList) => {

	let _visible = false

	UserInterface.listen(watchList, "entries show", () => {
		_visible = true
		element.classList.remove("show")
	})

	UserInterface.listen(watchList, "entries hide", () => {
		_visible = false
		element.classList.add("show")
	})

	UserInterface.listen(watchList, "entries toggle", () => {
		if(_visible === true) {
			UserInterface.announce(watchList, "entries hide")
		} else {
			UserInterface.announce(watchList, "entries show")
		}
	})

	UserInterface.listen(watchList, "entry add", async data => {
		const entry = watchList.addEntry(data)
		await UserInterface.runModel("entry", { data, parentNode: element, bindingArgs: [watchList, entry] })
		UserInterface.announce(watchList, "entry added")
	})

	UserInterface.listen(watchList, "entry remove", entry => {
		entry.parentNode.removeChild(entry)
		watchList.removeEntry(entry)
		if(watchList.entries.length === 0) {
			UserInterface.announce(watchList, "entries hide")
		}
	})

	window.addEventListener("keyup", event => {
		if(event.keyCode === 27) {
			UserInterface.announce(watchList, "entries show")
		}
	})

	for(let entry of watchList.entries) {
		await UserInterface.runModel("watchlist.entry", { data: entry, parentNode: element })
	}

})



