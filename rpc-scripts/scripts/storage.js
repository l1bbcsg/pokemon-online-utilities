function Storage(filename) {
	this.filename = filename;
	this.elements = {};
	this.separator = '=';
	this.empty = "###########";
	
	this.init(filename);
};

Storage.prototype.init = function(filename) {
	var data = sys.getFileContent(filename)
	if (data === undefined) 
		throw "Can't access file " + filename;
	
	this.elements = {}
	
	var arr = data.split('\n')
	for (var i = 0; i<arr.length; i++) {
		var pair = arr[i].split(this.separator)
		/*if (pair[1] == this.empty)
			continue;*/
		this.elements[pair[0]] = pair[1];
	}
	return true;
}

Storage.prototype.add = function(key, value) {
	key   = '' + key;
	value = '' + value;
	if (-1 != key.indexOf(this.separator) 
	 || -1 != value.indexOf(this.separator)
	 || -1 != key.indexOf('\n')
	 || -1 != value.indexOf('\n'))
		return false;
	//if (this.elements.hasOwnProperty(key)) {	//	если уже есть этот ключ, не помешало бы файл почистить
	sys.appendToFile(this.filename, '\n' + key + this.separator + value);
	this.elements[key] = value;
	return true;
}

Storage.prototype.get = function(key) {
	return this.elements[key];
}

Storage.prototype.remove = function(key) {	// _todo_
	//sys.appendToFile(this.filename, '\n' + key + this.separator + this.empty) 
	delete(this.elements[key]);
	this.dump()
}

Storage.prototype.dump = function() {
	var s = '';
	for (var key in this.elements)
		s += key + this.separator + this.elements[key] + '\n';
	sys.writeToFile(this.filename, s);
}

Storage
