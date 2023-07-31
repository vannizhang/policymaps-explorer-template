import { loadModules } from 'esri-loader';
import axios from 'axios';

import IOAuthInfo from 'esri/identity/OAuthInfo';
import IdentityManager from 'esri/identity/IdentityManager';
import IPortal from 'esri/portal/Portal';
import ICredential from 'esri/identity/Credential';
import IPortalUser from 'esri/portal/PortalUser';
import { AGOL_HOST } from '../../config';

type Props = {
    appId: string;
    portalUrl?: string;
};

type OAuthResponse = {
    credential: ICredential;
    portal: IPortal;
};

type IPlatformSelfResponse = {
    expires_in: number;
    token: string;
    username: string;
};

export type UserData = {
    name: string;
    id: string;
    group: string;
    image: string;
    favGroupId: string;
    baseUrl: string;
};

let oauthInfo: IOAuthInfo;
let esriId: typeof IdentityManager;
let userPortal: IPortal;
let credential: ICredential = null;

const platformSelf = async (
    appId: string,
    portalUrl = 'https://www.arcgis.com'
): Promise<IPlatformSelfResponse> => {
    // The primary purpose of the esri_auth platform cookie (clear-text platform cookie bound to .arcgis.com) was for the ArcGIS Online backend to maintain single sign-on state for the signed in user.
    // Since it was in clear text, various apps (including the Home app) were reading and writing to this platform cookie either for accomplishing workflows which otherwise were not possible due to unavailable additional rest api calls or out of convenience.
    // This esri_auth cookie got flagged by multiple security scanners as a vulnerability since it is set in clear text, contains a token and is accessible via JavaScript which could exploited in a XSS attack.
    // Therefore, ArcGIS Online team has decided to move away from using clear text "esri_auth" platform cookie,
    // Moving forward, we should call oauth2/platformSelf along with encrypted platform cookie to check if the user has access to the app before returning the username and the app-specific token for that user.
    // For more information: https://confluencewikidev.esri.com/display/AGO/Moving+Away+From+Clear-Text+esri_auth+Platform+Cookie
    const { data } = await axios({
        url: portalUrl + '/sharing/rest/oauth2/platformSelf?f=json',
        method: 'post',
        headers: {
            'X-Esri-Auth-Client-Id': appId,
            'X-Esri-Auth-Redirect-Uri': window.location.origin,
        },
        withCredentials: true,
    });

    if (data.error) {
        return null;
    }

    const { expires_in, token, username } = data;

    return {
        expires_in,
        token,
        username,
    };
};

export const initEsriOAuth = async ({
    appId,
    portalUrl = 'https://www.arcgis.com',
}: Props): Promise<OAuthResponse> => {
    try {
        type Modules = [
            typeof IOAuthInfo,
            typeof IdentityManager,
            typeof IPortal
        ];

        const [OAuthInfo, identityManager, Portal] = await (loadModules([
            'esri/identity/OAuthInfo',
            'esri/identity/IdentityManager',
            'esri/portal/Portal',
        ]) as Promise<Modules>);

        const platformSelfResponse = await platformSelf(appId, portalUrl);

        oauthInfo = new OAuthInfo({
            appId,
            portalUrl,
            popup: false,
        });

        esriId = identityManager;

        esriId.registerOAuthInfos([oauthInfo]);

        if (platformSelfResponse) {
            const { expires_in, token, username } = platformSelfResponse;

            esriId.registerToken({
                expires: expires_in,
                token: token,
                server: portalUrl,
                userId: username,
                ssl: false,
            });
        }

        credential = await esriId.checkSignInStatus(
            oauthInfo.portalUrl + '/sharing'
        );

        // init paortal
        userPortal = new Portal({ url: portalUrl });
        // Setting authMode to immediate signs the user in once loaded
        userPortal.authMode = 'immediate';

        // Once loaded, user is signed in
        await userPortal.load();
    } catch (err) {
        console.log('anomynous user');
    }

    return {
        credential,
        portal: userPortal,
    };
};

export const signIn = async (): Promise<void> => {
    const credential: ICredential = await esriId.getCredential(
        oauthInfo.portalUrl + '/sharing'
    );
    console.log('signed in as', credential.userId);
};

export const signOut = async (): Promise<void> => {
    const { appId, portalUrl } = oauthInfo;
    const { token } = credential;

    try {
        // need to call oauth2/signout to clear the encrypted cookie and signs the user out of the ArcGIS platform
        // here to learn more: https://confluencewikidev.esri.com/display/AGO/oAuth+signout
        await axios({
            url: portalUrl + '/sharing/rest/oauth2/signout',
            method: 'post',
            params: {
                client_id: appId,
                token,
                // redirect_uri: window.location.href
            },
        });
    } catch (err) {
        console.error(err);
    }

    esriId.destroyCredentials();

    window.location.reload();
};

// get the user data object to populate Esri Global Nav
export const getUserData = (): UserData => {
    if (!userPortal) {
        return null;
    }

    const { name } = userPortal;

    const user: IPortalUser & {
        favGroupId?: string;
    } = userPortal.user;

    const { fullName, username, thumbnailUrl, favGroupId } = user;

    const baseUrl = getPortalBaseUrl();

    return {
        // 	name: 'Cassidy Bishop',
        name: fullName,
        // 	id: 'iamoktatester@gmail.com',
        id: username,
        // 	group: 'Riverside City Mgmt.',
        group: name,
        // 	image: '//placehold.it/300x300'
        image: thumbnailUrl,
        favGroupId,
        baseUrl,
    };
};

/**
 * Get Base URL of ArcGIS Online Portal of the signed in user.
 * @returns
 */
export const getPortalBaseUrl = () => {
    if (!userPortal) {
        return AGOL_HOST;
    }

    const { urlKey, url, customBaseUrl } = userPortal;

    return urlKey ? `https://${urlKey}.${customBaseUrl}` : `${url}`;
};

/**
 * call this function to direct to the switch account page on ArcGIS Online
 */
export const switchAccount = () => {
    const portalBaseUrl = getPortalBaseUrl();
    const redirectUri = `${window.location.origin}${window.location.pathname}index.html`;
    const targetUrl = `${portalBaseUrl}/home/pages/Account/manage_accounts.html#redirect_uri=${redirectUri}&client_id=arcgisonline`;
    window.open(targetUrl, '_blank');
};

/**
 * Check and see if user is signed or not
 * @returns boolean return false if not signed in yet
 */
export const isAnonymouns = () => {
    return credential === null;
};

/**
 * Get the Token from the credential of signed in user
 * @returns
 */
export const getToken = () => {
    if (!credential) {
        return '';
    }

    return credential.token;
};

/**
 * Get Portal User instance for signed-in user
 * @returns IPortalUser
 */
export const getSignedInUser = () => {
    return userPortal?.user || null;
};

/**
 * get the id of "My Favorites" group of the signed in user
 */
export const getMyFavoritesGroupId = () => {
    if (!userPortal) {
        return '';
    }

    const user: IPortalUser & {
        favGroupId?: string;
    } = userPortal.user;

    return user?.favGroupId;
};

/**
 * Get Portal Instance for signed in user
 * @returns
 */
export const getUserPortal = () => {
    return userPortal;
};
