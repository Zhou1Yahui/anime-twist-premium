UserInterface.model({
	name: "watchlist.view",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		className: "atp-watchlist-menu",
		children: [
			{
				tagName: "button",
				className: "toggle",
				title: "Middle click an entry to remove it.",
				textContent: "Watch List"
			}
		]
	}
})

UserInterface.bind("watchlist.menu", async (element, watchList) => {

	element.querySelector(".toggle").addEventListener("click", () => {
		if(watchList.entries.length >= 1) {
			UserInterface.announce(watchList, "entries toggle")
		}
	})

})