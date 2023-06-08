import { Key, Props, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	tag: any; // 标识fiberNode的类型
	key: Key;
	pendingProps: Props; // 即将要处理的props
	memoizedProps: Props; // 已处理完的props
	memoizedState: any; // 已处理完成的状态
	type: any; // 原始类型，比如函数组件就是函数本身
	ref: Ref | null;
	stateNode: any; // dom 及 实例
	alternate: FiberNode | null; // 双缓存树的指向
	return: FiberNode | null; // 处理之后返回的节点
	child: FiberNode | null; // 第一个左孩子节点
	sibling: FiberNode | null; // 兄弟节点
	index: number; // 同层级兄弟元素的索引
	flags: Flags; // fiber的副作用
	updateQueue: unknown; // 更新链
	constructor(tag: WorkTag, key: Key, pendingProps: Props) {
		// 实例
		this.tag = tag;
		this.key = key;
		this.stateNode = null;
		this.type = null;

		// 构成树状结构
		this.child = null;
		this.sibling = null;
		this.return = null;
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps;
		this.memoizedProps = null;
		this.updateQueue = null;
		this.memoizedState = null;

		this.alternate = null;
		this.flags = NoFlags;
	}
}

export class FiberRootNode {
	// 挂载点
	container: Container;
	// 挂载点对应的fiber 即HostRootFiber
	current: FiberNode;
	// 调度更新完成之后的HostRootFiber
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export function createWorkInProgress(
	current: FiberNode,
	pendingProps: Props
): FiberNode {
	let wip = current.alternate;
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, current.key, pendingProps);
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
	}

	wip.type = current.type;
	wip.child = current.child;
	wip.updateQueue = current.updateQueue;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
}
