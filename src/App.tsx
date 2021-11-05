/**/

import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation
} from "react-router-dom";
import DocumentationIndex from "./components/documentation/DocumentationIndex";
import Logging from "./components/documentation/Logging";
import DisplayDocumentation from "./components/documentation/Documentation";
import Sidebar from "./components/sidebar/Sidebar";
import Icons from "./components/icons/Icons";

export default function App() {
	return (
		<div id="documentation-page">
			<Router basename={'/lastfm-typed'}>
				<Sidebar />
				<Switch>
					<Route exact path="/">
						<DocumentationIndex />
					</Route>
					<Route exact path="/logging/">
						<Logging />
					</Route>
					<Route path="*">
						<DocumentationApp />
					</Route>
				</Switch>
				<Icons />
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