import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { activeWebmapSelector, setActiveMap } from '../../store/reducers/Map';

import {
    itemsSelector,
    searchResultSelector,
} from '../../store/reducers/GroupContent';

import { AgolItem } from '@vannizhang/arcgis-rest-helper';

import CardList, { CardListData } from './CardList';

import { IItem } from '@esri/arcgis-rest-types';
import {
    myCollectionSelector,
    toggleCollectionItem,
} from '../../store/reducers/MyCollections';
// import { SearchResponse } from '../../utils/arcgis-online-group-data';

interface Props {
    title: string;
    data: AgolItem[];
    itemCount?: number;
}

const CardListContainer: React.FC<Props> = ({
    title = '',
    data = [],
    itemCount = 0,
}) => {
    const dispatch = useDispatch();

    const activeWebmap: IItem = useSelector(activeWebmapSelector);

    const myCollections: AgolItem[] = useSelector(myCollectionSelector);

    const cardListData = useMemo((): CardListData[] => {
        const myCollectionsItemIds = myCollections.map((d) => d.id);
        // console.log(myCollectionsItemIds)

        return data.map((item) => {
            return {
                data: item,
                isActiveItemOnMap: activeWebmap && activeWebmap.id === item.id,
                inCollection: myCollectionsItemIds.indexOf(item.id) > -1,
            };
        });
    }, [data, myCollections, activeWebmap]);

    return (
        <CardList
            items={cardListData}
            itemCount={itemCount}
            title={title}
            viewBtnOnClick={(item) => {
                dispatch(setActiveMap(item as IItem));
            }}
            toggleCollectBtnOnClick={(item) => {
                dispatch(toggleCollectionItem(item));
            }}
        />
    );
};

export default CardListContainer;
