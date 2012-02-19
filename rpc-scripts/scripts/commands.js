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

// updatescripts(component, url)

Commands.add('echo', access.user, 'Simple echo test', function(user, param) {
	msg = sys.name(user) + ', эхо: ' + param;
	Utils.message(user, msg);
});

Commands.add('eval', access.owner, 'Evaluates passed code', function(user, code) {
	res = sys.eval(code);
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
	if (ms > maxMute)
		ms = maxMute;
	
	var ip = sys.ip(target);
	Mutes.add(ip, (new Date()).getTime() + ms);
	
	var prettytime = Utils.Time.pretty(time);
	Utils.message(target, sys.name(mod) + ' лишил вас голоса на ' + prettytime);
	Utils.message(mod, targetName + '(' +ip+ ') лишён голоса на ' + prettytime);
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
	sys.kick(target);
});

Commands.add('untempban', access.moderator, 'Разбанивает пользователя. (требуется ip)', function(mod, ip) {
	TempBans.remove(ip)
	Utils.message(mod, ip + ' разбанен.');
});

Commands.add('updatetiers', access.owner, 'Обновляет tiers.xml с указанного урла.', function(user, param) {
	//Utils.message(user, "Загружаю...");
	var updateURL = "http://kalashnikov.pokecenter.ru/res/po/tiers.xml";
	if (param !== undefined && param.substring(0,7) == 'http://')
		updateURL = param;
	
	Utils.message(user, "Загружаю tiers.xml с " + updateURL.match(/\/\/(.*?)\//)[1]);
	sys.writeToFile('.bckp.tiers.xml', sys.getFileContent('tiers.xml') );
	sys.webCall(updateURL, "sys.writeToFile('tiers.xml', resp); sys.reloadTiers();");
	return;
});

Commands.add('updatescripts', access.owner, 'Обновляет все модули скриптов.', function(user) {
	//Utils.message(user, "Загружаю...");
	//var urlPrefix = "http://raw.github.com/l1bbcsg/pokemon-online-utilities/master/rpc-scripts/";
	var urlPrefix = "file:///home/ilya/projects/pokemon-online-utilities/rpc-scripts/";
	
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
				
				sys.changeScript(sys.getFileContent('scripts.js.bckp'));
				sys.writeToFile('scripts.js', sys.getFileContent('scripts.js.bckp') );
			}
		});
	}
});

Commands.add('commands', access.user, 'Показывает все доступные команды.', function(user, param) {	// вся "инкапсуляция" к чертям (
	var msg = '<dl>';	// _todo_ prettier html
	for (var command in Commands.commands)
		if (Commands.canAccess(user, command)) {
			msg += '<dt>' + command + '</dt>';
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

Commands // eval will return this
