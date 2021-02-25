let packs = {}

async function loadPack(packName, {failOnNoPack = true}) {
	if(packs[packName]) {
		return packs[packName];
	} else {
		let pack = game.packs.find(p=>p.metadata.label === packName);
		if(!pack) {
			if(failOnNoPack) {
				throw Error(`No pack found with name ${packName}`);
			} else {
				return [];
			}
		}
		let index = await pack.getIndex();
		packs[packName] = Promise.all(index.map((i)=>pack.getEntity(i._id)));
		return packs[packName]
	}
}

export async function loadPackItems(packNames = [], options = {}) {
	if(typeof(packNames) === "string") {
		return loadPack(packNames, options)
	} else {
		let items = await packNames.mapAsync((packName)=>loadPack(packName, options));
		return items.flatMap(i=>i)
	}
}