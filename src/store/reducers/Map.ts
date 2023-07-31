import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import {
    RootState,
    StoreDispatch,
    // StoreGetState
} from '../configureStore';

import { updateWebmapIdInHash } from '../../utils/hash-params-manager/hashParamsManager';
import { IItem } from '@esri/arcgis-rest-portal';

type MapState = {
    activeItem: IItem;
    // mapCenter: string;
};

export const initialMapState = {
    activeItem: null,
} as MapState;

const slice = createSlice({
    name: 'map',
    initialState: initialMapState,
    reducers: {
        activeItemChanged: (state, action: PayloadAction<IItem>) => {
            state.activeItem = action.payload;
        },
    },
});

const { reducer } = slice;

const { activeItemChanged } = slice.actions;

export const setActiveItem =
    (item: IItem) =>
    (
        dispatch: StoreDispatch
        // getState:StoreGetState
    ) => {
        updateWebmapIdInHash(item.id);
        dispatch(activeItemChanged(item));
    };

// selector
export const activeItemSelector = createSelector(
    (state: RootState) => state.Map.activeItem,
    (activeItem) => activeItem
);

export default reducer;
