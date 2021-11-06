import React from "react";
import { isDarkTheme } from "../../helpers/Util";
import "./Icons.scss";
import GitHubLight from "./Github-Light.png";
import GitHubDark from "./Github-Dark.png";

export default function Icons() {

	return (
		<div className="icon-group">
			<a href="https://github.com/yayuyokitano/lastfm-typed" target="_blank" rel="noopener">
				<img src={isDarkTheme() ? GitHubLight : GitHubDark} alt="Go to GitHub lastfm-typed" width="64" height="64" />
			</a>
		</div>
	);

}