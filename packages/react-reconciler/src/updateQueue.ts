import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

export function createUpdate<State>(action: Action<State>): Update<State> {
	return {
		action
	} as Update<State>;
}

export function createUpdateQueue<State>(): UpdateQueue<State> {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<State>;
}

export function enqueueUpdate<State>(
	queue: UpdateQueue<State>,
	update: Update<State>
) {
	queue.shared.pending = update;
}

export function processUpdate<State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } {
	const result: ReturnType<typeof processUpdate<State>> = {
		memoizedState: baseState
	};

	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			result.memoizedState = action(baseState);
		} else {
			result.memoizedState = action;
		}
	}

	return result;
}
