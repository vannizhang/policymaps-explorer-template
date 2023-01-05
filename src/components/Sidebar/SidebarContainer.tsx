import React, { useCallback, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import {
//     loadItems,
//     loadMoreItems,
//     searchResultsResponseSelector,
// } from '../../store/reducers/GroupContentSearchResults';

import { searchItems, loadMoreItems } from '../../store/reducers/GroupContent';

import { AppContext } from '../../contexts/AppContextProvider';

import Sidebar from './Sidebar';

type Props = {
    children?: React.ReactNode;
};

const SidebarContainer: React.FC = ({ children }: Props) => {
    const dispatch = useDispatch();

    const { showMapOnly } = useContext(AppContext);

    const searchNextSetOfGroupContents = async () => {
        dispatch(loadMoreItems(30));
    };

    const searchGroupContents = useCallback(async () => {
        dispatch(searchItems());
    }, []);

    useEffect(() => {
        searchGroupContents();
    }, []);

    return !showMapOnly ? (
        <Sidebar scrollToBottomHandler={searchNextSetOfGroupContents}>
            {children}
        </Sidebar>
    ) : null;
};

export default SidebarContainer;
