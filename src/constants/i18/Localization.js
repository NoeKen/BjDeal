// ES6 module syntax
import LocalizedStrings from 'react-native-localization';
import en from './en.json'
import fr from './fr.json'

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

let Localization = new LocalizedStrings({
 en:{...en},
 fr:{...fr},
});

export default Localization;