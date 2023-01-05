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
    children: React.ReactNode;
};

const SidebarContainer: React.FC = ({ children }: Props) => {
    const dispatch = useDispatch();

    const { showMapOnly } = useContext(AppContext);

    // const searchResponse = useSelector(searchResultsResponseSelector);

    const searchNextSetOfGroupContents = async () => {
        // const nextStart = searchResponse?.nextStart || 1;

        // if (nextStart === -1) {
        //     console.error('no more items to load');
        //     return;
        // }

        // const results = await arcGISOnlineGroupData.search({
        //     start: nextStart,
        //     num: 30,
        // });

        dispatch(loadMoreItems(30));
    };

    const searchGroupContents = useCallback(async () => {
        // const results = await arcGISOnlineGroupData.search({
        //     start: 1,
        // });
        // console.log(response)
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
