import React from "react";
import endpoints from "./endpoints.json";
import JSONFormatter from "json-formatter-js";
import LastFM from "lastfm-typed";
import { InteractiveParameterField, docs } from "./InteractiveParameterField";

interface DocumentationProps {
	category:string;
	endpoint:string;
}

export default function GeneratedDocumentation(props:DocumentationProps) {
	const {category, endpoint} = props;

	const endpointDetails = getEndpointDetails(category, endpoint);
	const [categoryName, endpointName] = endpointDetails.endpointName.split(".");
	document.title = `${endpointDetails.endpointName} | lastfm-typed documentation`;
	return(
		<main>
			<h1>{endpointDetails.endpointName}</h1>
			<h3>{endpointDetails.description}</h3>
			<IsPostOnlyWarning isPostOnly={endpointDetails.isPostOnly} />
			<Usages endpointName={endpointDetails.endpointName} parameters={endpointDetails.parameters} />
			<ParameterTable endpointName={endpointDetails.endpointName} parameters={endpointDetails.parameters} />
			<Playground parameters={endpointDetails.parameters} isPostOnly={endpointDetails.isPostOnly} categoryName={categoryName} endpointName={endpointName} />
		</main>
	);

}

interface IsPostOnlyProps {
	isPostOnly:boolean;
}

function IsPostOnlyWarning(props:IsPostOnlyProps) {
	if (!props.isPostOnly) {
		return null;
	}
	return <p id="isPostOnly">Note: This parameter is only available for post requests. This requires you to use a secret key. Additionally, the dynamic testing does not allow testing post requests for the aforementioned reason. Apologies for the inconvenience.</p>;
}

type RequiredParam = "albuminput"|"artistinput";
type OptionalParam = "autocorrect"|"username"|"sk"|"lang";

interface ParameterValues {
	[key:string]:any;
}

export type Parameter = RequiredParam|OptionalParam;

interface Parameters {
	required:RequiredParam[];
	optional:OptionalParam[];
}

interface EndpointDetails {
	endpointName:string;
	description:string;
	parameters:Parameters;
	isPostOnly:boolean;
}

const formatRequiredParams = (requiredParameters:string[]) => `${requiredParameters.join(", ")}${requiredParameters.length > 0 ? ", " : ""}`;
const formatOptionalParams = (optionalParameters:string[]) => `${optionalParameters.length > 0 ? "{ " : ""}${optionalParameters.join(", ")}${optionalParameters.length > 0 ? " }": ""}`;

const getEndpointDetails = (category:string, endpoint:string) => ((endpoints as any)?.[category] as any)?.[endpoint] as EndpointDetails;

interface UsageProps {
	endpointName:string;
	parameters:Parameters;
}

function Usages(props:UsageProps) {

	const {endpointName, parameters} = props;

	return (
		<div id="usage-container">
			<h2>Usage:</h2>
			<div id="usage">lastfm.{endpointName}( {formatRequiredParams(parameters.required)}{formatOptionalParams(parameters.optional)} )</div>
		</div>
	);

}

interface ParameterRowProps {
	endpointName:string;
	parameter:Parameter;
	required:boolean;
}

function ParameterRow(props:ParameterRowProps) {

	const {endpointName, parameter, required} = props;
	
	let {type, description} = docs[parameter];
	const [category, endpoint] = endpointName.split(".");
	description = typeof description === "string" ? description : description(category, endpoint);
	return (
		<tr key={parameter}>
			<td key="parameter">{parameter}</td>
			<td key="type">{type}</td>
			<td key="required">{required ? "✔️" : "❌"}</td>
			<td key="description">{description}</td>
		</tr>
	);
}

function ParameterTable(props:UsageProps) {

	const {endpointName, parameters} = props;

	return (
		<div id="parameter-container">
			<h2>Parameters:</h2>
			<table>
				<thead>
					<tr>
						<th>Parameter</th>
						<th>Type</th>
						<th>Required?</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{parameters.required.map(parameter => <ParameterRow key={parameter} endpointName={endpointName} parameter={parameter} required={true} />)}
					{parameters.optional.map(parameter => <ParameterRow key={parameter} endpointName={endpointName} parameter={parameter} required={false} />)}
				</tbody>
			</table>
		</div>
	);
}

interface InteractiveParameterFieldsProps {
	label:string;
	parameters:RequiredParam[]|OptionalParam[];
	divId:string;
}

function InteractiveParameterFields(props:InteractiveParameterFieldsProps) {
	const {parameters, label, divId} = props;

	return (
		<div id={divId}>
			<h4>{label}</h4>
			{parameters.map(parameter => <InteractiveParameterField key={parameter} parameter={parameter}/>)}
		</div>
	)

}

interface InteractiveParametersProps {
	parameters:Parameters;
}

function InteractiveParameters(props:InteractiveParametersProps) {
	const {parameters} = props;

	return (
		<div id="interactive-parameters">
			<InteractiveParameterFields divId="required-parameters" label="Required" parameters={parameters.required} />
			<InteractiveParameterFields divId="optional-parameters" label="Optional" parameters={parameters.optional} />
		</div>
	);
}

interface PlaygroundProps {
	parameters:Parameters;
	isPostOnly:boolean;
	categoryName:string;
	endpointName:string;
}

function submitRequest(categoryName:string, endpointName:string){
	return async() => {
		let args:ParameterValues = {};

		console.log(document.querySelectorAll("#interactive-parameters input"));

		for (let parameter of document.querySelectorAll("#interactive-parameters input") as NodeListOf<HTMLInputElement>) {
			console.log(parameter);
			switch (parameter.type) {

				case "text":
				case "number":
					if (parameter.value) {
						args[parameter.id] = parameter.value;
					}
					break;
				
				case "checkbox":
					args[parameter.id] = parameter.checked;
					break;

			}

		}

		const lastfm = new LastFM("befc94acb89d04c5d7164039769e93ef", { userAgent: "lastfm-typed documentation (yayuyokita.no/lastfm-typed)" });
		lastfm.on("requestStart", (args, method) => console.log(method, args))
		console.log(args);
		const formatter = new JSONFormatter(await ((lastfm as any)[categoryName] as any)[endpointName](args));

		document.getElementById("result").innerHTML = "";
		document.getElementById("result").appendChild(formatter.render());
	}
}

function Playground(props:PlaygroundProps) {
	const {parameters, isPostOnly, categoryName, endpointName} = props;

	if (isPostOnly) {
		return null;
	}

	return (
		<div id="playground">
			<h2>Interactive Playground</h2>
			<InteractiveParameters parameters={parameters} /><br />
			<button type="button" id="submit" onClick={submitRequest(categoryName, endpointName)}>Submit</button><br />
			<div id="result">Results will show up here!</div>
		</div>
	)
}