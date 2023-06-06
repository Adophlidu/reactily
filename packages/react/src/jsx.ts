import { REACT_ELEMENT_TYPE, AUTHOR_MARK } from 'shared/ReactSymbols';
import {
	ElementType,
	Key,
	Ref,
	Props,
	ReactElementType
} from 'shared/ReactTypes';

const ReactElement = (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType => {
	const element: ReactElementType = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: AUTHOR_MARK
	};
	return element;
};

export const jsx = (type: ElementType, config: Props, ...children: any[]) => {
	let ref: Ref = null;
	let key: Key = null;
	const props: Props = {};

	for (const confKey in config) {
		const value = config[confKey];
		if (confKey === 'ref') {
			if (value !== undefined) {
				ref = value;
			}
			continue;
		}
		if (confKey === 'key') {
			if (value !== undefined) {
				key = `${value}`;
			}
			continue;
		}
		if (Object.hasOwn(config, confKey)) {
			props[confKey] = value;
		}
	}

	const childrenLen = children.length;
	if (childrenLen) {
		if (childrenLen === 1) {
			props.children = children[0];
		} else {
			props.children = children;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;
