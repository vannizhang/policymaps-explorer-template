import { IItem } from '@esri/arcgis-rest-portal';

import { AGOL_HOST } from '../../config';
import { SHARING_CONTENT_URL } from './config';
import { getPortalBaseUrl, getToken } from '../Esri-OAuth';

type GetThumbnailURLOptions = {
    item: IItem;
    /**
     * width of the thumbnail image, default is 400
     */
    width?: number;
    // /**
    //  * token needs be used to fetch thumbnails for items that are not shared with public
    //  */
    // token?: string;
};

/**
 * Get URL of Thumbnail Image for input item
 * @param item ArcGIS Online Item
 * @param options
 * @returns
 */
export const getThumbnailURL = ({
    item,
    width = 400,
}: GetThumbnailURLOptions) => {
    const { id, thumbnail } = item;

    if (!thumbnail) {
        return 'https://static.arcgis.com/images/desktopapp.png';
    }

    const urlSearchParams = new URLSearchParams({
        w: `${width}`,
        token: getToken(),
    });

    return `${SHARING_CONTENT_URL}/items/${id}/info/${thumbnail}?${urlSearchParams.toString()}`;
};

/**
 * Get URL of the item on ArcGIS Online
 * @param item ArcGIS Online Item
 * @returns
 */
export const getItemUrl = (item: IItem) => {
    const { id } = item;
    const portalBaseURl = getPortalBaseUrl();

    const baseURL = portalBaseURl || AGOL_HOST;

    return `${baseURL}/home/item.html?id=${id}`;
};

/**
 * Check if input item is shared with public so that everyone has access to it
 * @param item ArcGIS Online Item
 * @returns boolean indicates if item is shared with public
 */
export const isItemSharedWithPublic = (item: IItem) => {
    return item.access === 'public';
};

/**
 * Check if a StoryMap item is published
 * @param item
 * @returns
 */
export const isStorymapPublished = (item: IItem) => {
    const { typeKeywords, type } = item;
    return type === 'StoryMap' && typeKeywords.includes('smstatuspublished');
};

/**
 * Check if a Web Experience item is published
 * @param item
 * @returns
 */
export const isWebExperiencePublished = (item: IItem) => {
    const { typeKeywords, type } = item;

    return (
        (type === 'Web Experience' || type === 'Web Experience Template') &&
        typeKeywords.includes('status: Published')
    );
};

/**
 * Check if input item requires Subscription
 * @param item
 * @returns
 */
export const requiresSubscription = (item: IItem) => {
    const { typeKeywords } = item;
    return typeKeywords.indexOf('Requires Subscription') >= 0 ? true : false;
};

/**
 * Check if input item requires Credits
 * @param item
 * @returns
 */
export const requiresCredits = (item: IItem) => {
    const { typeKeywords } = item;
    return typeKeywords.indexOf('Requires Credits') >= 0 ? true : false;
};

/**
 * Check if input item is authoritative
 * @param item
 * @returns
 */
export const isAuthoritative = (item: IItem) => {
    const { contentStatus } = item;
    return contentStatus === 'public_authoritative' ? true : false;
};
