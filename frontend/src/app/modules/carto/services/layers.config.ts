import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import * as proj from 'ol/proj';
import * as extent from 'ol/extent';

const attributionIGN = {html: '<a href="http://www.ign.fr/" target="_blank"><img src="/carte/bundles/visuconsultation/carto/images/logos/wh80px/ign.png"></a>'
+ '<a href="http://www.geoportail.fr/" target="_blank"><img src="http://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a>'
+ '<a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Conditions</a>'
};

const epsg3857 = proj.get('EPSG:3857');
const keyIGN = 'v0bxp1xur57ztiai9djszgjw';

export const layers = [
	new LayerGroup({
			title: 'Fonds de plan',
			displayInLayerSwitcher: true,
			layers: [
                new TileLayer({
                    title: 'OpenTopoMap - cartes',
                    visible: true,
                    'order': 0,
                    'displayInLayerSwitcher' : true,
                    opacity: 0.4,
                    type: 'base',
                    source: new XYZ({
                        url: '//{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    })
                }),
                new TileLayer({
                    opacity: 1,
                    title: 'IGN - vue aérienne',
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    'order': 1,
                    extent: epsg3857.getExtent(),
                    source: new WMTS({
                        attributions: [attributionIGN],
                        url: `http://wxs.ign.fr/${keyIGN}/geoportail/wmts`,
                        layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
                        matrixSet: 'PM',
                        format: 'image/jpeg',
                        name: "IGN - cartes",
                        style: "normal",
                        numZoomLevels: 19,
                        group : 'IGN',
                        territory:'FXX',
                        projection: epsg3857,
                        tileGrid: new WMTSTileGrid({
                            origin: extent.getTopLeft(epsg3857.getExtent()),
                            resolutions: [156543.03392804097,78271.51696402048,39135.75848201024,19567.87924100512,9783.93962050256,4891.96981025128,2445.98490512564,1222.99245256282,611.49622628141,305.748113140705,152.8740565703525,76.43702828517625,38.21851414258813,19.109257071294063,9.554628535647032,4.777314267823516,2.388657133911758,1.194328566955879,0.5971642834779395,0.29858214173896974,0.14929107086948487,0.07464553543474244],
                            matrixIds: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
                        })
                    })
                }),
                new TileLayer({
                    opacity: 0.3,
                    title: 'IGN - cartes',
                    'order': 2,
                    visible: false,
                    'displayInLayerSwitcher' : true,
                    extent: epsg3857.getExtent(),
                    source: new WMTS({
                        attributions: [attributionIGN],
                        url: `http://wxs.ign.fr/${keyIGN}/geoportail/wmts`,
                        layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
                        matrixSet: 'PM',
                        format: 'image/jpeg',
                        name: "IGN - cartes",
                        style: "normal",
                        numZoomLevels: 19,
                        group : 'IGN',
                        territory:'FXX',
                        projection: epsg3857,
                        tileGrid: new WMTSTileGrid({
                            origin: extent.getTopLeft(epsg3857.getExtent()),
                            resolutions: [156543.03392804097,78271.51696402048,39135.75848201024,19567.87924100512,9783.93962050256,4891.96981025128,2445.98490512564,1222.99245256282,611.49622628141,305.748113140705,152.8740565703525,76.43702828517625,38.21851414258813,19.109257071294063,9.554628535647032,4.777314267823516,2.388657133911758,1.194328566955879,0.5971642834779395,0.29858214173896974,0.14929107086948487,0.07464553543474244],
                            matrixIds: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
                        })
                    })
                })
            ]
	})
];