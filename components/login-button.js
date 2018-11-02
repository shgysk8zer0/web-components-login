export default class HTMLLoginButtonElement extends HTMLButtonElement {
	constructor() {
		super();
		this.addEventListener('click', async () => {
			if (window.PasswordCredential instanceof Function) {
				const creds = await navigator.credentials.get({
					password: true,
					mediation: 'required',
				});
				if (creds instanceof window.PasswordCredential) {
					this.form.login(creds);
				} else {
					this.form.showModal();
				}
			} else {
				this.form.showModal();
			}
		});
		document.addEventListener('login', () => this.hidden = true);
		document.addEventListener('logout', () => this.hidden = false);
	}

	get form() {
		return document.querySelector(this.getAttribute('form'));
	}

	set form(selector) {
		this.setAttribute('form', selector);
	}
}

customElements.define('login-button', HTMLLoginButtonElement, {extends: 'button'});
