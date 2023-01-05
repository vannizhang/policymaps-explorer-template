import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import {
    RootState,
    StoreDispatch,
    // StoreGetState
} from '../configureStore';

import { IItem } from '@esri/arcgis-rest-types';

import { updateWebmapIdInHash } from '../../utils/hash-params-manager/hashParamsManager';

type MapState = {
    activeWebmap: IItem;
    // mapCenter: string;
};

export const initialMapState = {
    activeWebmap: null,
} as MapState;

const slice = createSlice({
    name: 'map',
    initialState: initialMapState,
    reducers: {
        activeMapChanged: (state, action: PayloadAction<IItem>) => {
            state.activeWebmap = action.payload;
        },
    },
});

const { reducer } = slice;

const { activeMapChanged } = slice.actions;

export const setActiveMap =
    (item: IItem) =>
    (
        dispatch: StoreDispatch
        // getState:StoreGetState
    ) => {
        updateWebmapIdInHash(item.id);
        dispatch(activeMapChanged(item));
    };

// selector
export const activeWebmapSelector = createSelector(
    (state: RootState) => state.Map.activeWebmap,
    (activeWebmap) => activeWebmap
);

export default reducer;
