import {
    createSlice,
    createSelector,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

import { AgolItem } from '@vannizhang/arcgis-rest-helper';

export interface MyCollectionsState {
    byIds: {
        [key: string]: AgolItem;
    };
    allIds: string[];
}

export const initialMyCollectionsState: MyCollectionsState = {
    byIds: {},
    allIds: [],
};

const slice = createSlice({
    name: 'myCollections',
    initialState: initialMyCollectionsState,
    reducers: {
        itemsLoaded: ({ byIds, allIds }, action: PayloadAction<AgolItem[]>) => {
            const items = action.payload;

            items.forEach((item) => {
                const { id } = item;
                byIds[id] = item;
                allIds.push(id);
            });
        },
        itemAdded: ({ byIds, allIds }, action: PayloadAction<AgolItem>) => {
            const item = action.payload;
            const { id } = item;

            byIds[id] = item;
            allIds.push(id);
        },
        itemRemoved: ({ byIds, allIds }, action: PayloadAction<AgolItem>) => {
            const item = action.payload;
            const { id } = item;
            const index = allIds.indexOf(id);

            allIds.splice(index, 1);
            delete byIds[item.id];
        },
    },
});

const { reducer } = slice;

const { itemsLoaded, itemAdded, itemRemoved } = slice.actions;

// actions
export const loadCollectionItems =
    (items: AgolItem[]) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        dispatch(itemsLoaded(items));
    };

export const toggleCollectionItem =
    (item: AgolItem) => (dispatch: StoreDispatch, getState: StoreGetState) => {
        const { id } = item;
        const state = getState();
        const byIds = state.MyCollections.byIds;

        if (!byIds[id]) {
            dispatch(itemAdded(item));
        } else {
            dispatch(itemRemoved(item));
        }
    };

// selectors
export const myCollectionSelector = createSelector(
    (state: RootState) => state.MyCollections.allIds,
    (state: RootState) => state.MyCollections.byIds,
    (allIds, byIds) => {
        const items = allIds.map((id) => byIds[id]).filter((d) => d);
        return items;
    }
);

export default reducer;
