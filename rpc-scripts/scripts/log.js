function Log() {
	this.maxSize = 20;
	this.size = 0;
	this.messages = []
};

Log.prototype.add = function(user, message) {
	var d = new Date()
	var timestamp = '('+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+')';
	var html = timestamp + ' <b style="padding-left: 20px; color: #'+sys.getColor(user)+';">' + sys.name(user) + '</b>: ' + message;
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
}

//sys.sendHtmlAll(JSON.stringify(this));
//sys.sendHtmlAll('hello from log');	// что это блять? почему без этого падает блять?
sys.ability(12);
(new Log())