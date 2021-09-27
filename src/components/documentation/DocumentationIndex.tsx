import React from "react"

export default function DocumentationIndex() {
	return (
		<main>
			<h1>lastfm-typed</h1>
			<h2>Introduction</h2>
			<p>lastfm-typed is a fully typed library for interaction with the <a href="https://www.last.fm/api" target="_blank">Last.FM API</a>. Uses promises.</p>
			<p className="note">Version 2.0.0 of lastfm-typed brings with it many breaking changes, mainly related to the typing of responses. Typescript should tell you where you need to make changes if you choose to upgrade.<br />It is highly recommended that you update, as this comes in response to changes to last.fm's API causing issues with the previous versions.</p>
		</main>
	)
}