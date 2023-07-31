import React from 'react';

import {
    itemsSelector,
    searchResultSelector,
} from '../../store/reducers/GroupContent';

import { useDispatch, useSelector } from 'react-redux';

import CardListContainer from './CardListContainer';
import { IItem } from '@esri/arcgis-rest-portal';

const SearchResultsContainer = () => {
    const searchResults: IItem[] = useSelector(itemsSelector);

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
