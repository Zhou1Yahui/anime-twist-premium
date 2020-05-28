UserInterface.model({
	name: "atp",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "atp"
	}
})

UserInterface.bind("atp", async (element) => {

	const atp = new ATP()

	let _pathname = location.pathname

	await UserInterface.runModel("collection.popup", { parentNode: element, bindingArgs: [atp] })

	await UserInterface.runModel("watchlist", { parentNode: element, bindingArgs: [atp] })
	await UserInterface.runModel("search", { parentNode: element, bindingArgs: [atp] })

	new MutationObserver(async mutationsList => {
		loop:for(const mutation of mutationsList) {
			for(const addedNode of mutation.addedNodes) {
				if(location.pathname !== _pathname) {
					UserInterface.announce(atp, "pathname update", { previous: _pathname, current: location.pathname })
					_pathname = location.pathname
				}
				if(addedNode.tagName === "BODY") {
					document.body.appendChild(element)
				}
				if(atp.state === ATP.STATE_RENDERED && addedNode.parentNode.classList.contains("main-column")) {
					atp.state = ATP.STATE_RENDERING
					break
				}
				if((atp.state === ATP.STATE_RENDERING || atp.state === ATP.STATE_IDLE) && document.querySelector(".root-container") !== null) {
					atp.state = ATP.STATE_RENDERED
					await UserInterface.announce(atp, "page rendered")
					break loop
				}
			}
		}
	}).observe(document.documentElement, { childList: true, subtree: true })

})
