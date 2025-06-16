import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTasks } from '@/model/tasks-selectors.ts';
import { Todolist } from '@/app/App.tsx';
import List from '@mui/material/List';
import { TaskItem } from '@/TaskItem.tsx';

type Props = {
	todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {
	const { id, filter } = todolist;

	const tasks = useAppSelector(selectTasks);


	const todolistTasks = tasks[id];
	let filteredTasks = todolistTasks;
	if (filter === 'active') {
		filteredTasks = todolistTasks.filter(task => !task.isDone);
	}
	if (filter === 'completed') {
		filteredTasks = todolistTasks.filter(task => task.isDone);
	}

	return (
		<>
			{filteredTasks.length === 0 ? (
					<p>Тасок нет</p>
				) :
				(<List>
					{filteredTasks.map(task => {
						return (
							<TaskItem task={task} todolistId={todolist.id}/>
						);
					})}
				</List>)}
		</>
	);
};
