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

export default function App() {
	return (
		<Router basename={'/lastfm-typed'}>
			<Switch>
				<Route exact path="/">
					<DocumentationIndex />
				</Route>
				<Route path="*">
					<DocumentationApp />
				</Route>
			</Switch>
		</Router>
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