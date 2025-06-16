import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { useAppSelector } from '../common/hooks/useAppSelector.ts';
import { selectThemeMode } from './app-selectors.ts';
import { getTheme } from '../common/theme/theme.ts';
import { Header } from '@/common/components/Header.tsx';
import { Main } from '@/common/components/Main.tsx';

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
	const themeMode = useAppSelector(selectThemeMode);

	const theme = getTheme(themeMode);

	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<CssBaseline />
				<Header />
				<Main />
			</div>
		</ThemeProvider>
	);
};
