import React from "react";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';
import vs2015 from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015';
import { isDarkTheme } from "./Util";
SyntaxHighlighter.registerLanguage('javascript', js);

interface CodeBlockProps {
	content: string;
}

export default function CodeBlock(props:CodeBlockProps) {
	const {content} = props;
	return <SyntaxHighlighter language="javascript" style={isDarkTheme() ? vs2015 : vs}>{content}</SyntaxHighlighter>
}