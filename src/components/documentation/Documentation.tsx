import React from "react";
import {
	useParams
} from "react-router-dom";
import "./Documentation.scss";
import GeneratedDocumentation from "../../helpers/DocumentationGenerator";

interface EndpointParams {
	category:string;
	endpoint:string;
}

export default function DisplayDocumentation() {

	const {category, endpoint} = useParams<EndpointParams>();
	return <GeneratedDocumentation category={category} endpoint={endpoint} />;

}