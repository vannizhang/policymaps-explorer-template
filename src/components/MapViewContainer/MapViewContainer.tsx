import React, { useEffect, useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { AppContext } from '../../contexts/AppContextProvider';

import { SEARCH_WIDGET_CONTAINER_ID, SIDEBAR_WIDTH } from '../../constants/UI';

import { activeWebmapSelector, setActiveMap } from '../../store/reducers/Map';

import { MapView, SearchWidget } from '../ArcGIS';

import { TopNav, LegendWidget, LayerList } from '../';

import {
    getValueFromHashParams,
    updateMapLocationInHash,
    MapCenterLocation,
} from '../../utils/hash-params-manager/hashParamsManager';
import { searchGroupItems } from '../../services/portal-group-content';
import { IItem } from '@esri/arcgis-rest-portal';

const webmapIdFromHashParam = getValueFromHashParams('webmapId') as string;

const mapCenterFromHashParam = getValueFromHashParams('@') as MapCenterLocation;

const MapViewContainer = () => {
    const dispatch = useDispatch();

    const {
        // arcGISOnlineGroupData,
        showMapOnly,
        // arcgisOnlineGroupId,
    } = useContext(AppContext);

    const activeWebmap: IItem = useSelector(activeWebmapSelector);

    const loadActiveWebmap = async () => {
        if (!activeWebmap) {
            // featured-map is a special tag managed by Dan Pisut, the web map that has this tag will be used as default map
            let response = await searchGroupItems({
                start: 1,
                num: 1,
                searchTerm: webmapIdFromHashParam || 'tags: "featured-map"',
                contentType: 'webmap',
                sortField: 'modified',
            });

            if (!response || !response.results.length) {
                response = await searchGroupItems({
                    start: 1,
                    num: 1,
                    contentType: 'webmap',
                    sortField: 'modified',
                });
            }

            const item = response?.results[0] as IItem;

            dispatch(setActiveMap(item));
        }
    };

    useEffect(() => {
        loadActiveWebmap();
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: !showMapOnly ? SIDEBAR_WIDTH : 0,
                right: 0,
            }}
        >
            {activeWebmap ? (
                <MapView
                    webmapId={activeWebmap.id}
                    zoom={mapCenterFromHashParam?.zoom}
                    center={
                        mapCenterFromHashParam
                            ? [
                                  mapCenterFromHashParam.lon,
                                  mapCenterFromHashParam.lat,
                              ]
                            : null
                    }
                    onStationary={(mapCenter) => {
                        // dispatch()
                        updateMapLocationInHash(mapCenter);
                    }}
                >
                    <SearchWidget containerId={SEARCH_WIDGET_CONTAINER_ID} />

                    <LegendWidget />

                    <LayerList />
                </MapView>
            ) : null}

            <TopNav />
        </div>
    );
};

export default MapViewContainer;
