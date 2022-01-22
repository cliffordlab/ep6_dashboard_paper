// Contains the configuration for environment variables

const prod = {
    url: {
     API_HOST: process.env.REACT_APP_API_HOST_PROD,
        }
    };
   
const dev = {
    url: {
     API_HOST: process.env.REACT_APP_API_HOST_DEV,
        }
   };

export const config = process.env.NODE_ENV === 'development' ? dev : prod