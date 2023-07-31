import axios from 'axios';

import {
    IGroupCategorySchema,
    getGroupCategorySchema,
    ISearchResult,
    IItem,
} from '@esri/arcgis-rest-portal';

import {
    ContentType,
    ContentTypeQueryStr,
    SearchResponse,
    SortField,
    SortOrder,
    SortOrderBySortField,
} from './config';
import { AGOL_HOST, AGOL_GROUP_ID } from '../../config';

type SearchQueryParams = {
    f: string;
    start: number;
    num: number;
    q?: string;
    sortField?: SortField;
    sortOrder?: SortOrder;
    categories?: string;
    token?: string;
};

type SearchOptions = {
    start?: number;
    num?: number;
    searchTerm?: string;
    contentType?: ContentType;
    sortField?: SortField;
    // sortOrder?: SortOrder;
    mainCategory?: string;
    subCategories?: string[];
    groupId?: string;
    agolHost?: string;
    // token?:string;
};

// export const AGOL_HOST = 'https://www.arcgis.com';

let categorySchemaJSON: IGroupCategorySchema = null;

export const loadGroupCategorySchema = async (
    groupID = AGOL_GROUP_ID
): Promise<IGroupCategorySchema> => {
    if (!groupID) {
        console.log('group id is required to load category schema');
        return null;
    }

    const data = await getGroupCategorySchema(groupID);

    return (categorySchemaJSON = data);
};

const getCategoryPath = (
    mainCategory: string,
    subCategories?: string[]
): string => {
    if (
        !categorySchemaJSON ||
        !categorySchemaJSON.categorySchema ||
        !categorySchemaJSON.categorySchema[0]
    ) {
        console.error(
            'a valid Category Schema JSON is required to generate category path'
        );
        return '';
    }

    const rootCategory = categorySchemaJSON.categorySchema[0];

    const selectedMainCategory = rootCategory.categories.filter(
        (category) => category.title === mainCategory
    )[0];

    if (!selectedMainCategory) {
        return '';
    }

    if (
        !subCategories.length ||
        subCategories.length === selectedMainCategory.categories.length
    ) {
        return `/${rootCategory.title}/${selectedMainCategory.title}`;
    }

    // return concat paths for selected subcategory
    return (
        subCategories
            // the group search has the limit of max category size of '8', means it can only have 8 'OR' selections for category searches, therefore we need to trunc the array
            // to make sure there are no more than 8 items in it
            .slice(0, 8)
            .map((subCategroy) => {
                return `/${rootCategory.title}/${selectedMainCategory.title}/${subCategroy}`;
            })
            .join(',')
    );
};

export const getQueryParamsForSearch = ({
    start = 1,
    num = 10,
    searchTerm = '',
    contentType = '',
    sortField = 'relevance',
    // sortOrder = 'desc',
    mainCategory = '',
    subCategories = [],
}: // token = ''
SearchOptions): string => {
    const queryStrings: string[] = [];

    // const { identidyManager } = defaultOptions;

    if (searchTerm) {
        queryStrings.push(`(${searchTerm})`);
    }

    if (contentType && ContentTypeQueryStr[contentType]) {
        queryStrings.push(ContentTypeQueryStr[contentType]);
    }

    const q = queryStrings.length ? queryStrings.join(' ') : '';

    const categories = mainCategory
        ? getCategoryPath(mainCategory, subCategories)
        : '';

    const params: SearchQueryParams = {
        f: 'json',
        start,
        num,
        q,
        sortField,
        sortOrder: SortOrderBySortField[sortField] || 'desc',
        categories,
        // token: identidyManager ? identidyManager.token : ''
    };

    const paramsStr = Object.entries(params)
        .filter(([key, val]) => {
            if (typeof val === 'string') {
                return val !== '';
            }

            return true;
        })
        .map(([key, val]) => {
            return `${key}=${val}`;
        })
        .join('&');

    return paramsStr;
};

export const searchGroupItems = async (
    options: SearchOptions
): Promise<SearchResponse> => {
    const groupId = options.groupId || AGOL_GROUP_ID;

    if (!groupId) {
        throw 'groupId is missing. either use setDefaultOptions to specify the default groupId or pass groupId in the options';
    }

    const queryParams = getQueryParamsForSearch(options);

    const requestURL = `${AGOL_HOST}/sharing/rest/content/groups/${groupId}/search?${queryParams}`;

    const { data } = await axios.get<ISearchResult<IItem>>(requestURL);

    if (!data.results) {
        throw data;
    }

    const response: SearchResponse = {
        ...data,
    };

    // response.results = data.results.map((item) => {
    //     return formatItem({item});
    // });

    return response;
};

export const searchGroupItemsByIds = async ({
    itemIds,
    groupId,
    agolHost,
}: {
    itemIds: string[];
    groupId?: string;
    agolHost?: string;
}): Promise<IItem[]> => {
    if (!itemIds.length) {
        return [];
    }

    try {
        const searchTerm = itemIds
            .filter((d) => d)
            .map((id) => {
                return `id:${id}`;
            })
            .join(' OR ');

        const res = await searchGroupItems({
            groupId,
            agolHost,
            searchTerm,
            num: itemIds.length,
        });

        return res.results;
    } catch (err) {
        console.error(err);
        return [];
    }
};
