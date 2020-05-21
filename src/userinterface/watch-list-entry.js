UserInterface.model({
	name: "watchlist.entry",
	method: UserInterface.appendChild,
	callback: data => ({
		tagName: "div",
		className: "entry",
		children: [
			{
				title: data.name,
				tagName: "a",
				href: data.url,
				className: "name",
				textContent: data.name
			}
		]
	})
})


UserInterface.bind("watchlist.entry", (element, watchList, entry) => {

	element.addEventListener("mouseup" , event => {
		if(event.button === 1) {
			event.preventDefault()
			UserInterface.announce(watchList, "entry remove", entry)
		}
	})


})