import { IItem } from '@esri/arcgis-rest-portal';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { activeItemSelector, setActiveItem } from '../../store/reducers/Map';
import SearchResultByCategory from './SearchResultByCategory';

type AccordionGroup4MainCategoryProps = {
    mainCategory: string;
    items: IItem[];
};

export const AccordionGroup4MainCategory: React.FC<
    AccordionGroup4MainCategoryProps
> = ({ mainCategory, items }: AccordionGroup4MainCategoryProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const dispatch = useDispatch();

    const activeItem: IItem = useSelector(activeItemSelector);

    if (!items.length) {
        return null;
    }

    return (
        <div>
            <div
                style={{
                    borderTop: '1px solid #efefef',
                    borderBottom: '1px solid #efefef',
                }}
                onClick={setIsOpen.bind(this, !isOpen)}
            >
                <div
                    style={{
                        padding: '.5rem 1rem',
                        cursor: 'pointer',
                    }}
                >
                    <span className="avenir-demi font-size-0">
                        {mainCategory}
                    </span>
                    <span
                        className={`right ${
                            isOpen ? 'icon-ui-up' : 'icon-ui-down'
                        }`}
                    ></span>
                </div>
            </div>

            {isOpen ? (
                <div
                    style={{
                        padding: '.25rem .5rem',
                        paddingBottom: '1rem',
                        // background: '#555'
                    }}
                >
                    <SearchResultByCategory
                        key={mainCategory}
                        title={mainCategory}
                        items={items}
                        activeItem={activeItem}
                        onSelect={(item) => {
                            dispatch(setActiveItem(item));
                        }}
                    />
                </div>
            ) : null}
        </div>
    );
};
