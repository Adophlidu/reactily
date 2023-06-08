export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0; // 函数组件
export const HostRoot = 3; // root根节点 ReactDOM.render产生的 挂载点对应fiber
export const HostComponent = 5; // dom节点
export const HostText = 6; // 文本节点
