import { acceptCompletion, autocompletion } from '@codemirror/autocomplete';
import { python } from '@codemirror/lang-python';
import { keymap } from '@codemirror/view';

export function pythonCompletion() {
	return [
		python(),
		autocompletion({ activateOnTyping: true }),
		keymap.of([{ key: 'Tab', run: acceptCompletion }]),
	];
}
