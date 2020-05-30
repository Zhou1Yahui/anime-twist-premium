UserInterface.model({
	name: "watchlist.entry",
	method: UserInterface.appendChild,
	callback: data => ({
		tagName: "div",
		className: "atp-watch-list-entry",
		children: [
			{
				tagName: "button",
				className: "state",
				title: data.state === ATP.WatchListEntry.STATE_COMPLETED || data.state === ATP.WatchListEntry.STATE_PLAN_TO_WATCH ? "Mark as watching" : "Mark as watched",
				textContent: data.state === ATP.WatchListEntry.STATE_COMPLETED ? "❌" : data.state === ATP.WatchListEntry.STATE_PLAN_TO_WATCH ? "📺" : "✔️"
			},
			{
				title: data.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
				tagName: "a",
				href: data.url,
				className: "name",
				textContent: data.title
			},
			{
				tagName: "div",
				className: "controls",
				children: [
					...ATP.SEARCH_ENGINE_LIST.map(engine => ({
						tagName: "a",
						target: "_blank",
						title: `Lookup ${data.title} on ${engine.name}`,
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
						tagName: "button",
						title: "Remove this entry",
						className: "remove",
						style: "cursor: pointer;",
						textContent: "🗑️"
					}
				]
			}
		]
	})
})

UserInterface.bind("watchlist.entry", (element, atp, watchList, entry) => {

	const listeners = []

	listeners.push(UserInterface.listen(entry, "remove", () => {
		listeners.forEach(listener => UserInterface.removeListener(listener))
		element.remove()
	}))

	element.querySelector(".state").addEventListener("click" , event => {
		element.remove()
		UserInterface.announce(watchList, "entry update", { entry,  data: { state: event.target.textContent === "✔️" ? ATP.WatchListEntry.STATE_COMPLETED : event.target.textContent === "📺" || event.target.textContent === "❌" ? ATP.WatchListEntry.STATE_WATCHING : ATP.WatchListEntry.STATE_PLAN_TO_WATCH  } })
	})

	element.querySelector(".remove").addEventListener("click" , () => {
		UserInterface.announce(atp, "popup confirm open", { eventYes: "watchlist entry remove", eventNo: "watchlist entries popup", data: { entry, popup: true }, text: "Are you sure?" })
	})

})