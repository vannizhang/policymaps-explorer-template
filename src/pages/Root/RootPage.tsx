import React, { useContext } from 'react';

import {
    SiteNav,
    Sidebar,
    SearchResults,
    MyCollections,
    SearchInput,
    CategoryFilter,
    MapViewContainer,
} from '../../components';
import { APP_TITLE } from '../../config';
import { AppContext } from '../../contexts/AppContextProvider';

const RootPage = () => {
    const { inIframe } = useContext(AppContext);

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

                    <MyCollections />

                    <SearchResults />
                </Sidebar>

                <MapViewContainer />
            </div>
        </>
    );
};

export default RootPage;
