import Constants from 'expo-constants';
import { Platform } from 'react-native';
const ENV = {
  dev: {
    BACKEND_HOST: 'http://192.168.1.4:8080',
    GOOGLE_API_KEY: 'AIzaSyDRO_ti3bqVnOMvIQKjSHOj-b7dyx4QLug',
  },
  staging: {
    BACKEND_HOST: 'https://solemateapp.herokuapp.com/',
    GOOGLE_API_KEY: 'AIzaSyDRO_ti3bqVnOMvIQKjSHOj-b7dyx4QLug',
  },
  prod: {
    BACKEND_HOST: 'https://solemateapp.herokuapp.com/',
    GOOGLE_API_KEY: 'AIzaSyDRO_ti3bqVnOMvIQKjSHOj-b7dyx4QLug',
  },
};
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};
export default getEnvVars;