// Russian Pokemon Community PO scripts
// Версия 2.0.b; Рассчитано на PO 1.0.53
// Questions can be asked in pokeworld@pokecenter.ru conference


var ipinfo_api_key   = sys.getVal('api.txt', 'ipinfo');
var pastebin_api_key = sys.getVal('api.txt', 'pastebin');
var lastfm_api_key   = sys.getVal('api.txt', 'lastfm');

if(!sys.require) {
	//sys.require = sys['import']		// ugly hack, should be fixed after .53
	sys.require = function(filename) {
		return eval( sys.getFileContent('scripts/'+filename) );
	};
};

var Utils      = sys.require('utils.js');
var Commands   = sys.require('commands.js');
var Tierfilter = sys.require('tierfilter.js');
var User       = sys.require('user.js');

SESSION.registerUserFactory(User);

var TempBans = {};	// может течь если юзер не возвращается после того как забанен.
var storedBans = sys.getFileContent('tempbans.txt');
for (var entry in storedBans) {
	var a = entry.split('@');
	TempBans[a[0]] = 1 * a[1];
};


({
	beforeLogIn: function(id) {
		var ip = sys.ip(id);
		
		if (sys.auth(src) > 0 || ip== '127.0.0.1' )
			return;

		if (ip in TempBans) {
			var time = (new Date()).getTime();
			if (time > TempBans[ip])
				delete TempBans[ip];
			else {
				var prettytime = (time - TempBans[ip]) + ' секунд. Да-да, считайте сами.';	// _todo_ 
				Utils.message(id, 'Ваш бан ещё не истёк. Осталось ' + prettytime);
				sys.stopEvent();
				return;
			}
		};
		
		sys.webCall('http://api.ipinfodb.com/v3/ip-country/?key='+ipinfo_api_key +'&ip='+ip+'&format=json', function(resp) {
			var o = JSON.parse(resp);
			Utils.messageAll(sys.name(src)+' пришел к нам из '+ o.countryName.toLowerCase().replace(/^([a-z])|\s+([a-z])/g, function ($1) {return $1.toUpperCase()}));
			if (-1 == ["RU", "UA", "BY", "KZ", "EE", 'AZ'].indexOf(o.countryCode))
				Utils.message(src, 'You don\'t seem to speak Russian, we suggest you finding another server.\nЕсли вы вы считаете, что видите это по ошибке, сообщите администрации, желательно указав свою страну и ip адрес.');
		});
		
		if (sys.name(id).match(/^\d{11}$/)) {
			Utils.message(id, 'Судя по всему, вы используете версию Pokemon Online для Android. Имейте в виду что текущая версия этой программы не стабильна и была выпущена в Андроид Маркет по ошибке, не стоит задавать вопросы о ней здесь. Вы можете найти больше информации по адресу http://code.google.com/p/pokemon-online-android/ (англ.)');
			Utils.message(id, 'You seem to use Android version of Pokemon Online. Keep in mind that its current version is neither complete, nor stable and was released on Market by mistake (or rather by violating the rules). Do not ask any questions about it here, refer to http://code.google.com/p/pokemon-online-android/');
		};
	},
	
	afterChangeTeam: function(pid) {
		TierFilter.filter(pid, sys.tier(pid), false);
	},
	
	beforeChangeTier: function(pid, oldtier, newtier) {
		TierFilter.filter(pid, newtier, true);
	},
	
	beforeChatMessage: function(pid, msg) {
		if (SESSION.users(pid).muted) {
			sys.stopEvent();
			return;
		}
		
		if (msg[0] == '/' && msg.length > 1 && msg[1] != msg[0]) {
			sys.stopEvent();
			var a = msg.split(' ');
			var command = a[0].substr(1).toLowerCase();
			var param   = a.slice(1).join(' ');
			
			if (Commands.canAccess(pid, command))
				Commands.call(pid, command, param)
			else
				Utils.message(pid, 'Нет такой команды "' +command+ '".');
		}
	}
});
