import { FilterValues, Task } from './App.tsx';
import { Button } from './Button.tsx';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type Props = {
	title: string
	tasks: Task[]
	deleteTask: (id: string) => void
	changeFilter: (filter: FilterValues) => void
	createTask: (title: string) => void
	changeTaskStatus: (id: string, newStatusValue: boolean) => void
	filter: FilterValues
}

export const TodolistItem = ({
	tasks,
	title,
	deleteTask,
	changeFilter,
	createTask,
	changeTaskStatus,
	filter,
}: Props) => {
	const [taskTitle, setTaskTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const createTaskHandler = () => {
		const trimmedTitle = taskTitle.trim();
		if (trimmedTitle !== '') {
			createTask(trimmedTitle);
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

	return (<div>
		<h3>{title}</h3>
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
						deleteTask(task.id);
					};

					const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
						const newStatusValue = e.currentTarget.checked;
						changeTaskStatus(task.id, newStatusValue);
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
				onClick={() => changeFilter('all')} />
			<Button className={filter === 'active' ? 'active-filter' : ''}
				title={'Active'}
				onClick={() => changeFilter('active')} />
			<Button className={filter === 'completed' ? 'active-filter' : ''}
				title={'Complete'}
				onClick={() => changeFilter('completed')} />
		</div>
	</div>);
};
