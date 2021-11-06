import React from "react";
import DetailedEndpoint from "./DetailedEndpoint";
import endpoints from "./endpoints.json";
import { InteractiveParameterField, docs } from "./InteractiveParameterField";

//lastfm-typed and json-formatter-js are also imported later in the file, but is imported upon use to take advantage of code splitting.

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
			<h1 id="endpoint-name">{endpointDetails.endpointName}</h1>
			<p id="description">{endpointDetails.description}</p>
			<IsPostOnlyWarning isPostOnly={endpointDetails.isPostOnly} />
			<Usages endpointName={endpointDetails.endpointName} parameters={endpointDetails.parameters} />
			<ParameterTable endpointName={endpointDetails.endpointName} parameters={endpointDetails.parameters} />
			<Playground parameters={endpointDetails.parameters} isDetailedEndpoint={endpointDetails.isDetailedEndpoint} isPostOnly={endpointDetails.isPostOnly} categoryName={categoryName} endpointName={endpointName} />
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
	return <p className="note" id="isPostOnly">Note: This parameter is only available for post requests. This requires you to use a secret key. Additionally, the dynamic testing does not allow testing post requests for the aforementioned reason. Apologies for the inconvenience.</p>;
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
	isDetailedEndpoint:boolean;
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
			<br />
			<br />
			<div id="usage">lastfm.{endpointName}( {formatOptionalParams([...parameters.required, ...parameters.optional])} )</div>
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

	if (parameters.required.length === 0 && parameters.optional.length === 0) {
		return (
			<div id="parameter-container">
				<h2>Parameters:</h2>
				<p>This method has no parameters.</p>
			</div>
		);
	}

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
	mutualFieldNum:number;
}

function InteractiveParameterFields(props:InteractiveParameterFieldsProps) {
	const {parameters, label, divId, mutualFieldNum} = props;

	if (parameters.length == 0) {
		return null;
	}

	return (
		<div id={divId}>
			<h3 className="parameter-label">{label}</h3>
			{parameters.map(parameter => <InteractiveParameterField key={parameter} parameter={parameter} mutualFieldNum={mutualFieldNum}/>)}
		</div>
	)

}

interface InteractiveParametersProps {
	parameters:Parameters;
}

function InteractiveParameters(props:InteractiveParametersProps) {
	const {parameters} = props;
	const mutualFieldNum = Math.floor(Math.random() * docs.artist.default.length);

	return (
		<div id="interactive-parameters">
			<InteractiveParameterFields divId="required-parameters" label="Required" parameters={parameters.required} mutualFieldNum={mutualFieldNum} />
			<InteractiveParameterFields divId="optional-parameters" label="Optional" parameters={parameters.optional} mutualFieldNum={mutualFieldNum} />
		</div>
	);
}

interface PlaygroundProps {
	parameters:Parameters;
	isPostOnly:boolean;
	categoryName:string;
	endpointName:string;
	isDetailedEndpoint:boolean;
}

function submitRequest(categoryName:string, endpointName:string){
	return async() => {
		let args:ParameterValues = {};

		console.log(document.querySelectorAll(".interactive-input"));
		const detailContainer = document.querySelector(".detail-container");
		if (detailContainer) {
			args.detailTypes = [];
			for (let detail of detailContainer.querySelectorAll("input")) {
				if (detail.checked) {
					args.detailTypes.push(detail.value);
				}
			}
		}

		for (let parameter of document.querySelectorAll(".interactive-input") as NodeListOf<HTMLInputElement>) {
			console.log(parameter.tagName);
			if (parameter.tagName === "SELECT") {
				args[parameter.id] = parameter.value;
				continue;
			}

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

		const LastFM = await import("lastfm-typed");

		const lastfm = new LastFM.default("befc94acb89d04c5d7164039769e93ef", { userAgent: "lastfm-typed documentation (yayuyokita.no/lastfm-typed)" });
		lastfm.on("requestStart", (args, method) => console.log(method, args));
		lastfm.on("requestComplete", (args, time, response) => console.log(args, time, response));

		const JSONFormatter = await import("json-formatter-js");

		const formatter = new JSONFormatter.default(await ((lastfm as any)[categoryName] as any)[endpointName](args));
		document.getElementById("result").innerHTML = "";
		document.getElementById("result").appendChild(formatter.render());
		
	}
}

function Playground(props:PlaygroundProps) {
	const {parameters, isPostOnly, isDetailedEndpoint, categoryName, endpointName} = props;

	if (isPostOnly) {
		return null;
	}

	if (isDetailedEndpoint) {
		return <DetailedEndpoint categoryName={categoryName} endpointName={endpointName} />
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