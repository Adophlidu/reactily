const supportSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xef61a;

export const AUTHOR_MARK = supportSymbol ? Symbol.for('react.author') : 0xef61b;
