// Russian Pokemon Community PO scripts
// Версия 2.1.0; Рассчитано на PO 1.0.53
// Questions can be asked in pokeworld@conference.pokecenter.ru 

SESSION.identifyScriptAs('RPCv2.1');

var ipinfo_api_key   = sys.getVal('api.txt', 'ipinfo');
//var pastebin_api_key = sys.getVal('api.txt', 'pastebin');
//var lastfm_api_key   = sys.getVal('api.txt', 'lastfm');

if(!sys.require) {
	sys.require = function(filename) {
		return eval( sys.getFileContent('scripts/'+filename) );
	};
};

var Utils      = sys.require('utils.js');
var Commands   = sys.require('commands.js');
var TierFilter = sys.require('tierfilter.js');
var User       = sys.require('user.js');
var Storage    = sys.require('storage.js');

SESSION.registerUserFactory(User);

var TempBans = new Storage('tempbans.txt');
var Mutes    = new Storage('mutes.txt');


({
	beforeLogIn: function(id) {
		var ip = sys.ip(id);
		
		if (sys.auth(id) > 0 || ip== '127.0.0.1' )
			return;

		var ban = TempBans.get(ip);
		if (ban)
			if ((new Date()).getTime() > ban)
				TempBans.remove(ip);
			else {
				Utils.message(id, 'Ваш бан ещё не истёк. Осталось ' + Utils.Time.pretty(Utils.Time.parseEpoch(ban)));
				sys.stopEvent();
				return;
			}
	
		sys.webCall('http://api.ipinfodb.com/v3/ip-country/?key='+ipinfo_api_key +'&ip='+ip+'&format=json', function(resp) {
			if (!sys.name(id))	// in case they left already
				return;
			var o = JSON.parse(resp);
			var country = o.countryName.toLowerCase().replace(/^([a-z])|\s+([a-z])/g, function ($1) {return $1.toUpperCase()})
			Utils.messageAll(sys.name(id)+' пришел к нам из '+ country);
			SESSION.users(id).country = country;
			if (-1 == ["RU", "UA", "BY", "KZ", "EE", 'AZ'].indexOf(o.countryCode))
				Utils.message(id, 'You don\'t seem to speak Russian, we suggest you finding another server.\nЕсли вы вы считаете, что видите это по ошибке, сообщите администрации, желательно указав свою страну и ip адрес.');
		});
		
		if (sys.name(id).match(/^\d{11}$/)) {
			Utils.message(id, 'Судя по всему, вы используете версию Pokemon Online для Android. Имейте в виду что текущая версия этой программы не стабильна и была выпущена в Андроид Маркет по ошибке, не стоит задавать вопросы о ней здесь. Вы можете найти больше информации по адресу http://code.google.com/p/pokemon-online-android/ (англ.)');
			Utils.message(id, 'You seem to use Android version of Pokemon Online. Keep in mind that its current version is neither complete, nor stable and was released on Market by mistake (or rather by violating the rules). Do not ask any questions about it here, refer to http://code.google.com/p/pokemon-online-android/');
		};
	},
	
	afterLogIn: function(pid) {
		TierFilter.filter(pid, sys.tier(pid), false);
	},
	
	afterChangeTeam: function(pid) {
		TierFilter.filter(pid, sys.tier(pid), false);
	},
	
	beforeChangeTier: function(pid, oldtier, newtier) {
		TierFilter.filter(pid, newtier, true);
	},
	
	beforeChatMessage: function(pid, msg) {
		var ip = sys.ip(pid);
		var mute = Mutes.get(ip);
		Utils.messageAll("mute: " + mute)
		if (mute)
			if ((new Date()).getTime() > mute) {
				Utils.messageAll("уже истёк")
				Mutes.remove(ip);
			}
			else {
				Utils.messageAll("ещё не истёк")
				Utils.message(pid, 'Вы лишены голоса. Осталось ' + Utils.Time.pretty(Utils.Time.parseEpoch(mute)));
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
	},
	
	serverShutDown: function() {
		Mutes.dump();
		TempBans.dump();
	},
});
