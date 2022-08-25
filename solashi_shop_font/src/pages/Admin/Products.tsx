import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { AppBar, Button, ButtonGroup, Card, CardContent, Dialog, Divider, Grid, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Typography } from '@mui/material';
import { dataExample, ProductType } from '../../@types/cart';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import ProductsDialog from '../../components/form/ProductsDialog';
import { TransitionProps } from '@mui/material/transitions';

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Box } from '@mui/system';
import { InputComponent } from '../../components/form/InputComponent';
import { SelectComponent } from '../../components/form/SelectComponent';
import { Editor } from '../../components/form/Quill';


interface Column {
    id: 'name' | 'code' | 'category' | 'price' | 'is_top' | 'sale' | 'created_at' | 'updated_at';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'category', label: 'Category', minWidth: 170 },
    {
        id: 'price',
        label: 'Price',
        minWidth: 100,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    { id: 'is_top', label: 'On top', minWidth: 100, align: 'right', format: (value: number) => (value === 0 ? 'No' : 'Yes') },
    {
        id: 'sale',
        label: 'Sale',
        minWidth: 70,
        align: 'right',
        format: (value: number) => value.toFixed(2) + '%',
    },
    {
        id: 'created_at',
        label: 'Create at',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'updated_at',
        label: 'Updated at',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
];

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Validation form
const validation = z.object({
    name: z.string().min(1, { message: "The name field is require." }),
    code: z.string().min(1, { message: "The code field is require." }),
    price: z.number().nonnegative({ message: "The price more than 1." }),
    sale: z.number().nonnegative({ message: "The price more than 0 ." }).lte(5, { message: "The price less than 100." }),

});

type AuthForm = z.infer<typeof validation>;

const rows: ProductType[] = dataExample;


export const Products = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [products, setProducts] = React.useState<ProductType[]>([]);
    const [productEdit, setProductEdit] = React.useState<ProductType[]>([]);
    const [open, setOpen] = React.useState(false);
    const { register, watch, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<AuthForm>({
        resolver: zodResolver(validation)
    });
    const [value, setValue] = React.useState('');

    const onSubmit: SubmitHandler<AuthForm> = async (value) => {
        // const res = await Api.post('/login', {
        //     email: value.email,
        // })
        // if (res) {
        //     console.log(res);
        //     const data = res.data;
        //     saveUser({
        //         ...data.user,
        //         token: data.access_token
        //     })
        //     return navigate("/");
        // }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (row: ProductType) => {
        console.log(row);
    }
    const handleDelete = (id: number) => {

        setProducts(products.filter((row) => row.id !== id))
    }


    React.useEffect(() => {
        setProducts(rows);
    }, [])

    return (
        <Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography sx={{ mx: 3, my: 1 }} variant="h5">Products Manager</Typography>
                <TableContainer sx={{ maxHeight: '65vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell align={'center'}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products && products
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <ButtonGroup>
                                                    <Button onClick={(event) => { handleClickOpen() }}>
                                                        <ModeEditIcon color='info' />
                                                    </Button>
                                                    <Button onClick={(event) => { handleDelete(row.id) }}>
                                                        <DeleteIcon color='error' />
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close"><CloseIcon /></IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Sound</Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>save</Button>
                    </Toolbar>
                </AppBar>
                <Box mt={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} >
                            <Card sx={{ ml: 3 }}>
                                <CardContent>
                                    <InputComponent name="name" type="text" label="Product's Name" register={register} error={errors.name} />
                                    <InputComponent name="code" type="text" label="Product's Code" register={register} error={errors.code} />
                                    
                                    <Editor />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ mr: 2 }}>
                                <CardContent>
                                    <InputComponent name="name" type="text" label="Product's Name" register={register} error={errors.name} />
                                    <InputComponent name="code" type="text" label="Product's Code" register={register} error={errors.code} />
                                    <SelectComponent name={"category"} label="Category" />
                                </CardContent>
                            </Card>

                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </Box>
    );
}

