import { StreamLanguage } from '@codemirror/language';

export const gasm = StreamLanguage.define({
	token(stream) {
		if (stream.eatSpace()) return null;

		if (stream.match(/;.*/, true)) return 'lineComment';

		// macro
		if (
			stream.match(
				/#(FOR|IF|END|RAND|EQUAL|LESS|GREATER|AND|NOT|OR|MIN|MAX)/,
				true,
			)
		)
			return 'regexp';

		// variable
		if (stream.match(/#[A-Za-z_][A-Za-z0-9_]*/, true)) return 'regexp';

		// keywords
		if (
			stream.match(
				/(?:NOOP|SET|SWAP|ADD|SUB|MUL|DIV|EQUAL|LESS|GREATER|AND|OR|NOT|LABEL|GOTO|IF|SLEEP|END|RAND|FLOOR|MOD|SIN|COS)\b/,
				true,
			)
		)
			return 'keyword';

		// registers
		if (stream.match(/(R|IN|OUT|INOUT)\d*\b/, true)) return 'variableName';
		// special registers
		if (
			stream.match(
				/(ProgramCounter|Halt|HaltFrame|SleepTimer|DeltaTime)\b/,
				true,
			)
		)
			return 'propertyName';

		// numbers
		if (stream.match(/\d+(?:\.\d+)?\b/, true)) return 'number';

		// labels
		if (stream.match(/[A-Za-z_][A-Za-z0-9_]*/, true)) return 'string';

		stream.next();
		return null;
	},
});
