function User(id) {
	this.id = id;
	this.muted = false;
}

User.prototype.foo = 'bar';

User // for eval
