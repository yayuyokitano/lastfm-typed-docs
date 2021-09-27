import React from "react";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';
SyntaxHighlighter.registerLanguage('javascript', js);

interface CategoryEndpointNames {
	categoryName:string;
	endpointName:string;
}

const endpoints:{
	[key:string]: {
		[key:string]: JSX.Element;
	}
 } = {
	helper: {
		cacheScrobbles: (<div>
			<p className="note">If you are rate limited while helper.cacheScrobbles is running, lastfm-typed should not warn you, and should instead wait for a few minutes for the rate limit to be over, and then try again, until it finally works. For this reason, it is possible for helper.cacheScrobbles to take a long time to complete.</p>
			<h3>Example</h3>
			<SyntaxHighlighter language="javascript" style={vs}>{`let scrobbleCacher = await lastfm.helper.cacheScrobbles("Mexdeep");
\n
\nscrobbleCacher.on("start", (data) => {
\n\tconsole.log(\`Found \${data.count} scrobbles, starting (0/\${data.totalPages}).\`);
\n});
\n
\nscrobbleCacher.on("data", (data) => {
\n\tdatabase.addScrobblesBulk(data.data);
\n\tconsole.log(\`\${data.completedPages}/\${data.totalPages} (\${(data.progress * 100).toFixed(2)}%)\`);
\n});
\n
\nscrobbleCacher.on("close", () => {
\n\tconsole.log("Caching completed.");
\n});`}</SyntaxHighlighter><br />
			<SyntaxHighlighter language="javascript" style={vs}>{`Found 19017 scrobbles, starting (0/20).
\n1/20 (5.00%)
\n2/20 (10.00%)
\n3/20 (15.00%)
\n4/20 (20.00%)
\n5/20 (25.00%)
\n6/20 (30.00%)
\n7/20 (35.00%)
\n8/20 (40.00%)
\n9/20 (45.00%)
\n10/20 (50.00%)
\n11/20 (55.00%)
\n12/20 (60.00%)
\n13/20 (65.00%)
\n14/20 (70.00%)
\n15/20 (75.00%)
\n16/20 (80.00%)
\n17/20 (85.00%)
\n18/20 (90.00%)
\n19/20 (95.00%)
\n20/20 (100.00%)
\nCaching completed.`}</SyntaxHighlighter>
		</div>)
	}
};

export default function(props:CategoryEndpointNames) {

	const {categoryName, endpointName} = props;
	return endpoints[categoryName][endpointName];
	
}