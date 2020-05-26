UserInterface.model({
	name: "watchlist.entry",
	method: UserInterface.appendChild,
	callback: data => ({
		tagName: "div",
		style: "display: grid; grid-template-columns: 1fr auto; grid-gap: 15px",
		className: "atp-watch-list-entry",
		children: [
			{
				title: data.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
				tagName: "a",
				href: data.url,
				className: "name",
				textContent: data.name
			},
			{
				tagName: "div",
				className: "controls",
				style: "display: grid; grid-auto-flow: column; grid-gap: 5px; visibility: hidden",
				children: [
					...ATP.SEARCH_ENGINE_LIST.map(engine => ({
						tagName: "a",
						target: "_blank",
						title: `Lookup ${data.name} on ${engine.name}`,
						href: engine.buildURL(data),
						children: [
							{
								tagName: "img",
								src: engine.icon,
								width: 24
							}
						]
					})),
					{
						tagName: "div",
						className: "remove",
						style: "cursor: pointer;",
						textContent: "❌"
					}
				]
			}
		]
	})
})

UserInterface.bind("watchlist.entry", (element, atp, watchList, entry) => {

	const listeners = []

	listeners.push(UserInterface.listen(watchList, "entry remove", entry_ => {
		if(entry_ === entry) {
			listeners.forEach(listener => UserInterface.removeListener(listener))
			element.remove()
		}
	}))

	element.addEventListener("mouseout" , () => {
		element.querySelector(".controls").style.visibility =  "hidden"
	})

	element.addEventListener("mouseover" , () => {
		element.querySelector(".controls").style.visibility =  "initial"
	})

	element.querySelector(".remove").addEventListener("click" , () => {
		UserInterface.announce(atp, "popup confirm open", { eventYes: "watchlist entry remove", eventNo: "watchlist entries popup", data: entry, text: "Are you sure?" })
	})

})