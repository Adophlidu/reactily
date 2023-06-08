import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';

// 正在处理中的fiber
let workInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// 需要找到FiberRootNode，从这里开始调度更新
	const root = markUpdateFromFiberToRoot(fiber) as FiberRootNode;
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode): FiberRootNode | null {
	let node = fiber;
	let parent = fiber.return;

	while (parent !== null) {
		node = parent;
		parent = node.return;
	}

	if (node && node.tag === HostRoot) {
		// 找到了挂载点的fiber，因为挂载点的fiber没有return
		return node.stateNode;
	}
	return null;
}

function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFreshStack(root);

	do {
		try {
			workLoop();
		} catch (e) {
			console.error('renderRoot: ', e);
			workInProgress = null;
		}
	} while (true);
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	const child = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	if (child !== null) {
		// 如果有子节点，则继续递过程处理子节点
		workInProgress = child;
	} else {
		// 到当前线路最深处了，执行归过程
		completeUnitOfWork(fiber);
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		// 连续归
		completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			// 碰到兄弟节点则继续对兄弟节点执行递过程
			workInProgress = sibling;
			return;
		}
		// 没有兄弟节点了，则持续归过程
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
