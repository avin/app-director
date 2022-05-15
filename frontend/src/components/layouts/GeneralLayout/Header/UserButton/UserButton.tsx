import React, { useCallback } from 'react';
import { Button, Menu, MenuItem, Position } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

interface Props {}

const UserButton = ({}: Props): JSX.Element => {
  const handleClickLogout = useCallback(() => {
    // TODO
  }, []);

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
        foo@asd.com
      </Button>
    </Popover2>
  );
};

export default UserButton;
