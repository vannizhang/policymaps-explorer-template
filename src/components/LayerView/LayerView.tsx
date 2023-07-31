import React from 'react';

import { loadModules } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import ILayer from 'esri/layers/Layer';
import { IItem } from '@esri/arcgis-rest-portal';

type Props = {
    item: IItem;
    mapView?: IMapView;
};

export const LayerView: React.FC<Props> = ({ item, mapView }: Props) => {
    const showLayerOnMap = async () => {
        type Modules = [typeof ILayer];

        try {
            const [Layer] = await (loadModules([
                'esri/layers/Layer',
            ]) as Promise<Modules>);

            const layer = await Layer.fromPortalItem({
                portalItem: {
                    // autocasts as new PortalItem()
                    id: item.id,
                } as any,
            });

            mapView.map.add(layer);
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        if (!mapView) {
            return;
        }

        mapView.map.removeAll();

        if (item) {
            showLayerOnMap();
        }
    }, [mapView, item]);

    return null;
};
