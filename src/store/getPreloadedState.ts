import { PartialRootState } from './configureStore';

// import { initialUIState, UIState } from '../store/reducers/UI';
import {
    initialState4GroupContent,
    GroupContentState,
} from '../store/reducers/GroupContent';

import {
    MyFavItemsState,
    myFavItemsInitialState,
} from '../store/reducers/myFavItems';
import {
    getMyFavItems,
    searchGroupItemsByIds,
} from '@vannizhang/arcgis-rest-helper';
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

const getPreloadedMyFavItemsState = async (): Promise<MyFavItemsState> => {
    try {
        const myFavItems = await getMyFavItems();
        return {
            ...myFavItemsInitialState,
            allIds: myFavItems.map((d) => d.id),
        };
    } catch (err) {
        console.log(err);
        return myFavItemsInitialState;
    }
};

const getPreloadedMyCollectionsState = async (): Promise<
    MyCollectionsState
> => {
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
        MyFavItems: await getPreloadedMyFavItemsState(),
        MyCollections: await getPreloadedMyCollectionsState(),
    };
};

export default getPreloadedState;
