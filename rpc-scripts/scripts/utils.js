var Utils = {
	message: function(pid, content) {
		sys.sendHtmlMessage(pid, '<timestamp/> <b style="color: '+sys.getColor(pid)+'">'+ sys.name(pid) +'</b>: '+ content);
	},

	messageAll: function(content) {
		sys.sendHtmlAll('<timestamp/> ' + content);
	},
	/*
	shutDown: function() {
		var s = '';
		for (ip in TempBans)
			if (TempBans[ip] < (new Date()).getTime())
				s += ip + '@' + TempBans[ip] + '\n';
		sys.writeToFile('tempbans.txt', s);
		//...
	},*/
	
	Time: {
		parseString: function(string) {
			var time = {d: 0, h: 0, m: 0, s: 0};
			
			var a = string.trim().split(' ');
			
			for (var i in a) {
				var res = a[i].match(/^(\d+)([dhms])$/i);
				if (!res)
					throw "Неверный формат: " + a[i];
				else
					time[ res[2] ] = 1* res[1];
			}
			return time;
		},
		
		parseEpoch: function(ms) {
			ms -= (new Date()).getTime();
			ms /= 1000;
			
			var o = {
				s: Math.floor(ms % 60),
				m: Math.floor((ms / 60) % 60),
				h: Math.floor((ms / 60 / 60) % 60),
				d: Math.floor((ms / 60 / 60 / 60) % 24),
			}
			return o;
		},
		
		milliseconds: function(o) {
			return (o.s
			+ o.m * 60 
			+ o.h * 60 * 60 
			+ o.d * 24 * 60 * 60 
			) * 1000;
		},
		
		pretty: function(o) {
			return (o.d? o.d + ' дн. ' :'') + (o.h? o.h + ' час. ' :'') + (o.m? o.m + ' мин. ' :'') + (o.s? o.s + ' сек. ' :'');
		},
	},
	
	anonymous: function(user) {
		var today = new Date();
		if (today.getMonth() == 4-1 && today.getDate() == 1) {
			sys.changeName(user, 'Anonymous');
			sys.changeAvatar(user, 0);
			sys.changeInfo(user, 'We are Anonymous, we are Legion...');
		}
	},
}

var names = sys.getFileContent('scripts/DWFemales.txt').split('\n');

Utils.DW = {
	female:      names.map(sys.pokeNum),
	femaleNames: names,
};

Utils