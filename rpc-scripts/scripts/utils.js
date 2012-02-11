({
	message: function(pid, content) {
		sys.sendHtmlMessage(pid, content);
	},

	messageAll: function(content) {
		sys.sendHtmlMessageAll(content);
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
