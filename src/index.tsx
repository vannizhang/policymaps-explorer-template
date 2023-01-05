import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';

// import { setDefaultOptions } from 'esri-loader';

import { RootPage } from './pages';

import {
    setDefaultOptions,
    loadGroupCategorySchema,
    DefaultOptions,
} from '@vannizhang/arcgis-rest-helper';

import { AGOL_GROUP_ID, APP_TITLE } from './config';
import { APP_ID, PORTAL_URL } from './constants/ArcGIS';
import { getUserData, initEsriOAuth } from './utils/Esri-OAuth';
import { ArcGISIdentityManager } from '@esri/arcgis-rest-request';
import { Helmet } from 'react-helmet';

(async () => {
    const root = createRoot(document.getElementById('root'));

    let defaultOptions: DefaultOptions = {
        groupId: AGOL_GROUP_ID,
    };

    const { credential } = await initEsriOAuth({
        appId: APP_ID,
        portalUrl: PORTAL_URL,
    });

    if (credential) {
        const { favGroupId, baseUrl } = getUserData();

        const identityManager = await ArcGISIdentityManager.fromToken({
            token: credential.token,
        });

        defaultOptions = {
            groupId: AGOL_GROUP_ID,
            myFavGroupId: favGroupId,
            ArcGISOnlineHost: baseUrl,
            identidyManager: identityManager,
        };
    }

    setDefaultOptions(defaultOptions);

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

                <RootPage />
            </AppContextProvider>
        </ReduxProvider>
    );
})();
