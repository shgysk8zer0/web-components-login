import {$, notify} from '../../js/std-js/functions.js';

export default class HTMLLoginFormElement extends HTMLElement {
	constructor() {
		super();
		const template = document.getElementById('login-form-template').content;
		this.attachShadow({mode: 'open'}).appendChild(document.importNode(template, true));
		$('.dialog-container', this.shadowRoot).toggleClass('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);

		this.form.addEventListener('submit', event => {
			event.preventDefault();
			this.login(new FormData(event.target));
		});

		this.form.addEventListener('reset', () => {
			this.close();
		}, {
			passive: true,
		});

		$('input[type="email"]', this.form).change(event => {
			this.gravatar.email = event.target.value;
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

	get gravatar() {
		return this.dialog.querySelector('img[is="gravatar-img"]');
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
			const data = Object.fromEntries(creds.entries());
			notify('Welcome back', {
				body: data.email,
				icon: this.gravatar.src,
			});

			if (window.PasswordCredential instanceof Function) {
				const passCreds = new PasswordCredential({
					id: data.email,
					password: data.password,
					iconURL: this.gravatar.src,
				});
				navigator.credentials.store(passCreds);
			}
		} else if(creds instanceof window.PasswordCredential) {
			notify('Welcome back', {
				body: creds.id,
				icon: creds.iconURL,
			});
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
