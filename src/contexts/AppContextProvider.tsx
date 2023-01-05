import React, { useState, createContext } from 'react';

import { AGOL_GROUP_ID } from '../config';
import { getValueFromHashParams } from '../utils/hash-params-manager/hashParamsManager';

import { IGroupCategory } from '@esri/arcgis-rest-portal';
import ICredential from 'esri/identity/Credential';

type AppContextValue = {
    showMapOnly: boolean;
    arcgisOnlineGroupId: string;
    categorySchema: IGroupCategory;
    credential: ICredential;
    inIframe: boolean;
};

type AppContextProviderProps = {
    categorySchema: IGroupCategory;
    credential: ICredential;
    children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>(null);

const isMapOnlyMode = getValueFromHashParams('mapOnly') as string;

const groupIdFromHashParam = getValueFromHashParams('groupId') as string;

const AppContextProvider: React.FC<AppContextProviderProps> = ({
    categorySchema,
    credential,
    children,
}: AppContextProviderProps) => {
    const [value, setValue] = useState<AppContextValue>();

    const init = async () => {
        try {
            const groupId = groupIdFromHashParam || AGOL_GROUP_ID;

            const contextValue: AppContextValue = {
                showMapOnly: isMapOnlyMode === '1',
                arcgisOnlineGroupId: groupId,
                categorySchema,
                credential,
                inIframe: window.self !== window.top,
            };

            setValue(contextValue);
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        init();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {value ? children : null}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
