var access = {user: 0, moderator: 1, admin: 2, owner: 3}
//var access = {user: 0, moderator: 0, admin: 0, owner: 0}	// debug only

var Commands = {
	commands: {},	// 'name': {descr: '', accessLevel: , func: }
	
	exists: function(command) {
		return Commands.commands.hasOwnProperty(command);
	},
	
	call: function(user, command, param) {
		if (/*Commands.exists(command) && */Commands.canAccess(user, command))
			return (Commands.commands[command].func)(user, param);
	},
	
	canAccess: function(user, command) {
		return Commands.exists(command) && sys.auth(user) >= Commands.commands[command].accessLevel;
	},
	
	add: function(name, accessLevel, descr, func) {
		Commands.commands[name] = {
			descr: descr,
			accessLevel: accessLevel,
			func: func,
		};
	},
}

Commands.add('echo', access.user, 'Simple echo test', function(user, param) {
	msg = sys.name(user) + ', эхо: ' + param;
	Utils.message(user, msg);
});

Commands.add('eval', access.owner, 'Evaluates passed code', function(user, code) {
	try {
		res = sys.eval(code);
	}
	catch (e) {
		Utils.message(user, "Ошибка: " + e);
	}
	if (res)
		Utils.message(user, 'Команда вернула: ' + res);
});

Commands.add('mute', access.moderator, 'Лишает пользователя голоса.', function(mod, param) {
	var maxMute = 24 * 60 * 60 * 1000;	// день
	var defMute = 60 * 60 * 1000;	// минута
	var time = defMute;
	
	var a = param.split(' ');
	var targetName = a[0];
	var target = sys.id(targetName);
	
	if (!target) {
		Utils.message(mod, 'Нет такого пользователя "' +targetName+ '".');
		return;
	}
	
	if (a.length>1)
		try {
			time = Utils.Time.parseString(a.slice(1).join(' '));
		}
		catch (e) {
			Utils.message(mod, e);
		}
	
	var ms = Utils.Time.milliseconds(time);
	if (ms != int(ms))
		return Utils.message(mod, 'Что-то пошло не так.')

	if (ms > maxMute)
		ms = maxMute;
	
	var ip = sys.ip(target);
	Mutes.add(ip, (new Date()).getTime() + ms);
	
	var prettytime = Utils.Time.pretty(time);
	Utils.message(target, sys.name(mod) + ' лишил вас голоса на ' + prettytime);
	Utils.message(mod, targetName + '(' +ip+ ') лишён голоса на ' + prettytime);
	Utils.messageAll(sys.name(mod) + ' лишил ' + targetName + ' голоса на ' + prettytime);
});

Commands.add('unmute', access.moderator, 'Возвращает голос пользователю (требуется ip).', function(mod, ip) {
	Mutes.remove(ip);
	Utils.message(target, sys.name(mod) + ' + вернул вам голос.');
	Utils.message(mod, ip + ' снова имеет голос.');
});

Commands.add('tempban', access.moderator, 'Банит пользователя на некоторое время.', function(mod, param) {
	var maxBan = 07 * 24 * 60 * 60;	// неделя
	var defBan = 60 * 60 * 60;	// час
	var time   = defBan;
	
	var a = param.split(' ');
	var targetName = a[0];
	var target = sys.id(targetName);
	
	if (!target) {
		Utils.message(mod, 'Эээ, некого банить.');
		return;
	}
	
	if (a.length>1)
		try {
			time = Utils.Time.parseString(a.slice(1).join(' '));
		}
		catch (e) {
			Utils.message(mod, e);
		}
	
	
	var ms = Utils.Time.milliseconds(time);
	if (ms > maxBan)
		ms = maxBan;
	
	var ip = sys.ip(target);
	TempBans.add(ip, (new Date()).getTime() + ms);
	
	var prettytime = Utils.Time.pretty(time);
	Utils.message(target, sys.name(mod) + ' забанил вас на ' + prettytime);
	Utils.message(mod, targetName + '(' +ip+ ') забанен на ' + prettytime);
	Utils.messageAll(sys.name(mod) + ' забанил ' + targetName + ' голоса на ' + prettytime);
	sys.kick(target);
});

Commands.add('untempban', access.moderator, 'Разбанивает пользователя. (требуется ip)', function(mod, ip) {
	TempBans.remove(ip)
	Utils.message(mod, ip + ' разбанен.');
});

Commands.add('updatetiers', access.owner, 'Обновляет tiers.xml с указанного урла.', function(user, param) {
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
});

Commands.add('updatescripts', access.owner, 'Обновляет все модули скриптов.', function(user) {
	//Utils.message(user, "Загружаю...");
	var urlPrefix = "https://raw.github.com/l1bbcsg/pokemon-online-utilities/master/rpc-scripts/";
	//var urlPrefix = "file:///home/ilya/projects/pokemon-online-utilities/rpc-scripts/";
	
	var modules = ['utils', 'storage', 'commands', 'tierfilter', 'user'];
	var toUpdate = modules.length;
	
	for (var i=0; i<modules.length; i++) {
		var url  = urlPrefix + 'scripts/' + modules[i] + '.js';
		var path = 'scripts/' + modules[i] + '.js';
		
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
					var path = 'scripts/' + modules[i] + '.js';
					sys.writeToFile(path, sys.getFileContent(path + '.bckp') );
				}
				
				sys.changeScript(sys.getFileContent('scripts.js.bckp'));
				sys.writeToFile('scripts.js', sys.getFileContent('scripts.js.bckp') );
			}
			Utils.message(user, 'Обновление прошло успешно.');
			Utils.messageAll('Скрипты обновлены.');
		});
	}
});

Commands.add('commands', access.user, 'Показывает все доступные команды.', function(user, param) {	// вся "инкапсуляция" к чертям (
	var msg = '<dl>';	// _todo_ prettier html
	for (var command in Commands.commands)
		if (Commands.canAccess(user, command)) {
			msg += '<dt>/' + command + '</dt>';
			msg += '<dd>' + Commands.commands[command].descr + '</dd>';
		}
	msg += '</dl>';
	Utils.message(user, msg);
});

Commands.add('topic', access.moderator, 'Изменяет тему в заголовке сервера.', function(user, param) {
	var separator = '<!--separator-->';
	var header =  sys.getAnnouncement().split(separator)[0];
	sys.changeAnnouncement(header + separator + param);
	Utils.messageAll(sys.name(user) + ' изменил тему.');
});

Commands.add('me', access.user, 'Сообщение в третьем лице.', function(user, param) {
	Utils.messageAll('<b style="color: ' +sys.getColor(user)+ '">***' + sys.name(user) + '</b> ' + param);
});

Commands.add('ghosts', access.user, 'Выкидывает пользователей с тем же IP. Если передан параметр, выкинет только польователя с этим ником.', function(user, param) {
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
});


Commands.add('whois', access.user, 'Информация о пользователе.', function(user, param) {
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
});

Commands // eval will return this
