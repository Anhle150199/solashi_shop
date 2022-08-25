import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Grid, Typography } from '@mui/material';
import { CategoryType } from '../../@types/category';

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Api } from '../../components/Api';
import { ToastSuccess } from '../../components/header/Toast';
import { Box } from '@mui/system';
import { InputComponent } from '../../components/form/InputComponent';

import CircularProgress from '@mui/material/CircularProgress';

import DeleteIcon from '@mui/icons-material/Delete';

const rows = [
    {
        id: 1,
        title: "Men's Fashion",
        active: true,
        created_at: '12/5/2021',
    },
    {
        id: 11,
        title: "Men's Fashion",
        active: true,
        created_at: '12/5/2021',
    },
    {
        id: 1111,
        title: "Men's Fashion",
        active: true,
        created_at: '12/5/2021',
    },
    {
        id: 12232,
        title: "Men's Fashion",
        active: true,
        created_at: '12/5/2021',
    }
]

// Validation form
const validation = z.object({
    name: z.string().min(1, { message: "The name field is require." }),
});

type AccountForm = z.infer<typeof validation>;
export const Categoris = () => {
    const { register, watch, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm<AccountForm>({
        resolver: zodResolver(validation)
    });
    let [categoris, setCategory] = useState<CategoryType[]>([]);
    const [progressAdd, setProgressAdd] = useState<boolean>(false);

    const onSubmit: SubmitHandler<AccountForm> = React.useCallback(async (value) => {
        console.log("old", categoris);
        setProgressAdd(true);

        const newData: CategoryType[] = [
            ...categoris,
            { id: (categoris.length + 1), title: value.name, created_at: (new Date()).toString(), active: false },
        ];
        console.log("new", newData);

        setTimeout(() => {

            setCategory(newData);
            setProgressAdd(false);
            ToastSuccess("Success");
            reset();

        }, 5000);
        // const res = await Api.post('/update-me', {
        //     name: value.name,
        //     email: value.email,
        // });
        // if (res) {
        //     saveUser({
        //         ...user,
        //         name: value.name,
        //         email: value.email,
        //     });
        // }
    }, [categoris]);

    React.useEffect(() => {
        setCategory(rows);
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Typography sx={{ mx: 3, my: 1 }} variant="h5">Products Manager</Typography>
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Created at</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categoris && categoris.map((row: CategoryType) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.created_at}</TableCell>
                                        <TableCell><Button><DeleteIcon sx={{ color: 'red' }} /></Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Card sx={{ mx: 4, mb: 4 }}>
                    <Grid container alignItems='center' justifyContent="space-between" sx={{ minHeight: "200px", display: 'table' }}>
                        <Box p={3} px={5}>
                            <form onSubmit={handleSubmit(onSubmit)} ><Box><Typography variant="h6">Add Category</Typography>
                                <InputComponent name="name" type="text" label="Category name " register={register} error={errors.name} />
                                <Button fullWidth sx={{ my: 2 }} color='error' variant="contained" type='submit' disabled={progressAdd}>
                                    <Typography display={progressAdd ? 'none' : 'contents'}>Add</Typography>
                                    {progressAdd && <CircularProgress size={24} color="error"/>}
                                </Button></Box>
                            </form>
                        </Box>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}
