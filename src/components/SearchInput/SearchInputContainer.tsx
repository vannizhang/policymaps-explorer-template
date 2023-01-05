import React, { useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
    isCategoryFilterVisibleSelector,
    isCategoryFilterVisibleToggled,
} from '../../store/reducers/UI';

import { updateSearchTerm } from '../../store/reducers/GroupContent';

import SerachInput from './SearchInput';

// import { AppContext } from '../../contexts/AppContextProvider';

const SearchInputContainer = () => {
    const dispatch = useDispatch();

    // const { arcGISOnlineGroupData } = useContext(AppContext);

    const searchAutoCompleteOnChange = async (val: string) => {
        // arcGISOnlineGroupData.updateSearchTerm(val);

        // const results = await arcGISOnlineGroupData.search({
        //     start: 1,
        //     // num
        // });

        dispatch(updateSearchTerm(val));
    };

    const isCategoryFilterVisible = useSelector(
        isCategoryFilterVisibleSelector
    );

    return (
        <SerachInput
            isCategoryFilterVisible={isCategoryFilterVisible}
            toggleCategoryFilter={() => {
                dispatch(isCategoryFilterVisibleToggled());
            }}
            searchAutoCompleteOnChange={searchAutoCompleteOnChange}
        />
    );
};

export default SearchInputContainer;
