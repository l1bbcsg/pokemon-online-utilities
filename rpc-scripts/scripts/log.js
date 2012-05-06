function Log() {
	this.maxSize = 20;
	this.size = 0;
	this.messages = [];	 // Можно сделать {time: Date, username: '', message: ''}
};

Log.prototype.add = function(user, message) {
	var d = new Date();
	var timestamp = '('+Utils.padString(d.getHours(), 2)+':'+Utils.padString(d.getMinutes(), 2)+':'+Utils.padString(d.getSeconds(), 2)+')';
	var html = timestamp + ' <b>' + sys.name(user) + '</b>: ' + message;
	this.messages.push(html)
	if (this.size > this.maxSize)
		this.messages.shift()
	else
		this.size++;
}

Log.prototype.get = function(howMany) {
	if (howMany === undefined)
		howMany = this.maxSize;
	return this.messages.slice(-1 * Math.min(this.size, howMany));
}

Log.prototype.print = function(user, howMany) {
	if (!howMany)
		howMany = this.maxSize;
	var log = this.get(howMany);
	if (log.length) {
		Utils.message(user, 'Последние ' +log.length+ ' сообщений:');
		sys.sendHtmlMessage(user, '<i>' + log.join('<br>') + '</i>');
	}
	else
		Utils.message(user, 'Нет сообщений.');
};

(new Log())