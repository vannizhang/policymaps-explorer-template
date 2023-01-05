import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeWebmapSelector } from '../../store/reducers/Map';

import { AppContext } from '../../contexts/AppContextProvider';

import { signIn, getUserData } from '../../utils/Esri-OAuth';
import {
    myFavItemsSelector,
    toggleMyFavItem,
} from '../../store/reducers/myFavItems';

const AddToMyFavBtn = () => {
    const dispatch = useDispatch();

    const activeWebmapItem = useSelector(activeWebmapSelector);

    const { credential } = React.useContext(AppContext);

    const myFavItemIds = useSelector(myFavItemsSelector);

    const onClickHandler = async () => {
        if (!credential) {
            signIn();
        }

        try {
            const { id } = activeWebmapItem;

            if (myFavItemIds.indexOf(id) > -1) {
                const { baseUrl } = getUserData();
                const myFavPageUtl = `${baseUrl}/home/content.html?view=list&sortOrder=desc&sortField=modified#favorites`;
                // console.log('open item in my fav page', myFavPageUtl);
                window.open(myFavPageUtl, '_blank');
            } else {
                dispatch(toggleMyFavItem(id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getBtnLabel = () => {
        if (credential) {
            const isActiveItemInMyFav = activeWebmapItem
                ? myFavItemIds.indexOf(activeWebmapItem.id) > -1
                : false;

            return isActiveItemInMyFav
                ? 'Open this in My Favorites'
                : 'Add this to My Favorites';
        }

        return 'Sign in and add this to My Favorites';
    };

    return (
        <div className="font-size--2 cursor-pointer" onClick={onClickHandler}>
            <span>{getBtnLabel()}</span>
        </div>
    );
};

export default AddToMyFavBtn;
