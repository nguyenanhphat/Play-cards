import React from 'react';
import { CardPage } from './modules/card';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <CardPage />
    }
];

export default routes;