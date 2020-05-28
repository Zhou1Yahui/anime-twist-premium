UserInterface.model({
	name: "player",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
	}
})

UserInterface.bind("player", (element, atp) => {

	UserInterface.listen(atp, "page rendered", async () => {
		ATP.log("[atp] Rendering player...")
		if(ATP.isAnimePage(location.pathname)) {
			await UserInterface.runModel("player.download", {
				parentNode: document.querySelector(".video-data"),
				bindingArgs: [atp]
			})
		}
	})

})
