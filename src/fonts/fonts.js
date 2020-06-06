import { createGlobalStyle } from 'styled-components';

import OpenSansWoff from './Open Sans.woff';
import OpenSansWoff2 from './Open Sans.woff2';

import ProximaNovaWoff from './ProximaNova.woff';
import ProximaNovaWoff2 from './ProximaNova.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'Open Sans';
        src: local('Open Sans'), local('Open Sans'),
        url(${OpenSansWoff2}) format('woff2'),
        url(${OpenSansWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
        @font-face {
        font-family: 'Proxima Nova';
        src: local('Proxima Nova'), local('Proxima Nova'),
        url(${ProximaNovaWoff2}) format('woff2'),
        url(${ProximaNovaWoff}) format('woff');
        font-weight: 300;
        font-style: bold;
    }
`;