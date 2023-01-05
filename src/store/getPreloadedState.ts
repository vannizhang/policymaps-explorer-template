import { PartialRootState } from './configureStore';

// import { initialUIState, UIState } from '../store/reducers/UI';
import {
    initialState4GroupContent,
    GroupContentState,
} from '../store/reducers/GroupContent';

import { searchGroupItemsByIds } from '@vannizhang/arcgis-rest-helper';
import {
    MyCollectionsState,
    initialMyCollectionsState,
} from './reducers/MyCollections';
import { getValueFromHashParams } from '../utils/hash-params-manager/hashParamsManager';

const getPreloadedGroupContentState = (): GroupContentState => {
    return {
        ...initialState4GroupContent,
        filters: {
            ...initialState4GroupContent.filters,
            sort: 'modified',
            contentType: 'webmap',
        },
    };
};

const getPreloadedMyCollectionsState =
    async (): Promise<MyCollectionsState> => {
        const collection = getValueFromHashParams('col') as string;

        if (!collection) {
            return {
                ...initialMyCollectionsState,
            };
        }

        try {
            const itemIds = collection.split(',');

            const items = await searchGroupItemsByIds({
                itemIds,
            });

            const byIds = {};

            items.forEach((item) => {
                byIds[item.id] = item;
            });

            return {
                ...initialMyCollectionsState,
                byIds,
                allIds: itemIds,
            };
        } catch (err) {
            console.error(err);
            return initialMyCollectionsState;
        }
    };

const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        GroupContent: getPreloadedGroupContentState(),
        MyCollections: await getPreloadedMyCollectionsState(),
    };
};

export default getPreloadedState;
