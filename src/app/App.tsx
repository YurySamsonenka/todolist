import './App.css';
import { TodolistItem } from '../TodolistItem.tsx';
import { useState } from 'react';
import { CreateItemForm } from '../CreateItemForm.tsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import { containerSx } from '../TodolistItem.styles.ts';
import { NavButton } from '../NavButton.ts';
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC } from '../model/todolists-reducer.ts';
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } from '../model/tasks-reducer.ts';
import { useAppDispatch } from '../common/hooks/useAppDispatch.ts';
import { useAppSelector } from '../common/hooks/useAppSelector.ts';
import { selectTodolists } from '../model/todolists-selectors.ts';
import { selectTasks } from '../model/tasks-selectors.ts';

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

type ThemeMode = 'dark' | 'light'

export const App = () => {
	const todolists = useAppSelector(selectTodolists);
	const tasks = useAppSelector(selectTasks);

	const dispatch = useAppDispatch();

	const [themeMode, setThemeMode] = useState<ThemeMode>('light');

	const theme = createTheme({
		palette: {
			mode: themeMode,
			primary: {
				main: '#ef6c00',
			},
		},
	});

	const changeMode = () => {
		setThemeMode(themeMode === 'light' ? 'dark' : 'light');
	};

	const createTodolist = (title: string) => {
		const action = createTodolistAC(title);
		dispatch(action);
	};

	const deleteTodolist = (todolistId: string) => {
		const action = deleteTodolistAC({ id: todolistId });
		dispatch(action);
	};

	const changeTodolistTitle = (todolistId: string, title: string) => {
		dispatch(changeTodolistTitleAC({ id: todolistId, title }));
	};

	const changeFilter = (todolistId: string, filter: FilterValues) => {
		dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
	};

	const createTask = (title: string, todolistId: string) => {
		dispatch(createTaskAC({ title, todolistId }));
	};

	const deleteTask = (todolistId: string, taskId: string) => {
		dispatch(deleteTaskAC({ todolistId, taskId }));
	};

	const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
		dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
	};

	const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
		dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<CssBaseline />
				<AppBar position="static" sx={{ mb: '30px' }}>
					<Toolbar>
						<Container maxWidth={'lg'} sx={containerSx}>
							<IconButton color="inherit">
								<MenuIcon />
							</IconButton>
							<div>
								<NavButton>Sign in</NavButton>
								<NavButton>Sign up</NavButton>
								<NavButton background={theme.palette.primary.dark}>Faq</NavButton>
								<Switch color={'default'} onChange={changeMode} />
							</div>
						</Container>
					</Toolbar>
				</AppBar>
				<Container fixed>
					<Grid container sx={{ mb: '30px' }}>
						<CreateItemForm onCreateItem={createTodolist} />
					</Grid>
					<Grid container spacing={4}>
						{todolists.map(todolist => {
							const todolistTasks = tasks[todolist.id];
							let filteredTasks = todolistTasks;
							if (todolist.filter === 'active') {
								filteredTasks = todolistTasks.filter(task => !task.isDone);
							}
							if (todolist.filter === 'completed') {
								filteredTasks = todolistTasks.filter(task => task.isDone);
							}

							return (
								<Grid key={todolist.id}>
									<Paper sx={{ p: '0 20px 20px 20px' }}>
										<TodolistItem
											todolist={todolist}
											tasks={filteredTasks}
											deleteTask={deleteTask}
											changeFilter={changeFilter}
											createTask={createTask}
											changeTaskStatus={changeTaskStatus}
											deleteTodolist={deleteTodolist}
											changeTaskTitle={changeTaskTitle}
											changeTodolistTitle={changeTodolistTitle} />
									</Paper>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</div>
		</ThemeProvider>
	);
};
