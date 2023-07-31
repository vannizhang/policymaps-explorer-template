import React, { useContext } from 'react';

import {
    SiteNav,
    Sidebar,
    SearchResults,
    MyCollections,
    SearchInput,
    CategoryFilter,
    MapViewContainer,
} from '../';
import {
    APP_TITLE,
    HIDE_MY_COLLECTIONS,
    SHOULD_GROUP_SEARCH_RESULTS_BY_CATEGORIES,
} from '../../config';
import { AppContext } from '../../contexts/AppContextProvider';

export const Layout = () => {
    const { inIframe } = useContext(AppContext);

    const shouldShowMyCollections = () => {
        if (HIDE_MY_COLLECTIONS || SHOULD_GROUP_SEARCH_RESULTS_BY_CATEGORIES) {
            return false;
        }

        return true;
    };

    return (
        <>
            {!inIframe ? (
                <SiteNav
                    siteName={APP_TITLE}
                    // infoBtnOnClick={()=>{}}
                />
            ) : null}

            <div
                style={{
                    position: 'absolute',
                    top: inIframe ? 0 : 61,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Sidebar>
                    <SearchInput />

                    <CategoryFilter />

                    {shouldShowMyCollections() && <MyCollections />}

                    {!SHOULD_GROUP_SEARCH_RESULTS_BY_CATEGORIES && (
                        <SearchResults />
                    )}
                </Sidebar>

                <MapViewContainer />
            </div>
        </>
    );
};
