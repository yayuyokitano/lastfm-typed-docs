const prepositionMap = {
	get: "for",
	delete: "from",
	add: "to",
	search: "for"
}
const appendPreposition = (endpointName:string) => `${endpointName} ${prepositionMap[endpointName.split(" ")[0] as "get"|"delete"|"add"|"search"]}`;
export const endpointToHuman = (endpointName:string) => appendPreposition(endpointName.replace(/([A-Z])/g, " $1").trim().toLowerCase());
export const randomIn = (arr:any[]) => arr?.[Math.floor(Math.random() * arr.length)] ?? "";