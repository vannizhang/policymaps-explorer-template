import React from 'react';
import Card from './Card';
import { IItem } from '@esri/arcgis-rest-portal';
import { getThumbnailURL } from '../../utils/agol-item-helpers';

// import { AgolItem } from '../../../utils/arcgis-online-group-data';

export interface CardListData {
    item: IItem;
    inCollection?: boolean;
    isActiveItemOnMap?: boolean;
    // isMyFav?: boolean;
}

interface Props {
    title: string;
    data: CardListData[];
    itemCount: number;
    viewBtnOnClick: (item: IItem) => void;
    toggleCollectBtnOnClick: (item: IItem) => void;
}

const CardList: React.FC<Props> = ({
    title = '',
    data = [],
    itemCount = 0,
    toggleCollectBtnOnClick,
    viewBtnOnClick,
}: Props) => {
    const [isHide, setIsHide] = React.useState<boolean>(false);

    const toggleList = () => {
        setIsHide(!isHide);
    };

    const getList = () => {
        const cards = data.map((d) => {
            const { item, isActiveItemOnMap, inCollection } = d;

            const { title, snippet, id, agolItemUrl } = item;

            return (
                <div key={`list-item-${id}`} className="block trailer-half">
                    <Card
                        title={title}
                        description={snippet}
                        link={agolItemUrl}
                        itemId={id}
                        imageUrl={getThumbnailURL({ item })}
                        item={item}
                        isActiveItemOnMap={isActiveItemOnMap}
                        isInCollection={inCollection}
                        viewBtnOnClick={viewBtnOnClick}
                        toggleCollectBtnOnClick={toggleCollectBtnOnClick}
                    />
                </div>
            );
        });

        return (
            <div className="card-list block-group block-group-2-up tablet-block-group-2-up phone-block-group-1-up">
                {cards}
            </div>
        );
    };

    return (
        <>
            <div
                className="trailer-half"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={toggleList}
            >
                {/* // toggle button  */}
                <div className="font-size--3">
                    {!isHide ? (
                        <span className="icon-ui-minus"></span>
                    ) : (
                        <span className="icon-ui-plus"></span>
                    )}
                </div>

                {/* //name of the list and count */}
                <span className="avenir-demi font-size--2">
                    {title} ({itemCount})
                </span>

                {/* // horizontal dicide line  */}
                <div
                    style={{
                        height: '1px',
                        background: '#ccc',
                        flexGrow: 2,
                        marginLeft: '.75rem',
                    }}
                ></div>
            </div>
            {!isHide ? getList() : null}
        </>
    );
};

export default CardList;
