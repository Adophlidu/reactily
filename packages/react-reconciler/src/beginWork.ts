import { FiberNode } from './fiber';

// 递归中的递阶段 比较React Element和已有的fiberNode 返回子fiber继续处理
export const beginWork = (fiber: FiberNode): FiberNode | null => {
	return fiber;
};
