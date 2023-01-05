import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { toggleShareWithMyFavGroup } from '@vannizhang/arcgis-rest-helper';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export interface MyFavItemsState {
    allIds: string[];
}

export const myFavItemsInitialState: MyFavItemsState = {
    allIds: [],
};

const slice = createSlice({
    name: 'myFavItems',
    initialState: myFavItemsInitialState,
    reducers: {
        myFavItemToggled: (state, action: PayloadAction<string>) => {
            if (state.allIds.indexOf(action.payload) > -1) {
                state.allIds = state.allIds.filter(
                    (id) => id !== action.payload
                );
            } else {
                state.allIds.push(action.payload);
            }
        },
    },
});

const { reducer } = slice;

const { myFavItemToggled } = slice.actions;

export const toggleMyFavItem = (id: string) => async (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    dispatch(myFavItemToggled(id));

    const res = await toggleShareWithMyFavGroup(id);
    console.log(res);
};

export const myFavItemsSelector = createSelector(
    (state: RootState) => state.MyFavItems.allIds,
    (allIds) => allIds
);

export default reducer;
