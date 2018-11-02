import {$} from '../../js/std-js/functions.js';
import Gravatar from '../../js/gravatar.js';

export default class HTMLLoginFormElement extends HTMLElement {
	constructor() {
		super();
		const template = document.getElementById('login-form-template').content;
		this.attachShadow({mode: 'open'}).appendChild(document.importNode(template, true));

		this.form.addEventListener('submit', event => {
			event.preventDefault();
			this.login(new FormData(event.target));
		});

		this.form.addEventListener('reset', () => {
			this.close();
		}, {
			passive: true,
		});
	}

	get action() {
		return new URL(this.getAttribute('action'), document.baseURI);
	}

	set action(url) {
		this.setAttribute('action', url);
	}

	get form() {
		return this.shadowRoot.querySelector('form');
	}

	get dialog() {
		return this.shadowRoot.querySelector('dialog');
	}

	showModal() {
		return this.dialog.showModal();
	}

	show() {
		return this.dialog.show();
	}

	close() {
		return this.dialog.close();
	}

	async login(creds) {
		if (creds instanceof FormData) {
			if (window.PasswordCredential instanceof Function) {
				const passCreds = new PasswordCredential({
					id: creds.get('email'),
					password: creds.get('password'),
					iconURL: new Gravatar(creds.get('email')),
				});
				console.log(passCreds);
				navigator.credentials.store(passCreds);
			}
		} else if(creds instanceof window.PasswordCredential) {
			console.log(creds);
		}
		document.dispatchEvent(new CustomEvent('login', {
			detail: creds,
		}));
		this.form.reset();
	}
}

$('link[name="LoginForm"]').import('template').then(frag => {
	document.body.append(frag);
	customElements.define('login-form', HTMLLoginFormElement);
});
