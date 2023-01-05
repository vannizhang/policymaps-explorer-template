import React, { useCallback, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { searchItems, loadMoreItems } from '../../store/reducers/GroupContent';

import { AppContext } from '../../contexts/AppContextProvider';

import Sidebar from './Sidebar';

type Props = {
    children?: React.ReactNode;
};

const SidebarContainer: React.FC<Props> = ({ children }: Props) => {
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
