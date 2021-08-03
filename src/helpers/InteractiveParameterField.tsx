import { Parameter } from "./DocumentationGenerator";
import React from "react";
import * as Util from "./Util";

export const docs = {
	artist: {
		type: "string",
		description: (categoryName:string, endpointName:string) =>
			endpointName === "search" ?
			"Query to use for searching artist." :
			categoryName === "album" ?
			`Name of the artist of the album to ${Util.endpointToHuman(endpointName)}.` :
			`Name of the artist to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["KITANO REM"],
			["ヤユヨ"],
			["Akai Ko-en"],
			["Shiina Ringo"],
			["アカネサス"],
			["LOT SPiRiTS"],
			["ミズニ ウキクサ"],
			["Hump Back"]
		]
	},
	artistinput: {
		type: "artistInput",
		description: (categoryName:string, endpointName:string) => `An object containing either an artist property, or an mbid property, detailing the ${categoryName} to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["KITANO REM"],
			["ヤユヨ"],
			["Lily Sketch"],
			["オルターリードコード"],
			["村瀬真弓"],
			["フミンニッキ"],
			["前田和花"],
			["Jack in The b∅x"]
		]
	},
	album: {
		type: "string",
		description: (categoryName:string, endpointName:string) =>
			endpointName === "search" ?
			"Query to use for searching album." :
			`Name of the album to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["RAINSICK/オレンジ"],
			["ヤユヨ"],
			["ベランダのその先へ"],
			["人間なのさ"],
			["gloomy box"],
			["愛が証明できること"],
			["まっすぐなままでいい"],
			["メンタルパンク"]
		]
	},
	albuminput: {
		type: "albumInput",
		description: (categoryName:string, endpointName:string) => `An object containing either an artist and album property, or an mbid property, detailing the ${categoryName} to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["KITANO REM", "RAINSICK/オレンジ"],
			["ヤユヨ", "ヤユヨ"],
			["鈴", "ベランダのその先へ"],
			["聴色", "さよならを交わすとき"],
			["TETORA", "me me"],
			["赤い公園", "THE PARK"],
			["密会と耳鳴り", "メンタルパンク"],
			["ひかりのなかに", "まっすぐなままでいい"]
		]
	},
	autocorrect: {
		type: "boolean",
		description: "Whether to use autocorrect or not",
		default: [true]
	},
	country: {
		type: "string",
		description: "ISO 3166-1 country name of country to return data for.",
		default: ["Norway", "Malaysia", "Japan"]
	},
	lang: {
		type: "string",
		description: "Language to return biography in. ISO 639 alpha-2 code",
		default: [""]
	},
	limit: {
		type: "number",
		description: (categoryName:string, endpointName:string) => `Max number of ${categoryName}s to ${Util.endpointToHuman(endpointName)}.`,
		default: [50]
	},
	location: {
		type: "string",
		description: "name of metro area to return data for. Not sure if this actually works, but it is in the official docs so I implemented it.",
		default: [""]
	},
	page: {
		type: "number",
		description: (categoryName:string, endpointName:string) => `Which page to ${Util.endpointToHuman(endpointName)}. Page size equals the value of the limit parameter.`,
		default: [1]
	},
	password: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Password of a user to ${Util.endpointToHuman(endpointName)}.`,
		default: ["no lol"]
	},
	sk: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Session key of a user to ${Util.endpointToHuman(endpointName)}.`,
		default: [""]
	},
	tag: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Name of the tag to ${Util.endpointToHuman(endpointName).split(" ")[0]}.`,
		default: [""]
	},
	tags: {
		type: "string|string[]",
		description: (categoryName:string, endpointName:string) => `Name of the tag(s) to ${Util.endpointToHuman(endpointName).split(" ")[0]}.`,
		default: [""]
	},
	token: {
		type: "string|string[]",
		description: (categoryName:string, endpointName:string) => <span>Token received from <a href="/auth/gettoken/">auth.getToken</a>.</span>,
		default: [""]
	},
	userinput: {
		type: "userInput",
		description: (categoryName:string, endpointName:string) => <span>Username or session key of a user to {Util.endpointToHuman(endpointName)}. Because of a <a href="https://support.last.fm/t/tags-bio-similar-artists-missing-from-artist-getinfo-response-for-artists-with-redirects/46740/3?u=mexdeep" target="_blank">current bug</a> you must always provide a username for these currently. You can optionally add sk in optional arguments to turn request into a post request.</span>,
		default: ["Mexdeep"]
	},
	username: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Username of a user to ${Util.endpointToHuman(endpointName)}.`,
		default: ["Mexdeep"]
	}
}

interface InteractiveParameterFieldProps {
	parameter: Parameter;
}

export function InteractiveParameterField(props:InteractiveParameterFieldProps) {
	const {parameter} = props;
	
	switch (docs[parameter].type) {

		case "string":
			return <label htmlFor={parameter}>{parameter}: <input type="text" id={parameter} defaultValue={Util.randomIn(docs[parameter].default)} /></label>;
		
		case "userInput":
			return <label htmlFor="username">username: <input type="text" id="username" defaultValue={Util.randomIn(docs[parameter].default)} /></label>;
	
		case "number":
			return <label htmlFor={parameter}>{parameter}: <input type="number" id={parameter} defaultValue={Util.randomIn(docs[parameter].default)} /></label>;
		
		case "boolean":
			return <label htmlFor={parameter}>{parameter}: <input type="checkbox" id={parameter} defaultChecked={docs[parameter].default[0] as boolean} /></label>;
		
		case "albumInput": {
			const [artistName, albumName] = Util.randomIn(docs.albuminput.default);
			const artist = <label htmlFor="artist">album: <input type="text" id="artist" defaultValue={artistName} /></label>;
			const album = <label htmlFor="album">album: <input type="text" id="album" defaultValue={albumName} /></label>;
			const mbid = <label htmlFor="mbid">mbid: <input type="text" id="mbid" /></label>;
			return (
				<div className="exclusive-parameters">
					<div className="parameter-group">
						{artist}
						{album}
					</div>
					<div className="parameter-group">
						{mbid}
					</div>
				</div>
			);
		}
			
		case "artistInput": {
			const [artistName] = Util.randomIn(docs.artistinput.default);
			const artist = <label htmlFor="artist">artist: <input type="text" id="artist" defaultValue={artistName} /></label>;
			const mbid = <label htmlFor="mbid">mbid: <input type="text" id="mbid" /></label>;
			return (
				<div className="exclusive-parameters">
					<div className="parameter-group">
						{artist}
					</div>
					<div className="parameter-group">
						{mbid}
					</div>
				</div>
			);
		}
	}
}