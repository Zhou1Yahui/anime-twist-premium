UserInterface.model({
	name: "watchlist.entry",
	method: UserInterface.appendChild,
	callback: data => ({
		tagName: "div",
		style: "display: grid; grid-template-columns: 1fr auto; grid-gap: 15px",
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
				className: "controls",
				style: "display: grid; grid-auto-flow: column; grid-gap: 5px; visibility: hidden;",
				children: [
					{
						tagName: "a",
						target: "_blank",
						href: `https://anidb.net/anime/?adb.search=${data.name}&do.search=1`,
						className: "lookup",
						style: "cursor: pointer;",
						textContent: "🔍"
					},
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

UserInterface.bind("watchlist.entry", (element, watchList, entry) => {

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
		UserInterface.announce(watchList, "popup confirm open", { eventYes: "entry remove", eventNo: "entries popup", data: entry, text: "Are you sure?" })
	})

})