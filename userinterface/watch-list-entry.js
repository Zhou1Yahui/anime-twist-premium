UserInterface.model({
	name: "watchlist.entry",
	method: UserInterface.appendChild,
	callback: data => ({
		tagName: "div",
		style: "display: grid; grid-auto-flow: column; grid-gap: 15px",
		className: "entry",
		children: [
			{
				title: data.name,
				tagName: "a",
				href: data.url,
				className: "name",
				textContent: data.name
			},
			{
				tagName: "div",
				className: "remove",
				style: "cursor: pointer;",
				textContent: "❌"
			}
		]
	})
})


UserInterface.bind("watchlist.entry", (element, watchList, entry) => {

	const listeners = []

	listeners.push(UserInterface.listen(watchList, "entry remove", entry_ => {
		if(entry_ === entry) {
			listeners.forEach(listener => UserInterface.removeListener(listener))
			element.remove()
		}
	}))

	element.querySelector(".remove").addEventListener("click" , () => {
		UserInterface.announce(watchList, "entry remove", entry)
	})

})