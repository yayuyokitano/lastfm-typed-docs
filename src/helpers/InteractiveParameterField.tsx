import { Parameter } from "./DocumentationGenerator";
import React from "react";
import * as Util from "./Util";

export const docs = {
	artist: {
		type: "string",
		description: (categoryName:string, endpointName:string) =>
			endpointName === "search" ?
			"Query to use for searching artist." :
			categoryName === "album" || categoryName === "track" ?
			`Name of the artist of the ${categoryName} to ${Util.endpointToHuman(endpointName)}.` :
			`Name of the artist to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["KITANO REM"],
      ["ヤユヨ"],
      ["カネヨリマサル"],
      ["鈴"],
      ["オルターリードコード"],
      ["Lily Sketch"],
      ["Akai Ko-en"],
      ["Shiina Ringo"]
		]
	},
	artistinput: {
		type: "artistInput",
		description: (categoryName:string, endpointName:string) => `An object containing either an artist property, or an mbid property, detailing the ${categoryName} to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["KITANO REM"],
			["ヤユヨ"],
			["前田和花"],
			["Jack in The b∅x"],
			["アカネサス"],
			["LOT SPiRiTS"],
			["ミズニ ウキクサ"],
			["Hump Back"]
		]
	},
	album: {
		type: "string",
		description: (categoryName:string, endpointName:string) =>
			endpointName === "search" ?
			"Query to use for searching album." :
			`Name of the album to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["ジャンキーの革命"],
			["ヤユヨ"],
			["心は洗濯機のなか"],
			["ベランダのその先へ"],
			["gloomy box"],
			["Lily Sketch"],
			["THE PARK"],
			["加爾基 精液 栗ノ花"]
		]
	},
	albumartist: {
		type: "string",
		description: "Album artist. Only needed if album artist differs from track artist.",
		default: [""]
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
	detailtypes: {
		type: `("artist"|"album"|"track")[]`,
		description: (categoryName:string, endpointName:string) => `Types of details to ${Util.endpointToHuman(endpointName).split(" ")[0]}.`,
		default: ["artist"]
	},
	duration: {
		type: "number",
		description: "Duration of the track in seconds.",
		default: [240]
	},
	extended: {
		type: "boolean",
		description: "Whether to include additional data like whether a user has loved each track.",
		default: [false]
	},
	from: {
		type: "number",
		description: (categoryName:string, endpointName:string) => `Timestamp to ${Util.endpointToHuman(endpointName).split(" ").slice(0, -1).join(" ")} from.`,
		default: [1626289789]
	},
	lang: {
		type: "string",
		description: "Language to return wiki info in. ISO 639 alpha-2 code",
		default: [""]
	},
	limit: {
		type: "number",
		description: (categoryName:string, endpointName:string) => `Max number of ${categoryName}s to ${Util.endpointToHuman(endpointName)}.`,
		default: [50]
	},
	location: {
		type: "string",
		description: "Name of metro area to return data for. Not sure if this actually works, but it is in the official docs so I implemented it.",
		default: [""]
	},
	mbid: {
		type: "string",
		description: "MBID of track.",
		default: [""]
	},
	page: {
		type: "number",
		description: (categoryName:string, endpointName:string) => `Which page to ${Util.endpointToHuman(endpointName)}. Page size equals the value of the limit parameter.`,
		default: [1]
	},
	parallelCaches: {
		type: "number",
		description: `Number of parallel requests to make. Higher number will be faster, but you may run into rate limits (default 1).`,
		default: [0]
	},
	password: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Password of a user to ${Util.endpointToHuman(endpointName)}.`,
		default: ["no lol"]
	},
	period: {
		type: `"overall"|"7day"|"1month"|"3month"|"6month"|"12month"`,
		description: (categoryName:string, endpointName:string) => `Period to ${Util.endpointToHuman(endpointName).split(" ")[0]}.`,
		default: ["overall"]
	},
	previouslyCached: {
		type: "number",
		description: `Number of scrobbles already cached (default 0).`,
		default: [0]
	},
	recenttracks: {
		type: "boolean",
		description: "Whether to include info about friends' recent tracks in response.",
		default: [true]
	},
	sk: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Session key of a user to ${Util.endpointToHuman(endpointName)}.`,
		default: [""]
	},
	tag: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Name of the tag to ${Util.endpointToHuman(endpointName).split(" ")[0]}.`,
		default: ["rock", "alternative", "japanese", "indie", "singer-songwriter"]
	},
	taggingtype: {
		type: `"artist"|"album"|"track"`,
		description: (categoryName:string, endpointName:string) => `Type of item to ${Util.endpointToHuman(endpointName).split(" ")[0]}.`,
		default: ["artist"]
	},
	tags: {
		type: "string|string[]",
		description: (categoryName:string, endpointName:string) => `Name of the tag(s) to ${Util.endpointToHuman(endpointName).split(" ")[0]}.`,
		default: [""]
	},
	to: {
		type: "number",
		description: (categoryName:string, endpointName:string) => `Timestamp to ${Util.endpointToHuman(endpointName).split(" ").slice(0, -1).join(" ")} until.`,
		default: [1628968189]
	},
	token: {
		type: "string|string[]",
		description: (categoryName:string, endpointName:string) => <span>Token received from <a href="/auth/gettoken/">auth.getToken</a>.</span>,
		default: [""]
	},
	track: {
		type: "string",
		description: (categoryName:string, endpointName:string) =>
			endpointName === "search" ?
			"Query to use for searching track." :
			`Name of the track to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["ジャンキーの革命"],
			["ヤユヨ"],
			["ガールズユースとディサポイントメント"],
			["とある女子"],
			["gloomy box"],
			["灰青"],
			["絶対零度"],
			["迷彩"]
		]
	},
	trackinput: {
		type: "trackInput",
		description: (categoryName:string, endpointName:string) => `An object containing either an artist and album property, or an mbid property, detailing the ${categoryName} to ${Util.endpointToHuman(endpointName)}.`,
		default: [
			["KITANO REM", "RAINSICK"],
			["ヤユヨ", "メアリーちゃん"],
			["Lily Sketch", "night smoke"],
			["フミンニッキ", "水溶世界媒体少女"],
			["カネヨリマサル", "ガールズユースとディサポイントメント"],
			["聴色", "悋気"],
			["TETORA", "メンタルパンク"],
			["ひかりのなかに", "まっすぐなままでいい"]
		]
	},
	tracknumber: {
		type: "number",
		description: "The number of the track within its album.",
		default: [""]
	},
	user1: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Username of the first user to ${Util.endpointToHuman(endpointName)}.`,
		default: ["Mexdeep"]
	},
	user2: {
		type: "string",
		description: (categoryName:string, endpointName:string) => `Username of the second user to ${Util.endpointToHuman(endpointName)}.`,
		default: ["gowon_"]
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
	mutualFieldNum: number;
}

export function InteractiveParameterField(props:InteractiveParameterFieldProps) {
	const {parameter, mutualFieldNum} = props;
	
	switch (docs[parameter].type) {

		case "string":
			return <label htmlFor={parameter}>{parameter}: <input className="interactive-input" type="text" id={parameter} defaultValue={Util.randomIn(docs[parameter].default, ["artist", "album", "track"].includes(parameter) ? mutualFieldNum : -1)} /></label>;
		
		case "userInput":
			return <label htmlFor="username">username: <input className="interactive-input" type="text" id="username" defaultValue={Util.randomIn(docs[parameter].default)} /></label>;
	
		case "number":
			return <label htmlFor={parameter}>{parameter}: <input className="interactive-input" type="number" id={parameter} defaultValue={Util.randomIn(docs[parameter].default)} /></label>;
		
		case "boolean":
			return <label htmlFor={parameter}>{parameter}: <input className="interactive-input" type="checkbox" id={parameter} defaultChecked={docs[parameter].default[0] as boolean} /></label>;
		
		case "trackInput": {
			const [artistName, trackName] = Util.randomIn(docs.trackinput.default);
			const artist = <label htmlFor="artist">album: <input className="interactive-input" type="text" id="artist" defaultValue={artistName} /></label>;
			const track = <label htmlFor="track">album: <input className="interactive-input" type="text" id="track" defaultValue={trackName} /></label>;
			const mbid = <label htmlFor="mbid">mbid: <input className="interactive-input" type="text" id="mbid" /></label>;
			return (
				<div className="exclusive-parameters">
					<div className="parameter-group">
						{artist}
						{track}
					</div>
					<div className="parameter-group">
						{mbid}
					</div>
				</div>
			);
		}

		case "albumInput": {
			const [artistName, albumName] = Util.randomIn(docs.albuminput.default);
			const artist = <label htmlFor="artist">album: <input className="interactive-input" type="text" id="artist" defaultValue={artistName} /></label>;
			const album = <label htmlFor="album">album: <input className="interactive-input" type="text" id="album" defaultValue={albumName} /></label>;
			const mbid = <label htmlFor="mbid">mbid: <input className="interactive-input" type="text" id="mbid" /></label>;
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
			const artist = <label htmlFor="artist">artist: <input className="interactive-input" type="text" id="artist" defaultValue={artistName} /></label>;
			const mbid = <label htmlFor="mbid">mbid: <input className="interactive-input" type="text" id="mbid" /></label>;
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
		
		case `"artist"|"album"|"track"`: {
			return (
				<label htmlFor={parameter}>
					{parameter}: 
					<select id={parameter} className="interactive-input" defaultValue={Util.randomIn(docs[parameter].default)}>
						<option value="artist">artist</option>
						<option value="album">album</option>
						<option value="track">track</option>
					</select>
				</label>
			);
		}

		case `("artist"|"album"|"track")[]`: {
			return (
				<div className="detail-container">
						<input type="checkbox" id="detail-artist" value="artist" /><label htmlFor="detail-artist" >artist</label>
						<input type="checkbox" id="detail-album" value="album" /><label htmlFor="detail-album" >album</label>
						<input type="checkbox" id="detail-track" value="track" /><label htmlFor="detail-track" >track</label>
				</div>
			);
		}

		case `"overall"|"7day"|"1month"|"3month"|"6month"|"12month"`: {
			return (
				<label htmlFor={parameter}>
					{parameter}: 
					<select id={parameter} className="interactive-input" defaultValue={Util.randomIn(docs[parameter].default)}>
						<option value="overall">overall</option>
						<option value="7day">7day</option>
						<option value="1month">1month</option>
						<option value="3month">3month</option>
						<option value="6month">6month</option>
						<option value="12month">12month</option>
					</select>
				</label>
			);
		}
	}
}