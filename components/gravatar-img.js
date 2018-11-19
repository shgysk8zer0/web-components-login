import GravatarURL from '../js/std-js/GravatarURL.js';

function update(img)  {
	const {hash, size, fallback, rating, force, sizeSet} = img;
	if (sizeSet.length !== 0) {
		img.srcset = sizeSet.map(size => {
			const src = new GravatarURL(hash, {size, fallback, rating, force});
			return `${src} ${size}w`;
		}).join(', ');
	}
	img.src = new GravatarURL(hash, {size, fallback, rating, force});
}

export default class HTMLGravatarImageElement extends HTMLImageElement {
	constructor(...args) {
		super(...args);
		if (this.email !== null) {
			this.email = this.getAttribute('email');
			this.removeAttribute('email');
		}
	}

	static get observedAttributes() {
		return [
			'email',
			'hash',
			'size',
			'fallback',
			'force',
		];
	}

	connectedCallback() {
		update(this);
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (this.isConnected && oldVal !== newVal) {
			switch(name) {
			case 'email':
				if (newVal !== null) {
					this.email = newVal;
				}
				break;
			default:
				update(this);
			}
		}
	}

	get email() {
		return this.getAttribute('email');
	}

	set email(email) {
		this.hash = GravatarURL.getHash(email);
	}

	get hash() {
		return this.getAttribute('hash');
	}

	set hash(hash) {
		this.setAttribute('hash', hash);
	}

	get size() {
		return parseInt(this.getAttribute('size')) || 80;
	}

	set size(size) {
		this.setAttribute('size', size);
	}

	get sizeSet() {
		const sizes = this.getAttribute('size-set')
			.split(' ')
			.map(size => parseInt(size))
			.filter(size => ! Number.isNaN(size));

		if (! sizes.includes(this.size)) {
			sizes.push(this.size);
		}

		return sizes.sort((a, b) => a < b ? 1 : -1);
	}

	set sizeSet(sizes) {
		if (Array.isArray(sizes)) {
			this.setAttribute('size-set', sizes.join(' '));
		}
	}

	get fallback() {
		return this.getAttribute('fallback') || 'mp';
	}

	set fallback(fallback) {
		this.setAttribute('fallback', fallback);
	}

	get rating() {
		return this.getAttribute('rating');
	}

	set rating(rating) {
		this.setAttribute('rating', rating);
	}

	get force() {
		return this.hasAttribute('force');
	}

	set force(force) {
		this.toggleAttribute('force', force);
	}
}

customElements.define('gravatar-img', HTMLGravatarImageElement, {extends: 'img'});
