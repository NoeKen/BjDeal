const isDevEnv = process.env.NODE_ENV === 'development';

export default {
  // App Details
  appName: 'Free MMS',

  // Build Configuration - eg. Debug or Release?
  isDevEnv,

  // Date Format
  dateFormat: 'Do MMM YYYY',

  // Google config
  googleConfig: '221712298341-0ec2q18bgf73e4ijffi72hm64sku0ma6.apps.googleusercontent.com',

  // API
  apiBaseUrl: isDevEnv
    ? 'https://api.bj-deal.com'
    : 'https://api.bj-deal.com',

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: isDevEnv ? 'UA-84284256-2' : 'UA-84284256-1',
};
