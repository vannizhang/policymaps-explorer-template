import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import ActiveMapSwitcher from './ActiveMapSwitcher';

import { activeItemSelector, setActiveItem } from '../../store/reducers/Map';
import { myCollectionSelector } from '../../store/reducers/MyCollections';
import { IItem } from '@esri/arcgis-rest-portal';

interface Props {
    isMinimal: boolean;
}

const ActiveMapSwitcherContainer: React.FC<Props> = ({ isMinimal }: Props) => {
    const dispatch = useDispatch();

    const activeItem = useSelector(activeItemSelector);

    const myCollections = useSelector(myCollectionSelector);

    const activeWebmapIdOnChange = (itemId: string) => {
        const newItem = myCollections.filter((d) => d.id === itemId)[0];
        dispatch(setActiveItem(newItem as IItem));
    };

    return (
        <ActiveMapSwitcher
            isMinimal={isMinimal}
            activeItemId={activeItem?.id}
            activeItemTitle={activeItem?.title}
            allItemIds={myCollections.map((d) => d.id)}
            activeItemIdOnChange={activeWebmapIdOnChange}
        />
    );
};

export default ActiveMapSwitcherContainer;
