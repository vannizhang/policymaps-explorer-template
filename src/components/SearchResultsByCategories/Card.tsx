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

    isActiveItemOnMap?: boolean;

    viewBtnOnClick: (item: IItem) => void;
    categoryLabel?: string;
}

const RegularCard: React.FC<Props> = ({
    title,
    link,
    description,
    itemId,
    imageUrl,
    item,

    isActiveItemOnMap = false,
    viewBtnOnClick,
    categoryLabel,
}: Props) => {
    return (
        <div
            className="card"
            style={{
                position: 'relative',
                height: '100%',
            }}
        >
            <div className="card-content">
                <div>
                    <div
                        style={{
                            maxWidth: 295,
                            marginBottom: '20px',
                        }}
                    >
                        <p className="font-size--1 trailer-0">
                            <a href={link} target="_blank" rel="noreferrer">
                                {stringFns.trunc(title, 50, true)}
                            </a>
                        </p>
                    </div>

                    <p className="font-size--3 trailer-half">
                        {description
                            ? stringFns.trunc(description, 185, true)
                            : ''}
                    </p>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                    }}
                >
                    <div
                        className={classnames('btn text-center', {
                            'btn-clear': !isActiveItemOnMap,
                        })}
                        onClick={viewBtnOnClick.bind(this, item)}
                    >
                        View
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegularCard;
