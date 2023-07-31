import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';

import { AGOL_HOST, APP_TITLE } from './config';
import { APP_ID } from './constants/ArcGIS';
import { initEsriOAuth } from './utils/Esri-OAuth';
import { Helmet } from 'react-helmet';
import { loadGroupCategorySchema } from './services/portal-group-content';
import { Layout } from './components/Layout/Layout';

(async () => {
    const root = createRoot(document.getElementById('root'));

    await initEsriOAuth({
        appId: APP_ID,
        portalUrl: AGOL_HOST,
    });

    const categorySchemaJSON = await loadGroupCategorySchema();
    // console.log(categorySchema)

    const preloadedState = await getPreloadedState();

    root.render(
        <ReduxProvider store={configureAppStore(preloadedState)}>
            <AppContextProvider
                categorySchema={categorySchemaJSON.categorySchema[0]}
                credential={null}
            >
                <Helmet>
                    <title>{APP_TITLE}</title>
                </Helmet>

                <Layout />
            </AppContextProvider>
        </ReduxProvider>
    );
})();
