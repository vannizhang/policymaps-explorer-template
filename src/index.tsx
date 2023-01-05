import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
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

import { AGOL_GROUP_ID } from './config';
import { APP_ID, PORTAL_URL } from './constants/ArcGIS';
import { getUserData, initEsriOAuth } from './utils/Esri-OAuth';
import { UserSession } from '@esri/arcgis-rest-auth';

(async () => {
    let defaultOptions: DefaultOptions = {
        groupId: AGOL_GROUP_ID,
    };

    const { credential } = await initEsriOAuth({
        appId: APP_ID,
        portalUrl: PORTAL_URL,
    });

    if (credential) {
        const { favGroupId, baseUrl } = getUserData();
        console.log(baseUrl);

        const userSession = UserSession.fromCredential(credential);
        console.log(userSession);

        defaultOptions = {
            groupId: AGOL_GROUP_ID,
            myFavGroupId: favGroupId,
            userSession,
            ArcGISOnlineHost: baseUrl,
        };
    }

    setDefaultOptions(defaultOptions);

    const categorySchemaJSON = await loadGroupCategorySchema();
    // console.log(categorySchema)

    const preloadedState = await getPreloadedState();

    ReactDOM.render(
        <React.StrictMode>
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AppContextProvider
                    categorySchema={categorySchemaJSON.categorySchema[0]}
                    credential={null}
                >
                    <RootPage />
                </AppContextProvider>
            </ReduxProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();
