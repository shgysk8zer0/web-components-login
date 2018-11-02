import md5 from './std-js/md5.js';

export default class Gravatar extends URL {
	constructor(email, {
		size = 128,
		fallback = 'mm',
	} = {}) {
		const hash = md5(email);
		super(hash, 'https://secure.gravatar.com/avatar/');
		this.searchParams.set('s', size);
		this.searchParams.set('d', fallback);
	}
}
