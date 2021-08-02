import React from "react";
import endpoints from "../../helpers/endpoints.json";
export default function Sidebar() {
	return (
		<nav>
			<SidebarHeader />
			{Object.entries(endpoints).map((category) => <SidebarGroup key={category[0]} categoryName={category[0]} endpoints={Object.keys(category[1])} />)}
		</nav>
	);
}
import "./Sidebar.scss";

function SidebarHeader() {
	return <h1 className="sidebar-header">yayuyokitano</h1>;
}

interface SidebarEndpointProps {
	endpointName:string;
	categoryName:string;
}

function SidebarEndpoint(props:SidebarEndpointProps) {
	const {categoryName, endpointName} = props;

	return <li key={endpointName}><a className="endpoint-link" href={`/${categoryName}/${endpointName}/`}>.{endpointName}</a></li>
}

interface SidebarGroupProps {
	endpoints:string[];
	categoryName:string;
}

function SidebarGroup(props:SidebarGroupProps) {
	const {categoryName, endpoints} = props;

	return (
		<div className="category">
			<hr />
			<details>
				<summary>{categoryName}</summary>
				<ul className="category-endpoints">
					{endpoints.map((endpointName) => <SidebarEndpoint key={endpointName} categoryName={categoryName} endpointName={endpointName} />)}
				</ul>
			</details>
		</div>
	)
}