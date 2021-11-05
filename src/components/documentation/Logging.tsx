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
		<CodeBlock content={`REQUEST START:  GET { method: 'user.getRecentTracks', user: 'mexdeep', limit: 1 }
REQUEST COMPLETE:  { method: 'user.getRecentTracks', user: 'mexdeep', limit: 1 } Executed in 563ms {
	recenttracks: {
		'@attr': {
			page: '1',
			total: '22243',
			user: 'Mexdeep',
			perPage: '1',
			totalPages: '22243'
		},
		track: [ [Object], [Object] ]
	}
}
REQUEST START:  GET { method: 'artist.getInfo', artist: '聴色', username: 'mexdeep' }
REQUEST START:  GET {
	method: 'album.getInfo',
	artist: '聴色',
	album: 'さよならを交わすとき',
	username: 'mexdeep'
}
REQUEST START:  GET {
	method: 'track.getInfo',
	artist: '聴色',
	track: '会者定離',
	username: 'mexdeep'
}
REQUEST COMPLETE:  {
	method: 'track.getInfo',
	artist: '聴色',
	track: '会者定離',
	username: 'mexdeep'
} Executed in 393ms {
	track: {
		name: '会者定離',
		url: 'https://www.last.fm/music/%E8%81%B4%E8%89%B2/_/%E4%BC%9A%E8%80%85%E5%AE%9A%E9%9B%A2',
		duration: '242000',
		streamable: { '#text': '0', fulltrack: '0' },
		listeners: '2',
		playcount: '7',
		artist: { name: '聴色', url: 'https://www.last.fm/music/%E8%81%B4%E8%89%B2' },
		album: {
			artist: 'Various Artists',
			title: 'スクールズアウト2018 コンピレーション',
			url: 'https://www.last.fm/music/Various+Artists/%E3%82%B9%E3%82%AF%E3%83%BC%E3%83%AB%E3%82%BA%E3%82%A2%E3%82%A6%E3%83%882018+%E3%82%B3%E3%83%B3%E3%83%94%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3',
			image: [Array]
		},
		userplaycount: '13',
		userloved: '1',
		toptags: { tag: [] }
	}
}
REQUEST COMPLETE:  { method: 'artist.getInfo', artist: '聴色', username: 'mexdeep' } Executed in 400ms {
	artist: {
		name: '聴色',
		url: 'https://www.last.fm/music/%E8%81%B4%E8%89%B2',
		image: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
		streamable: '0',
		ontour: '0',
		stats: { listeners: '5', playcount: '345', userplaycount: '335' },
		similar: { artist: [] },
		tags: { tag: [] },
		bio: {
			links: [Object],
			published: '01 Jan 1970, 00:00',
			summary: ' <a href="https://www.last.fm/music/%E8%81%B4%E8%89%B2">Read more on Last.fm</a>',
			content: ''
		}
	}
}
REQUEST COMPLETE:  {
	method: 'album.getInfo',
	artist: '聴色',
	album: 'さよならを交わすとき',
	username: 'mexdeep'
} Executed in 477ms {
	album: {
		name: 'さよならを交わすとき',
		artist: '聴色',
		url: 'https://www.last.fm/music/%E8%81%B4%E8%89%B2/%E3%81%95%E3%82%88%E3%81%AA%E3%82%89%E3%82%92%E4%BA%A4%E3%82%8F%E3%81%99%E3%81%A8%E3%81%8D',
		image: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
		listeners: '3',
		playcount: '50',
		userplaycount: '335',
		tracks: { track: [] },
		tags: { tag: [] }
	}
}
`} />
		</main>
	)
}