import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AuthSlice from '../../redux/slice/AuthSlice';
import { User } from '../../stores/User';
import { loginSelector } from "../../redux/selectors";
import { Link, useNavigate } from 'react-router-dom';

export const AccountDropdown = () => {
    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const { delUser } = User();
    const login = useSelector(loginSelector);
    const dispatch = useDispatch();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const handleLogout = async (event: Event | React.SyntheticEvent) => {
        handleClose(event);
        // await httpAuth.post('/logout', {}).then((res) => {
        dispatch(AuthSlice.actions.setLogin(false));
        delUser();
        // });
        console.log('logout');

    }
    const handleToProfile = (event: Event | React.SyntheticEvent) => {
        handleClose(event);
        return navigate("/profile");
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>                                    <Typography component={"span"}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{ 'cursor': 'pointer' }}
            display={'flex'}
            alignItems={'center'}
        >
            {/* <PersonIcon />{userCurrent.name} */}Account
        </Typography>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleClose}>My Account</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}
