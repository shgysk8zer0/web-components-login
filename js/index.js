import './std-js/deprefixer.js';
import './std-js/shims.js';
import '../components/login-form/login-form.js';
import '../components/login-button.js';
import '../components/logout-button.js';
import '../components/gravatar-img.js';

document.documentElement.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
document.documentElement.classList.replace('no-js', 'js');
