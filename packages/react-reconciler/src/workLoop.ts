import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import FiberNode from './fiber';

// 正在处理中的fiber
let workInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
	workInProgress = fiber;
}

function renderRoot(root: FiberNode) {
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
