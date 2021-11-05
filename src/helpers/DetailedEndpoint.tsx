import React from "react";
import CodeBlock from "./CodeBlock";

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
			<CodeBlock content={`let scrobbleCacher = await lastfm.helper.cacheScrobbles("Mexdeep");

scrobbleCacher.on("start", (data) => {
\tconsole.log(\`Found \${data.count} scrobbles, starting (0/\${data.totalPages}).\`);
});

scrobbleCacher.on("data", (data) => {
\tdatabase.addScrobblesBulk(data.data);
\tconsole.log(\`\${data.completedPages}/\${data.totalPages} (\${(data.progress * 100).toFixed(2)}%)\`);
});

scrobbleCacher.on("close", () => {
\tconsole.log("Caching completed.");
});`}></CodeBlock><br />
			<CodeBlock content={`Found 19017 scrobbles, starting (0/20).
1/20 (5.00%)
2/20 (10.00%)
3/20 (15.00%)
4/20 (20.00%)
5/20 (25.00%)
6/20 (30.00%)
7/20 (35.00%)
8/20 (40.00%)
9/20 (45.00%)
10/20 (50.00%)
11/20 (55.00%)
12/20 (60.00%)
13/20 (65.00%)
14/20 (70.00%)
15/20 (75.00%)
16/20 (80.00%)
17/20 (85.00%)
18/20 (90.00%)
19/20 (95.00%)
20/20 (100.00%)
Caching completed.`}></CodeBlock>
		</div>)
	}
};

export default function(props:CategoryEndpointNames) {

	const {categoryName, endpointName} = props;
	return endpoints[categoryName][endpointName];
	
}