class Fill {
	constructor(runtime) {
		this.runtime = runtime
	}

	getInfo() {
		return {
			id: "Fetch",
			name: "Fetch",
			blocks: [
				{
					opcode: "FillDown",
					blockType: "command",
					text: "Fill Down"
				},
				{
					opcode: "FillUp",
					blockType: "command",
					text: "Fill Up"
				},
			]
		}
	}

	FillDown(args, util) {
		const target = util.target;
		this.runtime.renderer.penPoint(penSkinId, penState.penAttributes, target.x, target.y);
    this.runtime.requestRedraw();
	}

	FillUp(args, util) {
		
	}
}

(()=> {
    const extensionInstance = new Fill(window.vm.extensionManager.runtime)
    window.vm.extensionManager._loadedExtensions.set(
    	extensionInstance.getInfo().id, 
    	window.vm.extensionManager._registerInternalExtension(extensionInstance)
    )
})()
