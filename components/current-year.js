export default class HTMLCurrentYearElement extends HTMLTimeElement {
	connectedCallback() {
		const date = new Date();
		this.textContent = date.getFullYear();
		this.dateTime = date.toISOString();
	}
}

customElements.define('current-year', HTMLCurrentYearElement, {extends: time});
