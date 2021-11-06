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
			<CodeBlock content={`Found 33423 scrobbles, starting (0/34).
1/34 (2.94%)
2/34 (5.88%)
3/34 (8.82%)
4/34 (11.76%)
5/34 (14.71%)
6/34 (17.65%)
7/34 (20.59%)
8/34 (23.53%)
9/34 (26.47%)
10/34 (29.41%)
11/34 (32.35%)
12/34 (35.29%)
13/34 (38.24%)
14/34 (41.18%)
15/34 (44.12%)
16/34 (47.06%)
17/34 (50.00%)
18/34 (52.94%)
19/34 (55.88%)
20/34 (58.82%)
21/34 (61.76%)
22/34 (64.71%)
23/34 (67.65%)
24/34 (70.59%)
25/34 (73.53%)
26/34 (76.47%)
27/34 (79.41%)
28/34 (82.35%)
29/34 (85.29%)
30/34 (88.24%)
31/34 (91.18%)
32/34 (94.12%)
33/34 (97.06%)
34/34 (100.00%)
Caching completed.`}></CodeBlock>
		</div>)
	}
};

export default function(props:CategoryEndpointNames) {

	const {categoryName, endpointName} = props;
	return endpoints[categoryName][endpointName];
	
}