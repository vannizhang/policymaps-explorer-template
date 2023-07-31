import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../contexts/AppContextProvider';
import { IItem } from '@esri/arcgis-rest-portal';
import { useSelector } from 'react-redux';
import { itemsSelector } from '../../store/reducers/GroupContent';
import { groupItemsByCategory } from './helpers';
import { AccordionGroup4MainCategory } from './AccordionGroup4MainCategory';

export const SearchResultsByCategoriesContainer = () => {
    const { categorySchema } = useContext(AppContext);

    const items: IItem[] = useSelector(itemsSelector);

    const itemsByCategory = useMemo(
        () => groupItemsByCategory(items, categorySchema.categories),
        [items, categorySchema]
    );

    const getAccordionGroup4MainCategory = () => {
        if (!items || !items.length) {
            return null;
        }

        const mainCategories = Object.keys(itemsByCategory).sort((a, b) =>
            a.localeCompare(b)
        );

        return mainCategories.map((mainCategory) => {
            return (
                <AccordionGroup4MainCategory
                    key={mainCategory}
                    mainCategory={mainCategory}
                    items={itemsByCategory[mainCategory]}
                />
            );
        });
    };

    return (
        <div
            style={{
                border: '1px solid #efefef',
                borderBottom: 'none',
            }}
        >
            {getAccordionGroup4MainCategory()}
        </div>
    );
};
