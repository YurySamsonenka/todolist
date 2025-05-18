import { FilterValues, Task, Todolist } from './App.tsx';
import { Button } from './Button.tsx';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type Props = {
	todolist: Todolist
	tasks: Task[]
	deleteTask: (todolistId: string, taskId: string) => void
	changeFilter: (todolistId: string, filter: FilterValues) => void
	createTask: (title: string, todolistId: string) => void
	changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
	deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = ({
	todolist: { title, id, filter },
	tasks,
	deleteTask,
	changeFilter,
	createTask,
	changeTaskStatus,
	deleteTodolist,
}: Props) => {
	const [taskTitle, setTaskTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const createTaskHandler = () => {
		const trimmedTitle = taskTitle.trim();
		if (trimmedTitle !== '') {
			createTask(trimmedTitle, id);
			setTaskTitle('');
		} else {
			setError('Title is required');
		}
	};

	const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value);
		// Todo: сделать проверку на пустую строку, и только после этого вызывать setError(null)
		setError(null);
	};

	const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			createTaskHandler();
		}
	};

	const changeFilterHandler = (filter: FilterValues) => {
		changeFilter(id, filter);
	};

	const deleteTodolistHandler = () => {
		deleteTodolist(id);
	};

	return (<div>
		<div className={'container'}>
			<h3>{title}</h3>
			<Button title={'x'} onClick={deleteTodolistHandler} />
		</div>
		<div>
			<input value={taskTitle}
				onChange={changeTaskTitleHandler}
				onKeyDown={createTaskOnEnterHandler} />
			<Button title={'+'}
				onClick={createTaskHandler} />
			{error && <div className={'error-message'}>{error}</div>}
		</div>
		{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) :
			(<ul>
				{tasks.map(task => {
					const deleteTaskHandler = () => {
						deleteTask(id, task.id);
					};

					const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
						const newStatusValue = e.currentTarget.checked;
						changeTaskStatus(id, task.id, newStatusValue);
					};

					return (
						<li key={task.id} className={task.isDone ? 'is-done' : ''}>
							<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
							<span>{task.title}</span>
							<Button title={'x'} onClick={deleteTaskHandler} />
						</li>
					);
				})}
			</ul>)}
		<div>
			<Button className={filter === 'all' ? 'active-filter' : ''}
				title={'All'}
				onClick={() => changeFilterHandler('all')} />
			<Button className={filter === 'active' ? 'active-filter' : ''}
				title={'Active'}
				onClick={() => changeFilterHandler('active')} />
			<Button className={filter === 'completed' ? 'active-filter' : ''}
				title={'Complete'}
				onClick={() => changeFilterHandler('completed')} />
		</div>
	</div>);
};
