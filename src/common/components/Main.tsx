import Grid from '@mui/material/Grid';
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import Container from '@mui/material/Container';
import { createTodolistAC } from '@/features/todolists/model/todolists-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists.tsx';

export const Main = () => {
	const dispatch = useAppDispatch();

	const createTodolist = (title: string) => {
		const action = createTodolistAC(title);
		dispatch(action);
	};

	return (
		<Container fixed>
			<Grid container sx={{ mb: '30px' }}>
				<CreateItemForm onCreateItem={createTodolist} />
			</Grid>
			<Grid container spacing={4}>
				<Todolists />
			</Grid>
		</Container>
	);
};
