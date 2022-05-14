import React from 'react';
import styles from './UserButton.module.scss';
import { Button } from '@blueprintjs/core';

interface Props {}

const UserButton = ({}: Props): JSX.Element => {
  return (
    <Button icon="user" minimal>
      foo@asd.com
    </Button>
  );
};

export default UserButton;
