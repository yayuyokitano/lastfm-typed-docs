import React from "react";
import {
	useParams
} from "react-router-dom";
import "./Documentation.scss";
import GeneratedDocumentation from "../../helpers/DocumentationGenerator";
import Sidebar from "../sidebar/Sidebar";

interface EndpointParams {
	category:string;
	endpoint:string;
}

export default function DisplayDocumentation() {

	const {category, endpoint} = useParams<EndpointParams>();
	return (
		<div id="documentation-page">
			<Sidebar />
			<GeneratedDocumentation category={category} endpoint={endpoint} />
		</div>
	);

}