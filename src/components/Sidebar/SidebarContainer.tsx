import React, { useCallback, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { searchItems, loadMoreItems } from '../../store/reducers/GroupContent';

import { AppContext } from '../../contexts/AppContextProvider';

import Sidebar from './Sidebar';
import { SHOULD_GROUP_SEARCH_RESULTS_BY_CATEGORIES } from '../../config';

type Props = {
    children?: React.ReactNode;
};

const SidebarContainer: React.FC<Props> = ({ children }: Props) => {
    const dispatch = useDispatch();

    const { showMapOnly } = useContext(AppContext);

    const searchNextSetOfGroupContents = async () => {
        if (SHOULD_GROUP_SEARCH_RESULTS_BY_CATEGORIES) {
            return;
        }

        dispatch(loadMoreItems(30));
    };

    const searchGroupContents = async () => {
        dispatch(searchItems());
    };

    useEffect(() => {
        searchGroupContents();
    }, []);

    if (showMapOnly) {
        return null;
    }

    return (
        <Sidebar scrollToBottomHandler={searchNextSetOfGroupContents}>
            {children}
        </Sidebar>
    );
};

export default SidebarContainer;
