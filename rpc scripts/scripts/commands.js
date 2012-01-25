//var access = {user: 0, moderator: 1, admin: 2, owner: 3}
var access = {user: 0, moderator: 0, admin: 0, owner: 0}

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

Commands.add('mute', access.moderator, 'Лишает пользователя голоса.', function(mod, targetName) {
	var target = sys.id(targetName);
	SESSION.users(target).muted = true;
	Utils.message(target, sys.name(mod) + ' лишил вас голоса.');
	Utils.message(mod, targetName + ' лишен голоса.');
});

Commands.add('unmute', access.moderator, 'Возвращает голос пользователю.', function(mod, targetName) {
	var target = sys.id(targetName);
	SESSION.users(target).muted = false;
	Utils.message(target, sys.name(mod) + ' + вернул вам голос.');
	Utils.message(mod, targetName + ' снова имеет голос.');
});

Commands.add('tempban', access.moderator, 'Банит пользователя на некоторое время.', function(mod, param) {
	var time   = {d: 0, h: 0, m: 0};
	var maxBan = {d: 7, h: 0, m: 0};	var maxminutes = 7 * 24 * 60;
	var defBan = {d: 0, h: 1, m: 0};
	
	var parsingFailed = false;
	
	var a = param.split(' ')
	var targetName = a[0];
	var target = sys.id(targetName);
	
	if (!target) {
		Utils.message(mod, 'Эээ, некого банить.');
		return;
	}

	if (a.length == 1)
		time = defBan;
	else {
		a = a.slice(1)
		for (var i in a) {
			var res = a[i].match(/^(\d+)([dhm])$/i);
			if (!res) {
				// throw ...
				parsingFailed = true;
				break;
			}
			else
				time[ res[2] ] = 1* res[1];
		}
	}
	
	if (parsingFailed) {
		Utils.message(mod, 'Неверно задан формат: ' + a[i]);
	}
	else {
		var minutes = time.m + time.h * 60 + time.d * 60 * 24;
		if (minutes > maxminutes) {
			minutes = maxminutes;
			time = maxBan;
		}
		TempBans[sys.ip(target)] = (new Date()).getTime() + minutes * 60;
		var prettytime = (time.d? time.d + ' дн. ' :'') + (time.h? time.h + ' час. ' :'') + (time.m? time.m + ' мин. ' :'');
		Utils.message(target, sys.name(mod) + ' забанил вас на ' + prettytime);
		Utils.message(mod, targetName + ' забанен на ' + prettytime);
		sys.kick(target);
	}
});

Commands.add('tempban', access.moderator, 'Разбанивает пользователя. (требуется ip)', function(mod, ip) {
	if (ip in TempBans) {
		delete TempBans[ip];
		Utils.message(mod, ip + ' Разбанен.');
	}
	else 
		Utils.message(mod, ip + ' не забанен. Забанить?');
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

// _todo_ updatescripts

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

Commands // eval will return this
