/**
 * Декорация для react-cosmos (не учавствует в production-сборке приложения)
 */

import React, { PropsWithChildren } from 'react';
import { ReduxMock } from 'react-cosmos-redux';
import { HashRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import { storeState } from '@/dummies/storeState';

export interface CosmosDecoratorProps {
  children?: React.ReactNode;
}

const CosmosDecorator = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ReduxMock configureStore={configureStore} initialState={storeState}>
      <Router>{children}</Router>
    </ReduxMock>
  );
};

export default CosmosDecorator;
