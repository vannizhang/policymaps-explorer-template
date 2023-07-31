import { AGOL_HOST } from '../../config';

export const SHARING_HOST_URL = AGOL_HOST + '/sharing';

/**
 * ArcGIS Online request URL used to access the self resource
 *
 * @example
 * ```
 * https://www.arcgis.com/sharing/rest/portals/self
 * ```
 */
export const PORTAL_SELF_URL = `${AGOL_HOST}/sharing/rest/portals/self`;

/**
 * Root URL for Portal Content
 *
 * @example
 * ```
 * https://www.arcgis.com/sharing/rest/content
 * ```
 */
export const SHARING_CONTENT_URL = SHARING_HOST_URL + '/rest/content';
