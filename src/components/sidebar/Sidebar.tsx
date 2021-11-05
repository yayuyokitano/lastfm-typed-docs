import React from "react";
import { Link } from "react-router-dom";
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
	return (
		<div>
			<Link className="endpoint-link" to="/"><h1 className="sidebar-header">lastfm-typed</h1></Link>
			<PrimaryLink target="/" text="Getting Started" />
			<PrimaryLink target="/logging/" text="Logging" />
		</div>
	);
}

interface PrimaryLinkProps {
	target:string;
	text:string;
}

function PrimaryLink(props:PrimaryLinkProps) {

	const {target, text} = props;

	return (
		<div className="category">
			<hr />
			<Link className="primary-link" to={target}>{text}</Link>
		</div>
	);
}

interface SidebarEndpointProps {
	endpointName:string;
	categoryName:string;
}

function SidebarEndpoint(props:SidebarEndpointProps) {
	const {categoryName, endpointName} = props;

	return <li key={endpointName}><Link className="endpoint-link" to={`/${categoryName}/${endpointName}/`}>.{endpointName}</Link></li>
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
	);
}