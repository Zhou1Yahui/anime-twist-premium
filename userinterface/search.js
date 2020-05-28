UserInterface.model({
	name: "search",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "atp-search"
	}
})

UserInterface.bind("search", async (element, atp) => {

	const search = new ATP.Search()


	UserInterface.listen(atp, "search entry navigate", (entry) => {
		window.location.href = ATP.buildAnimeURL(entry.slug)
	})

	UserInterface.listen(atp, "page rendered", async () => {
		ATP.log("[atp] Rendering search...")
		if(ATP.isAnimePage(location.pathname) === false) {
			const seriesNode = document.querySelector(".series");
			const seriesNodes = document.querySelectorAll(".series li");

			[...seriesNodes].forEach(seriesNode => {
				const titleNode = seriesNode.querySelector(".series-title")
				search.addEntry({
					title: titleNode.textContent.trim(),
					slug: ATP.getSlug(titleNode.href)
				})
			})

			seriesNode.parentNode.classList.add("atp-search")

			await UserInterface.runModel("search.random", {
				parentNode: seriesNode,
				bindingArgs: [atp, search]
			})
		}
	})

})
