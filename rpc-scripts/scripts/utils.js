({
	message: function(pid, content) {
		sys.sendHtmlMessage(pid, '<timestamp/> <b style="color: '+sys.getColor(pid)+'">'+ sys.name(pid) +'</b>: '+ content);
	},

	messageAll: function(content) {
		sys.sendHtmlAll('<timestamp/> ' + content);
	},
	
	shutDown: function() {
		var s = '';
		for (ip in TempBans)
			if (TempBans[ip] < (new Date()).getTime())
				s += ip + '@' + TempBans[ip] + '\n';
		sys.writeToFile('tempbans.txt', s);
		//...
	},
})
