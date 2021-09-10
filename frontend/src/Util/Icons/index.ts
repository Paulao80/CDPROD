import leaflet from 'leaflet';
import icon from '../../Assets/images/location.svg';

export const iconLocation = new leaflet.Icon({
    iconUrl: icon,
    iconSize: [40,40],
    iconAnchor: [20,40]
});