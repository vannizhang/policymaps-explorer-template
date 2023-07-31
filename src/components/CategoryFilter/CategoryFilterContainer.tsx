import React, { useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { isCategoryFilterVisibleSelector } from '../../store/reducers/UI';

import { updateCategory } from '../../store/reducers/GroupContent';

import { AppContext } from '../../contexts/AppContextProvider';

import CategoryFilter, { SelectedCategory } from './CategoryFilter';
import { SHOULD_GROUP_SEARCH_RESULTS_BY_CATEGORIES } from '../../config';

const CategoryFilterContainer = () => {
    const dispatch = useDispatch();

    const { categorySchema } = useContext(AppContext);

    const isVisible = useSelector(isCategoryFilterVisibleSelector);

    const categoryFilterOnChange = async (data: SelectedCategory) => {
        // arcGISOnlineGroupData.updateSelectedCategory(
        //     data.title,
        //     data.subcategories
        // );

        // const results = await arcGISOnlineGroupData.search({
        //     start: 1,
        //     // num
        // });

        dispatch(updateCategory(data.title, data.subcategories));
        // searchItems();
    };

    if (SHOULD_GROUP_SEARCH_RESULTS_BY_CATEGORIES) {
        return null;
    }

    return categorySchema ? (
        <div
            style={{
                display: isVisible ? 'block' : 'none',
            }}
        >
            <CategoryFilter
                categorySchema={categorySchema}
                onChange={categoryFilterOnChange}
            />
        </div>
    ) : null;
};

export default CategoryFilterContainer;
