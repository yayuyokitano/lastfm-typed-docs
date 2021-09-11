/**/

import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation
} from "react-router-dom";
import DocumentationIndex from "./components/documentation/DocumentationIndex";
import DisplayDocumentation from "./components/documentation/Documentation";
import Sidebar from "./components/sidebar/Sidebar";

export default function App() {
	return (
		<div id="documentation-page">
			<Router basename={'/lastfm-typed'}>
				<Sidebar />
				<Switch>
					<Route exact path="/">
						<DocumentationIndex />
					</Route>
					<Route path="*">
						<DocumentationApp />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

function DocumentationApp() {
	let location = useLocation();
	return(
		<Switch location={location}>
			<Route path="/:category/:endpoint" children={<DisplayDocumentation />} />
		</Switch>
	)
}