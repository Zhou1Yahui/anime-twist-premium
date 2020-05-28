UserInterface.model({
	name: "watchlist",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "atp-watchlist"
	}
})

UserInterface.bind("watchlist", async (element, atp) => {

	const watchList = new ATP.WatchList()
	ATP.watchList = watchList

	let _menuRendered = false

	watchList.initialize(localStorage)

	UserInterface.listen(atp, "page rendered", async () => {
		ATP.log("[atp] Rendering watchlist...")
		const entry = watchList.entries.find(entry => entry.slug === ATP.getSlug(location.pathname))
		if(entry) {
			watchList.entry = entry
		} else {
			watchList.entry = null
		}
		if(_menuRendered === false) {
			ATP.log("[atp] Rendering watchlist menu...")
			_menuRendered = true
			await UserInterface.runModel("watchlist.menu", {
				parentNode: document.querySelector(".toggle-settings"),
				bindingArgs: [atp, watchList]
			})
		}
		if(ATP.isAnimePage(location.pathname)) {
			ATP.log("[atp] Rendering watchlist add...")
			await UserInterface.runModel("watchlist.add", {
				parentNode: document.querySelector(".video-data"),
				bindingArgs: [atp, watchList]
			})
		}
	})

	UserInterface.listen(atp, "watchlist entries popup", () => {
		UserInterface.announce(watchList, "entries popup")
	})

	UserInterface.listen(atp, "watchlist entry remove", async data => {
		await UserInterface.announce(watchList, "entry remove", data.entry)
		if(data.popup) {
			UserInterface.announce(watchList, "entries popup")
		}
	})

	UserInterface.listen(atp, "watchlist entries clear", async () => {
		await UserInterface.announce(watchList, "entries clear")
		UserInterface.announce(watchList, "entries popup")
	})

	UserInterface.listen(watchList, "entries popup", () => {
		UserInterface.announce(atp, "popup open", {
			model: "watchlist.entries",
			bindingArgs: [atp, watchList]
		})
	})
	UserInterface.listen(watchList, "entry add", async data => {
		const entry = watchList.addEntry(data)
		watchList.entry = entry
		UserInterface.announce(watchList, "entry added", entry)
	})

	UserInterface.listen(watchList, "entry remove", async entry => {
		watchList.removeEntry(entry)
		if(watchList.entry === entry) {
			watchList.entry = null
		}
		await UserInterface.announce(entry, "remove")
		UserInterface.announce(watchList, "entry removed", entry)
	})

	UserInterface.listen(watchList, "entry update", async data => {
		watchList.updateEntry(data.entry, data.data)
		UserInterface.announce(watchList, "entry updated", data)
	})

	UserInterface.listen(watchList, "entries clear", async () => {
		const length = watchList.entries.length
		for(let i = 0; i < length; i++) {
			await UserInterface.announce(watchList, "entry remove", watchList.entries[0])
		}
		watchList.clearEntries()
	})

	UserInterface.listen(watchList, "entries set", async entries => {
		await UserInterface.announce(watchList, "entries clear")
		const entry = entries.find(entry => entry.slug === ATP.getSlug(location.pathname))
		if(entry) {
			watchList.entry = entry
		} else {
			watchList.entry = null
		}
		for(const entry of entries) {
			watchList.addEntry(entry)
		}
		UserInterface.announce(watchList, "entries render")
	})

	UserInterface.listen(watchList, "export", () => {
		const blob = new Blob([JSON.stringify(watchList.entries)], { type : "application/json" })
		const reader = new FileReader()
		const anchorElement = document.createElement("a")
		const date = new Date()
		anchorElement.download = `atp-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`
		reader.onload = function(event) {
			anchorElement.href = event.target.result
			anchorElement.click()
		}
		reader.readAsDataURL(blob)
	})

	UserInterface.listen(watchList, "import", () => {
		const inputElement = document.createElement("input")
		inputElement.type = "file"
		inputElement.addEventListener("change", event => {
			const reader = new FileReader();
			reader.onload = function(event_) {
				UserInterface.announce(watchList, "entries set", JSON.parse(event_.target.result))
			}
			reader.readAsText(event.target.files[0])
		})
		inputElement.click()
	})

})
