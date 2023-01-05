import React from 'react';

import {
    itemsSelector,
    searchResultSelector,
} from '../../store/reducers/GroupContent';

import { useDispatch, useSelector } from 'react-redux';
import { AgolItem } from '@vannizhang/arcgis-rest-helper';

import CardListContainer from './CardListContainer';

const SearchResultsContainer = () => {
    const searchResults: AgolItem[] = useSelector(itemsSelector);

    const searchResponse = useSelector(searchResultSelector);

    return (
        <CardListContainer
            title="Search Results"
            itemCount={searchResponse?.total || searchResults.length || 0}
            data={searchResults}
        />
    );
};

export default SearchResultsContainer;
