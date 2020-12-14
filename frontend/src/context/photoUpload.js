import {createContext} from 'react';

const photoUploadContext = createContext({uploadPhotos: [], setUploadPhotos: () => {}})

export default photoUploadContext;