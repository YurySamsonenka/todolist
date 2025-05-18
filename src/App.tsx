import './App.css';
import { TodolistItem } from './TodolistItem.tsx';
import { useState } from 'react';
import { v1 } from 'uuid';

export type Task = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
	const [tasks, setTasks] = useState<Task[]>([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Redux', isDone: false },
		{ id: v1(), title: 'Typescript', isDone: false },
		{ id: v1(), title: 'RTK query', isDone: false },
	]);

	const [filter, setFilter] = useState<FilterValues>('all');

	const deleteTask = (id: string) => {
		const filteredTasks = tasks.filter(task => task.id !== id);
		setTasks(filteredTasks);
	};

	const changeFilter = (filter: FilterValues) => {
		setFilter(filter);
	};

	const createTask = (title: string) => {
		const newTask = {
			id: v1(),
			title,
			isDone: false,
		};
		setTasks([newTask, ...tasks]);
	};

	const changeTaskStatus = (taskId: string, isDone: boolean) => {
		const newState = tasks.map(task => task.id === taskId ? {
			...task,
			isDone,
		} : task);
		setTasks(newState);
	};

	let filteredTasks = tasks;
	if (filter === 'active') {
		filteredTasks = tasks.filter(task => !task.isDone);
	}
	if (filter === 'completed') {
		filteredTasks = tasks.filter(task => task.isDone);
	}

	return (
		<div className="app">
			<TodolistItem title="What to learn"
				tasks={filteredTasks}
				deleteTask={deleteTask}
				changeFilter={changeFilter}
				createTask={createTask}
				changeTaskStatus={changeTaskStatus}
				filter={filter} />
		</div>
	);
};
