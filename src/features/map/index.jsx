import React from 'react';
import AppLayout from '../../components/layouts/AppLayout';
import GoogleMapReact from 'google-map-react';
import { Popover } from 'antd';
const AnyReactComponent = ({ text }) => (
    <Popover
        content={
            <div>
                <div>{text}</div>
                <div>156 Đ. Phú Diễn</div>
                <div>Cầu Diễn</div>
                <div>Từ Liêm</div>
                <div>Hà Nội, Việt Nam</div>
            </div>
        }
        trigger="click"
    >
        <div className="w-[200px] flex flex-col items-center justify-center">
            <img
                className="h-[24px] w-[24px]"
                src="data:image/jpeg;base64,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"
                alt=""
            />
            <span className="font-bold drop-shadow-lg text-#ccc">CoCoShop</span>
        </div>
    </Popover>
);

function createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
        zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_CENTER,
            style: maps.ZoomControlStyle.SMALL,
        },
        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT,
        },
        mapTypeControl: true,
        language: 'vi',
        region: 'vi',
    };
}
const Map = () => {
    return (
        <AppLayout>
            <div style={{ height: '100%', width: '100%' }}>
                <GoogleMapReact
                    defaultCenter={{ lat: 21.045308, lng: 105.762728 }}
                    options={createMapOptions}
                    defaultZoom={17}
                >
                    <AnyReactComponent lat={21.045308} lng={105.762728} text="Shop thời trang CocoShop" />
                </GoogleMapReact>
            </div>
        </AppLayout>
    );
};

export default Map;
