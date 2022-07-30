/**
 * Декорация для react-cosmos (не учавствует в production-сборке приложения)
 */

import React, { PropsWithChildren } from 'react';
import { ReduxMock } from 'react-cosmos-redux';
import configureStore from './store/configureStore';
import { storeState } from '@/dummies/storeState';
import { createServer } from 'miragejs';
import { generateApplication, generateStand } from '@/dummies/entites';

createServer({
  routes() {
    this.namespace = '/api';

    this.get('/applications', () => ({
      count: 1,
      items: [generateApplication()],
    }));

    this.get('/stands', () => ({
      count: 1,
      items: [generateStand()],
    }));
  },
});

const CosmosDecorator = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ReduxMock configureStore={configureStore} initialState={storeState}>
      {children}
    </ReduxMock>
  );
};

export default CosmosDecorator;
