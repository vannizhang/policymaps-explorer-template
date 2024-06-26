import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { activeItemSelector, setActiveItem } from '../../store/reducers/Map';

import CardList, { CardListData } from './CardList';

import {
    myCollectionSelector,
    toggleCollectionItem,
} from '../../store/reducers/MyCollections';
import { IItem } from '@esri/arcgis-rest-portal';
import { HIDE_MY_COLLECTIONS } from '../../config';
// import { SearchResponse } from '../../utils/arcgis-online-group-data';

interface Props {
    title: string;
    data: IItem[];
    itemCount?: number;
}

const CardListContainer: React.FC<Props> = ({
    title = '',
    data = [],
    itemCount = 0,
}) => {
    const dispatch = useDispatch();

    const activeItem: IItem = useSelector(activeItemSelector);

    const myCollections: IItem[] = useSelector(myCollectionSelector);

    const cardListData = useMemo((): CardListData[] => {
        const myCollectionsItemIds = myCollections.map((d) => d.id);
        // console.log(myCollectionsItemIds)

        return data.map((item) => {
            return {
                item,
                isActiveItemOnMap: activeItem && activeItem.id === item.id,
                inCollection: myCollectionsItemIds.indexOf(item.id) > -1,
            };
        });
    }, [data, myCollections, activeItem]);

    return (
        <CardList
            data={cardListData}
            itemCount={itemCount}
            title={title}
            shouldHideCollectButton={HIDE_MY_COLLECTIONS}
            viewBtnOnClick={(item) => {
                dispatch(setActiveItem(item as IItem));
            }}
            toggleCollectBtnOnClick={(item) => {
                dispatch(toggleCollectionItem(item));
            }}
        />
    );
};

export default CardListContainer;
