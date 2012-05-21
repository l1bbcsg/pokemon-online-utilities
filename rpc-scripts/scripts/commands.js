var access = {user: 0, moderator: 1, admin: 2, owner: 3}
//var access = {user: 0, moderator: 0, admin: 0, owner: 0}	// debug only

var CommandsManager = function() {
	this.objects = []; // [function_id: {object}]
	this.names   = {};	// ['echo': function_id]
};

CommandsManager.prototype.exists = function(command) {
	return this.names.hasOwnProperty(command);
};
	
CommandsManager.prototype.call = function(user, command, param) {
	if (/*this.exists(command) && */this.canAccess(user, command))
		return (this.objects[this.names[command]].func)(user, param);
};
	
CommandsManager.prototype.canAccess = function(user, command) {
	return this.exists(command) && sys.auth(user) >= this.objects[this.names[command]].access;
};

CommandsManager.prototype.add = function(passed) {
	var id = this.objects.length;
	this.objects.push({
		access: passed.access,
		descr:  passed.descr,
		func:   passed.func,
	})
	for (var i = 0; i<passed.aliases.length; i++)
		this.names[passed.aliases[i]] = id;
};

Commands = new CommandsManager();

Commands.add({
	aliases: ['echo', 'эхо'],
	access : access.user,
	descr  : 'Simple echo test',
	func: function(user, param) {
		msg = sys.name(user) + ', эхо: ' + param;
		Utils.message(user, msg);
	},
});

Commands.add({
	aliases: ['eval'],
	access : access.owner, 
	descr  : 'Evaluates passed code',
	func   : function(user, code) {
		try {
			res = sys.eval(code);
		}
		catch (e) {
			Utils.message(user, "Ошибка: " + e);
		}
		if (res)
			Utils.message(user, 'Команда вернула: ' + JSON.stringify(res));
	}
});

Commands.add({
	aliases: ['mute', 'm', 'м'],
	access : access.moderator,
	descr  : 'Лишает пользователя голоса.',
	func   : function(mod, param) {
		var maxMute = 24 * 60 * 60 * 1000;	// день
		var defMute = 5 * 60 * 1000;	// 5 минут
		var time = undefined;
		
		if (!param)
			return;
		
		var timeString = undefined;
		var targetName = param;
		
		var match = param.match(/(?: [0-9]+[dhms])*$/i)
		if (match) {
			timeString = match[0];
			targetName = param.substr(0, param.length-timeString.length)
		}
		
		var target = sys.id(targetName);
		
		if (!target) {
			Utils.message(mod, 'Нет такого пользователя "' +targetName+ '".');
			return;
		}
		
		var ms = defMute;
		if (timeString)
			try {
				time = Utils.Time.parseString(timeString);
				ms = Utils.Time.milliseconds(time);
			}
			catch (e) {
				Utils.message(mod, e);
			}

		if (ms != parseInt(ms))
			return Utils.message(mod, 'Что-то пошло не так.')

		if (ms > maxMute)
			ms = maxMute;
		
		var ip = sys.ip(target);
		Mutes.add(ip, (new Date()).getTime() + ms);
		
		var prettytime = time? Utils.Time.pretty(time) : '5 минут';
		Utils.message(target, sys.name(mod) + ' лишил вас голоса на ' + prettytime);
		Utils.message(mod, targetName + '(' +ip+ ') лишён голоса на ' + prettytime);
		Utils.messageAll(sys.name(mod) + ' лишил ' + targetName + ' голоса на ' + prettytime);
	}
});

Commands.add({
	aliases: ['unmute', 'um'],
	access : access.moderator,
	descr  : 'Возвращает голос пользователю (требуется ip).', 
	func   : function(mod, ip) {
		Mutes.remove(ip);
		//Utils.message(target, sys.name(mod) + ' + вернул вам голос.');
		Utils.message(mod, ip + ' снова имеет голос.');
	}
});

Commands.add({
	aliases: ['tempban', 'b', 'б', 'бан'],
	access : access.moderator,
	descr  : 'Банит пользователя на некоторое время.', 
	func   : function(mod, param) {
		var maxBan = 07 * 24 * 60 * 60;	// неделя
		var defBan = 60 * 60 * 60;	// час
		var time = undefined;
		
		if (!param)
			return;
		
		var timeString = undefined;
		var targetName = param;
		
		var match = param.match(/(?: [0-9]+[dhms])*$/i)
		if (match) {
			timeString = match[0];
			targetName = param.substr(0, param.length-timeString.length)
		}
		
		var target = sys.id(targetName);
		
		if (!target) {
			Utils.message(mod, 'Нет такого пользователя "' +targetName+ '".');
			return;
		}
		
		var ms = defMute;
		if (timeString)
			try {
				time = Utils.Time.parseString(timeString);
				ms = Utils.Time.milliseconds(time);
			}
			catch (e) {
				Utils.message(mod, e);
			}

		if (ms != parseInt(ms))
			return Utils.message(mod, 'Что-то пошло не так.')

		if (ms > maxMute)
			ms = maxMute;
		
		var ip = sys.ip(target);
		TempBans.add(ip, (new Date()).getTime() + ms);
		
		var prettytime = time? Utils.Time.pretty(time) : 'час';
		Utils.message(target, sys.name(mod) + ' забанил вас на ' + prettytime);
		Utils.message(mod, targetName + '(' +ip+ ') забанен на ' + prettytime);
		Utils.messageAll(sys.name(mod) + ' забанил ' + targetName + ' голоса на ' + prettytime);
		sys.kick(target);
	}
});

Commands.add({
	aliases: ['untempban', 'ub'],
	access : access.moderator, 
	descr  : 'Разбанивает пользователя. (требуется ip)',
	func   : function(mod, ip) {
		TempBans.remove(ip)
		Utils.message(mod, ip + ' разбанен.');
	}
});

Commands.add({
	aliases: ['updatetiers'],
	access : access.owner,
	descr  : 'Обновляет tiers.xml с гитхаба.',
	func   : function(user, param) {
		//Utils.message(user, "Загружаю...");
		var url = "https://raw.github.com/l1bbcsg/pokemon-online-utilities/master/rpc-scripts/tiers.xml";
		
		Utils.message(user, "Загружаю tiers.xml с github");//.match(/\/\/(.*?)\//)[1]);
		try {
			sys.writeToFile('tiers.xml.bckp', sys.getFileContent('tiers.xml') );
			sys.webCall(url, "sys.writeToFile('tiers.xml', resp); sys.reloadTiers();");
		}
		catch(e) {
			Utils.message(user, "Ошибка: " + e);
			sys.writeToFile('tiers.xml', sys.getFileContent('tiers.xml.bckp') );
		}
		Utils.message(user, 'Обновление прошло успешно.');
	}
});

Commands.add({
	aliases: ['updatescripts'],
	access : access.owner,
	descr  : 'Обновляет все модули скриптов.',
	func   : function(user) {
		//Utils.message(user, "Загружаю...");
		var urlPrefix = "https://raw.github.com/l1bbcsg/pokemon-online-utilities/master/rpc-scripts/";
		//var urlPrefix = "file:///home/ilya/projects/pokemon-online-utilities/rpc-scripts/";
		
		var modules = ['DWFemales.txt', 'api.txt', 'utils.js', 'storage.js', 'log.js', 'commands.js', 'tierfilter.js', 'user.js'];
		var toUpdate = modules.length;
		
		for (var i=0; i<modules.length; i++) {
			var url  = urlPrefix + 'scripts/' + modules[i];
			var path = 'scripts/' + modules[i];
			
			(function(url, path){
				sys.writeToFile(path + '.bckp', sys.getFileContent(path) );
				
				sys.webCall(url, function(resp) {
					sys.writeToFile(path, resp);
					Utils.message(user, "Downloaded " + url)
					if (--toUpdate == 0)
						reload();
				});
			})(url, path)
		}
		
		function reload() {
			sys.writeToFile('scripts.js.bckp', sys.getFileContent('scripts.js') );
			sys.webCall(urlPrefix + 'scripts.js', function(resp) {
				if (!resp)
					return;
				try {
					sys.changeScript(resp);
					sys.writeToFile('scripts.js', resp);
				} catch (err) {
					Utils.message(user, "Ошибка: " + err);
					print(err);
					
					for (var i=0; i<modules.length; i++) {
						var path = 'scripts/' + modules[i];
						sys.writeToFile(path, sys.getFileContent(path + '.bckp') );
					}
					
					sys.changeScript(sys.getFileContent('scripts.js.bckp'));
					sys.writeToFile('scripts.js', sys.getFileContent('scripts.js.bckp') );
				}
				Utils.message(user, 'Обновление прошло успешно.');
				Utils.messageAll('Скрипты обновлены.');
			});
		}
	}
});

Commands.add({
	aliases: ['commands', 'help', 'команды', 'помощь'],
	access : access.user,
	descr  : 'Показывает все доступные команды.', 
	func   : function(user, param) {	// вся "инкапсуляция" к чертям (
		var msg = '<dl>';
		for (var i=0; i<Commands.objects.length; i++) {
			// _todo_ 
			var aliases = [];
			for (name in Commands.names)
				if (Commands.names[name] == i)
					aliases.push(name);
			msg += '<dt>' + '/' + aliases.join(', ') + '</dt>';
			msg += '<dd>' + Commands.objects[i].descr + '</dd>';
		}
		msg += '</dl>';
		Utils.message(user, msg);
	}
});

Commands.add({
	aliases: ['topic', 'тема'],
	access : access.moderator,
	descr  : 'Изменяет тему в заголовке сервера.',
	func   : function(user, param) {
		var separator = '<!--separator-->';
		var current =  sys.getAnnouncement().split(separator);
		
		if (!param)
			Utils.message(user, 'Текущая тема: ' + current[1].replace(/</g, '&lt;').replace(/>/g, '&gt;'));
		else {
			sys.changeAnnouncement(current[0] + separator + param);
			Utils.messageAll(sys.name(user) + ' изменил тему.');
		}
	}
});

Commands.add({
	aliases: ['me', 'я'],
	access : access.user,
	descr  : 'Сообщение в третьем лице.',
	func   : function(user, param) {
		Utils.messageAll('<b style="color: ' +sys.getColor(user)+ '">***' + sys.name(user) + '</b> ' + param);
	}
});

Commands.add({
	aliases: ['ghosts'],
	access : access.user,
	descr  : 'Выкидывает пользователей с тем же IP. Если передан параметр, выкинет только польователя с этим ником.',
	func   : function(user, param) {
		var players = sys.playerIds();
		var ip = sys.ip(user);
		
		if (param === undefined)
			for (var i = players.length; i --> 0;)
				if (sys.id(players[i]) != user && sys.ip(players[i]) == ip) {
					Utils.message(user, sys.name(players[i]) + ' выкинут.');
					sys.kick(players[i])
				}
		else
			if (sys.ip(param) == ip)
				sys.kick(sys.id(param));
	}
});


Commands.add({
	aliases: ['whois', 'ктобля'],
	access : access.user,
	descr  : 'Информация о пользователе.', 
	func   : function(user, param) {
		var id = sys.id(param);
		var ip = sys.ip(param);
		
		if (id === undefined) {
			Utils.message(user, 'Нет такого пользователя, "'+param+'".');
			return;
		}
		
		var s = '<table><tr><th><img src="avatar:' +sys.avatar(id)+ '"/></th><td>';
		
		s += 'Пользователь ' + param;
		
		if (sys.dbRegistered(id))
			s += ' (зарегистирован)';
		s += '<br>';
		
		s += 'Страна: ' + (SESSION.users(id).country || 'Неизвестно') + '<br>';
		
		if (sys.auth(user) > 0)
			s += 'IP: ' + sys.ip(id) + ', id: ' +id+ '<br>';
		
		var aliases = sys.aliases(ip)
		if (aliases.length)
			s += 'Также известен как: ' + aliases.join(' ');
			
		s += '</td></tr></table>';
		
		Utils.message(user, s);
	}
});

Commands.add({
	aliases: ['log', 'лог'],
	access : access.user,
	descr  : 'Лог последних сообщений.',
	func   : function(user, param) {
		Log.print(user, parseInt(param));
	}
});

Commands.add({
	aliases: ['kick', 'кик', 'k', 'к', 'идинахуй'],
	access : access.moderator,
	descr  : 'Выкидывает пользователя.', 
	func   : function(mod, user) {
		var id = sys.id(user);

		if (id === undefined) {
			Utils.message(mod, 'Нет такого пользователя, "'+user+'".');
			return;
		}
		
		Utils.message(user, sys.name(mod) + ' выкинул вас.');
		sys.kick(id);
		Utils.message(mod,  user + ' выкинут.');
	}
});

Commands // eval will return this
