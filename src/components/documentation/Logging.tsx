import React from "react";
import CodeBlock from "../../helpers/CodeBlock";

export default function Logging() {
	return (
		<main>
			<h1>Logging</h1>
			<p>lastfm-typed has logging built in. Currently the logging is built into the main class, not the individual calls. Now, when you initialize the lastfm class you can listen to the requestStart and requestComplete events to get some basic info on each request made by the library.</p>
			<p><b>Note:</b> The response printed is before the processing done by the library. This means the responses will usually not look exactly the same as the proper output, but the same information is still there for debug purposes.</p>
			<h2>Example</h2>
			<CodeBlock content={`const lastfm = new LastFMTyped(apiKey:string, options?:{apiSecret?:string, userAgent?:string, secureConnection?:boolean});

lastfm.on("requestStart", (args, HTTPMethod) => {
	console.log("REQUEST START: ", HTTPMethod, args);
});

lastfm.on("requestComplete", (args, time, res) => {
	console.log("REQUEST COMPLETE: ", args, \`Executed in \${time}ms\`, res);
});

const nowplaying = await lastfm.helper.getNowPlaying("Mexdeep", ["artist", "album", "track"]);`} />
		<CodeBlock content={`REQUEST START:  GET {
	method: 'user.getRecentTracks',
	user: 'Mexdeep',
	limit: 1,
	extended: 0
}
REQUEST COMPLETE:  {
	method: 'user.getRecentTracks',
	user: 'Mexdeep',
	limit: 1,
	extended: 0
} Executed in 574ms {
	recenttracks: {
		track: [ [Object] ],
		'@attr': {
			user: 'Mexdeep',
			totalPages: '33423',
			page: '1',
			perPage: '1',
			total: '33423'
		}
	}
}
REQUEST START:  GET { method: 'artist.getInfo', artist: 'アトゾメ', username: 'Mexdeep' }
REQUEST START:  GET {
	method: 'album.getInfo',
	artist: 'アトゾメ',
	album: 'カルダディール・ダリー',
	username: 'Mexdeep'
}
REQUEST START:  GET {
	method: 'track.getInfo',
	artist: 'アトゾメ',
	track: 'カルダディール・ダリー',
	username: 'Mexdeep'
}
REQUEST COMPLETE:  {
	method: 'album.getInfo',
	artist: 'アトゾメ',
	album: 'カルダディール・ダリー',
	username: 'Mexdeep'
} Executed in 290ms {
	album: {
		artist: 'アトゾメ',
		mbid: '',
		tags: '',
		playcount: '0',
		image: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
		url: 'https://www.last.fm/music/%E3%82%A2%E3%83%88%E3%82%BE%E3%83%A1/%E3%82%AB%E3%83%AB%E3%83%80%E3%83%87%E3%82%A3%E3%83%BC%E3%83%AB%E3%83%BB%E3%83%80%E3%83%AA%E3%83%BC',
		name: 'カルダディール・ダリー',
		listeners: '0',
		userplaycount: 13
	}
}
REQUEST COMPLETE:  { method: 'artist.getInfo', artist: 'アトゾメ', username: 'Mexdeep' } Executed in 663ms {
	artist: {
		name: 'アトゾメ',
		url: 'https://www.last.fm/music/%E3%82%A2%E3%83%88%E3%82%BE%E3%83%A1',
		image: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
		streamable: '0',
		ontour: '0',
		stats: { listeners: '26', playcount: '110', userplaycount: '17' },
		similar: { artist: [Array] },
		tags: { tag: [] },
		bio: {
			links: [Object],
			published: '01 Jan 1970, 00:00',
			summary: ' <a href="https://www.last.fm/music/%E3%82%A2%E3%83%88%E3%82%BE%E3%83%A1">Read more on Last.fm</a>',
			content: ''
		}
	}
}
`} />
		</main>
	)
}