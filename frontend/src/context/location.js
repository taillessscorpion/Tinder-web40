import {createContext} from 'react';

const locationContext = createContext({locationPermission: null, setLocationPermission: () => {}})

export default locationContext;