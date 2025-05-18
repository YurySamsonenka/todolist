import './App.css';
import { TodolistItem } from './TodolistItem.tsx';
import { useState } from 'react';
import { v1 } from 'uuid';
import { CreateItemForm } from './CreateItemForm.tsx';

export type Todolist = {
	id: string
	title: string
	filter: FilterValues
}

export type TasksState = {
	[key: string]: Task[]
}

export type Task = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
	const todolistId1 = v1();
	const todolistId2 = v1();

	const [tasks, setTasks] = useState<TasksState>({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	});

	const [todolists, setTodolists] = useState<Todolist[]>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]);

	const createTodolist = (title: string) => {
		const todolistId = v1();
		const newTodolist: Todolist = { id: todolistId, title, filter: 'all' };
		setTodolists([newTodolist, ...todolists]);
		setTasks({ ...tasks, [todolistId]: [] });
	};

	const deleteTask = (todolistId: string, taskId: string) => {
		setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) });
	};

	const changeFilter = (todolistId: string, filter: FilterValues) => {
		setTodolists(todolists.map(todolist => todolist.id === todolistId
			? { ...todolist, filter }
			: todolist));
	};

	const createTask = (title: string, todolistId: string) => {
		const newTask = { id: v1(), title, isDone: false };
		console.log(tasks);
		setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
	};

	const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task),
		});
	};

	const deleteTodolist = (todolistId: string) => {
		setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
		delete tasks[todolistId];
		setTasks({ ...tasks });
	};

	const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task),
		});
	};

	const changeTodolistTitle = (todolistId: string, title: string) => {
		setTodolists(todolists.map(todolist => todolist.id === todolistId
			? { ...todolist, title }
			: todolist));
	};

	return (
		<div className="app">
			<CreateItemForm onCreateItem={createTodolist} />
			{todolists.map(todolist => {
				const todolistTasks = tasks[todolist.id];
				let filteredTasks = todolistTasks;
				if (todolist.filter === 'active') {
					filteredTasks = todolistTasks.filter(task => !task.isDone);
				}
				if (todolist.filter === 'completed') {
					filteredTasks = todolistTasks.filter(task => task.isDone);
				}

				return <TodolistItem key={todolist.id}
					todolist={todolist}
					tasks={filteredTasks}
					deleteTask={deleteTask}
					changeFilter={changeFilter}
					createTask={createTask}
					changeTaskStatus={changeTaskStatus}
					deleteTodolist={deleteTodolist}
					changeTaskTitle={changeTaskTitle}
					changeTodolistTitle={changeTodolistTitle} />;
			})}
		</div>
	);
};
