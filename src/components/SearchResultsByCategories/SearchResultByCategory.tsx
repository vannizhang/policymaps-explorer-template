import React, { useState } from 'react';

import Card from './Card';
import { IItem } from '@esri/arcgis-rest-portal';
import { getItemUrl, getThumbnailURL } from '../../utils/agol-item-helpers';

// export type CategoryLabel = 'Department or Agency' | 'NGDA';

type Props = {
    title: string;
    items: IItem[];
    activeItem: IItem;
    onSelect: (item: IItem) => void;
    // categoryLabelType: CategoryLabel;
};

const SearchResultByCategory: React.FC<Props> = ({
    title,
    items,
    activeItem,
    onSelect,
}: Props) => {
    const getCardList = () => {
        const cards = items.map((item) => {
            const { title, snippet, id } = item;

            const isActiveItemOnMap = activeItem?.id === id;

            const thumbnailUrl = getThumbnailURL({
                item,
            });

            const agolItemUrl = getItemUrl(item);

            return (
                <div key={`list-item-${id}`} className="block trailer-half">
                    <Card
                        title={title}
                        description={snippet}
                        link={agolItemUrl}
                        itemId={id}
                        imageUrl={thumbnailUrl}
                        item={item}
                        isActiveItemOnMap={isActiveItemOnMap}
                        viewBtnOnClick={onSelect}
                        // categoryLabel={''}
                    />
                </div>
            );
        });

        return (
            <div
                style={{
                    padding: '.75rem 0 .5rem',
                    margin: 0,
                    // borderBottom: '1px solid #efefef',
                }}
                className="card-list block-group block-group-1-up tablet-block-group-1-up phone-block-group-1-up"
            >
                {cards}
            </div>
        );
    };

    return <div>{getCardList()}</div>;
};

export default SearchResultByCategory;
