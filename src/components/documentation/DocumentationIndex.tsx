import React from "react";
import CodeBlock from "../../helpers/CodeBlock";

export default function DocumentationIndex() {
	document.title = "Getting Started | lastfm-typed documentation"
	return (
		<main>
			<h1>lastfm-typed</h1>
			<h2>Introduction</h2>
			<p>lastfm-typed is a fully typed library for interaction with the <a href="https://www.last.fm/api" target="_blank">Last.FM API</a>. Uses promises.</p>
			<p className="note">Version 2.0.0 of lastfm-typed brings with it many breaking changes, mainly related to the typing of responses. Typescript should tell you where you need to make changes if you choose to upgrade.<br />It is highly recommended that you update, as this comes in response to changes to last.fm's API causing issues with the previous versions.</p>
			<p>To install, run</p>
			<CodeBlock content="npm i lastfm-typed" />
			<CodeBlock content="yarn add lastfm-typed" />
			<p>or whatever format your package manager uses.</p>
			<h2>Usage</h2>
			<p>The library will call the appropriate endpoint (helper functions may call multiple and do additional processing), and format data to more appropriate types and structures than the default api. The structure output by lastfm-typed can be seen and tested in this documentation, and can also be seen from the typings in your IDE. In general, #text, @attr attributes are both renamed everywhere, and some groupings may change. Some deprecated properties may also not be shown.</p>
			<p>In general, required parameters are given as separate parameters, while optional parameters are added to an object as the final parameter. However, you can also run endpoints with only one argument, being an object with both required and any optional parameters specified.</p>
			<h3>Structure</h3>
			<p>The library exports a single class. This class, in turn, creates instances of a series of sub-classes, allowing using endpoints through their exact Last.FM API names. The object keeps track of your api key and api secret, so you don't have to reenter those. To initialize:</p>
			<CodeBlock content={`import LastFMTyped from "lastfm-typed";

const lastfm = new LastFMTyped(apiKey:string, options?:{apiSecret?:string, userAgent?:string, secureConnection?:boolean}); //insert key, secret, user agent, and whether to use https here`} />
			<p><code>api_key</code> is the only required parameter.</p>
			<p>Without <code>api_secret</code>, auth commands will not work. This includes usage of session key in place of username for typically non-auth functions.</p>
			<p>For user agent, please initialize this with an easily identifiable name (preferably one that would lead to your program if googled). You can choose to not set one, in which case lastfm-typed-npm will be set as the user agent. This is probably the best idea if your program is not public. Please note that in browser user agent header cannot be set and whatever is here will be ignored.</p>
			<p><code>secureConnection</code> determines whether to use https or http. By default, this is <code>true</code>, which uses https. Set to <code>false</code> to use http.</p>
			<p>Then we can call methods as needed.</p>
			<h3>Examples</h3>
			<p>A simple authentication example:</p>
			<CodeBlock content={`const token = await lastfm.auth.getToken();

//replace this with whatever method you would use to show the url to the user
sendToUser(\`https://www.last.fm/api/auth?api_key=\${config.lastfm.key}&token=\${token}\`);

//replace this with whatever method you use to determine that the user has accepted integration.
await userInput;
	
const session = await lastfm.auth.getSession(token);`} />
			<p>Getting info about a user:</p>
			<CodeBlock content={`const userInfo = await lastfm.user.getInfo("Mexdeep");`} />
			<h2>Helper Methods</h2>
			<p>lastfm-typed ships with a variety of helper functions. The first group of helper methods are designed to help you with method parameters. These are <code>ArtistFromMBID</code>, <code>AlbumFromMBID</code>, <code>TrackFromMBID</code>, <code>ArtistFromName</code>, <code>AlbumFromName</code>, and <code>TrackFromName</code>. The MBID functions takes a single MBID parameter, <code>ArtistFromName</code> takes a single artist name parameter, while <code>TrackFromName</code> and <code>AlbumFromName</code> take two parameters, the artist name and the name of the track/album. These methods then returns a <code>ArtistInput</code>, <code>AlbumInput</code>, or <code>TrackInput</code> that you can use with the getter functions.</p>
			<CodeBlock content={`const album = await lastfm.album.getInfo(lastfm.helper.AlbumFromName("KITANO REM", "RAINSICK/オレンジ"), {username:"Mexdeep"});`} />
			<p>There are also some helper functions that add some basic functionality. These more complicated helper functions are documented in the sidebar.</p>
		</main>
	)
}