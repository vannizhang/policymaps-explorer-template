import React from 'react';
import classnames from 'classnames';
import { stringFns } from 'helper-toolkit-ts';
import { IItem } from '@esri/arcgis-rest-portal';

interface Props {
    title: string;
    link: string;
    description: string;
    itemId: string;
    imageUrl: string;
    item?: IItem;
    hideCollectButton?: boolean;

    isActiveItemOnMap?: boolean;
    isInCollection?: boolean;
    viewBtnOnClick: (item: IItem) => void;
    toggleCollectBtnOnClick: (item: IItem) => void;
}

const RegularCard: React.FC<Props> = ({
    title,
    link,
    description,
    imageUrl,
    item,
    hideCollectButton = false,
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
                            flexGrow: '1',
                            flexShrink: 0,
                            flexBasis: '50%',
                            margin: '0 .1rem',
                        }}
                        onClick={viewBtnOnClick.bind(this, item)}
                    >
                        View
                    </div>

                    {hideCollectButton === false && (
                        <div
                            className={classnames('btn btn-small text-center', {
                                'btn-clear': !isInCollection,
                            })}
                            style={{
                                flexGrow: '1',
                                flexShrink: 0,
                                flexBasis: '50%',
                                margin: '0 .1rem',
                            }}
                            onClick={toggleCollectBtnOnClick.bind(this, item)}
                        >
                            {isInCollection ? 'Remove' : 'Collect'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegularCard;
