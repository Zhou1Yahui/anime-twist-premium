UserInterface.model({
	name: "search.random",
	method: UserInterface.insertBefore,
	properties: {
		tagName: "button",
		textContent: "🎲"
	}
})

UserInterface.bind("search.random", async (element, atp, search) => {

	element.addEventListener("click", () => {
		const entry = search.getRandomEntry()
		UserInterface.announce(atp, "popup confirm open", { eventYes: "search entry navigate", data: entry, text: `Go for ${entry.title}?` })
	})

})
