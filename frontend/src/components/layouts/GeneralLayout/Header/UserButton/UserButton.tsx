import React, { useCallback } from 'react';
import { Button, Menu, MenuItem, Position } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { AppThunkDispatch } from '@/store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/store/reducers/data';
import { currentUserSelector } from '@/store/selectors';

interface Props {}

const UserButton = ({}: Props) => {
  const user = useSelector(currentUserSelector);
  const dispatch: AppThunkDispatch = useDispatch();

  const handleClickLogout = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <Popover2
      minimal
      modifiers={{ offset: { enabled: true, options: { offset: [0, 10] } } }}
      content={
        <Menu>
          <MenuItem icon="log-out" onClick={handleClickLogout} text="Выйти" />
        </Menu>
      }
      position={Position.BOTTOM_LEFT}
    >
      <Button icon="user" minimal>
        {user.email}
      </Button>
    </Popover2>
  );
};

export default UserButton;
