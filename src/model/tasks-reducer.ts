import type { TasksState } from '../App';
import { v1 } from 'uuid';

const initialState: TasksState = {};

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
	switch (action.type) {
		case 'create_todolist': {
			return { ...state, [action.payload.id]: [] };
		}
		case 'delete_todolist': {
			const newState = { ...state };
			delete newState[action.payload.id];
			return newState;
		}
		case 'delete_task': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !==
					action.payload.taskId),
			};
		}
		case 'create_task': {
			const newTask = { id: action.payload.taskId, title: action.payload.title, isDone: false };
			return {
				...state,
				[action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
			};
		}
		case 'change_task_status': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task),
			}
		}
		case "change_task_title": {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task),
			}
		}
		default:
			return state;
	}
};

export const createTodolistAC = (id: string) => {
	return { type: 'create_todolist', payload: { id } } as const;
};

export const deleteTodolistAC = (id: string) => {
	return { type: 'delete_todolist', payload: { id } } as const;
};

export const deleteTaskAC = ({ todolistId, taskId }: { todolistId: string, taskId: string }) => {
	return { type: 'delete_task', payload: { todolistId, taskId } } as const;
};

export const createTaskAC = ({ todolistId, title }: { todolistId: string, title: string }) => {
	return { type: 'create_task', payload: { title, todolistId, taskId: v1() } } as const;
};

export const changeTaskStatusAC = ({ todolistId, taskId, isDone }: {
	todolistId: string,
	taskId: string,
	isDone: boolean
}) => {
	return { type: 'change_task_status', payload: { todolistId, taskId, isDone } } as const;
};

export const changeTaskTitleAC = ({ todolistId, taskId, title }: {
	todolistId: string,
	taskId: string,
	title: string
}) => {
	return { type: 'change_task_title', payload: { todolistId, taskId, title } } as const;
};

type CreateTodolistAction = ReturnType<typeof createTodolistAC>
type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction
