UserInterface.model({
	name: "watchlist.add",
	method: UserInterface.insertBefore,
	properties: {
		tagName: "button",
		className: "add_to_watchlist",
		textContent: "Add to Watchlist"
	}
})

UserInterface.bind("watchlist.add", (element, watchlist) => {

	element.addEventListener("click", () => {
		element.parentNode.removeChild(element)
		UserInterface.announce(watchlist, "entry add", {
			name: document.querySelector(".series-title").textContent.trim(),
			slug: location.pathname.split("/")[2]
		})
	})

})
