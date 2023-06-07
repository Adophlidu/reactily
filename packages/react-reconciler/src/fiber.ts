import { Key, Props, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

class FiberNode {
	tag: any; // 标识fiberNode的类型
	key: Key;
	pendingProps: Props; // 即将要处理的props
	memoizedProps: Props; // 已处理完的props
	type: any; // 原始类型，比如函数组件就是函数本身
	ref: Ref | null;
	stateNode: any; // dom 及 实例
	alternate: FiberNode | null; // 双缓存树的指向
	return: FiberNode | null; // 处理之后返回的节点
	child: FiberNode | null; // 第一个左孩子节点
	sibling: FiberNode | null; // 兄弟节点
	index: number; // 同层级兄弟元素的索引
	flags: Flags; // fiber的副作用
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

		this.alternate = null;
		this.flags = NoFlags;
	}
}

export default FiberNode;
