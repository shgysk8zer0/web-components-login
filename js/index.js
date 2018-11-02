import './std-js/deprefixer.js';
import './std-js/shims.js';
import {$, ready} from './std-js/functions.js';
import '../components/login-form/login-form.js';
import '../components/login-button.js';
import '../components/logout-button.js';

ready().then(async () => {
	$(document.documentElement).replaceClass('no-js', 'js');
});
