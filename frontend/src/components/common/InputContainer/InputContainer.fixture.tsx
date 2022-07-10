import React from 'react';
import { Icon, InputGroup } from '@blueprintjs/core';
import InputContainer from './InputContainer';

export default () => {
  return (
    <div className="content">
      <InputContainer label="Hello" error="Error here" subtext="Subtext here">
        <InputGroup leftElement={<Icon icon="tag" />} placeholder="Find tags" />
      </InputContainer>
    </div>
  );
};
