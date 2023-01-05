import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CardListContainer from './CardListContainer';
import { myCollectionSelector } from '../../store/reducers/MyCollections';
import { updateMyCollectionsInHash } from '../../utils/hash-params-manager/hashParamsManager';

const MyCollectionsListContainer = () => {
    const myCollections = useSelector(myCollectionSelector);

    useEffect(() => {
        const itemIds =
            myCollections && myCollections.length
                ? myCollections.map((d) => d.id)
                : [];

        updateMyCollectionsInHash(itemIds);
    }, [myCollections]);

    return (
        <CardListContainer
            title="My collection of maps "
            itemCount={myCollections.length || 0}
            data={myCollections}
        />
    );
};

export default MyCollectionsListContainer;
