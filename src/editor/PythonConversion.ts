import { parse } from 'py-ast';

export function compile_python(text: string): string {
	console.log(parse(text));
	return '';
}
