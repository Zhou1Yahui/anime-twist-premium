UserInterface.model({
	name: "watchlist.menu",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		className: "atp-watchlist-menu",
		children: [
			{
				tagName: "button",
				disabled: true,
				className: "watchlist",
				title: "Your watchlist (by Anime Twist Premium)",
				textContent: "📺"
			}
		]
	}
})

UserInterface.bind("watchlist.menu", async (element, watchList) => {

	const watchListButton = element.querySelector(".watchlist")

	if(watchList.entries.length >= 1) {
		watchListButton.disabled = false
	}

	UserInterface.listen(watchList, "entry added", () => {
		watchListButton.disabled = false
	})

	UserInterface.listen(watchList, "entry removed", () => {
		if(watchList.entries.length === 0) {
			watchListButton.disabled = true
		}
	})

	watchListButton.addEventListener("click", () => {
		if(watchList.entries.length >= 1) {
			UserInterface.announce(watchList, "popup open", {
				model: "watchlist.entries",
				bindingArgs: [watchList]
			})
		}
	})

})