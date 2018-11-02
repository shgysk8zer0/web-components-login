export default class HTMLLogoutButtonElement extends HTMLButtonElement {
	constructor() {
		super();
		this.addEventListener('click', () => document.dispatchEvent(new CustomEvent('logout')));
		document.addEventListener('login', () => this.hidden = false);
		document.addEventListener('logout', () => this.hidden = true);
	}
}

customElements.define('logout-button', HTMLLogoutButtonElement, {extends: 'button'});
