import React from 'react';
import classnames from 'classnames';
import { stringFns } from 'helper-toolkit-ts';
// import { IItem } from '@esri/arcgis-rest-types';
import { AgolItem } from '@vannizhang/arcgis-rest-helper';

interface Props {
    title: string;
    link: string;
    description: string;
    itemId: string;
    imageUrl: string;
    item?: AgolItem;

    isActiveItemOnMap?: boolean;
    isInCollection?: boolean;
    viewBtnOnClick: (item: AgolItem) => void;
    toggleCollectBtnOnClick: (item: AgolItem) => void;
}

const RegularCard: React.FC<Props> = ({
    title,
    link,
    description,
    itemId,
    imageUrl,
    item,

    isActiveItemOnMap = false,
    isInCollection = false,

    viewBtnOnClick,
    toggleCollectBtnOnClick,
}: Props) => {
    return (
        <div
            className="card"
            style={{
                position: 'relative',
                height: '100%',
            }}
        >
            <figure
                className="card-image-wrap"
                style={{
                    cursor: 'pointer',
                }}
                onClick={viewBtnOnClick.bind(this, item)}
            >
                <img className="card-image" src={imageUrl} />
            </figure>

            <div className="card-content">
                <div>
                    <p className="font-size--1 trailer-quarter">
                        <a href={link} target="_blank" rel="noreferrer">
                            {stringFns.trunc(title, 50, true)}
                        </a>
                    </p>

                    <p className="font-size--3 trailer-half">
                        {description
                            ? stringFns.trunc(description, 75, true)
                            : ''}
                    </p>
                </div>

                <div
                    style={{
                        marginTop: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'flex-start',
                        alignContent: 'stretch',
                        alignItems: 'stretch',
                    }}
                >
                    <div
                        className={classnames('btn btn-small text-center', {
                            'btn-clear': !isActiveItemOnMap,
                        })}
                        style={{
                            width: '48%',
                            margin: '0 .1rem',
                        }}
                        onClick={viewBtnOnClick.bind(this, item)}
                    >
                        View
                    </div>

                    <div
                        className={classnames('btn btn-small text-center', {
                            'btn-clear': !isInCollection,
                        })}
                        style={{
                            width: '48%',
                            margin: '0 .1rem',
                        }}
                        onClick={toggleCollectBtnOnClick.bind(this, item)}
                    >
                        {isInCollection ? 'Remove' : 'Collect'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegularCard;
