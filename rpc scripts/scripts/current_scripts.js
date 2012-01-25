// 1.0.23
// Russian Pokemon Community PO scripts
// Based on official Pokemon Online scripts, modified to fit own needs
// Don't touch anything here if you don't know what you do.
var noPlayer = '*';

var ipinfo_api_key   = sys.getVal('api.txt', 'ipinfo');
var pastebin_api_key = sys.getVal('api.txt', 'pastebin');
var lastfm_api_key   = sys.getVal('api.txt', 'lastfm');
/* stolen from here: http://snippets.dzone.com/posts/show/849 */
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/* stolen from here: http://stackoverflow.com/questions/1026069/capitalize-first-letter-of-string-in-javascript */
function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isNonNegative(n) {
    return typeof n == 'number' && !isNaN(n) && n >= 0;
}
/*	wtf is this?
(function() {
	var strTable = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

        var table = new Array();
        for (var i = 0; i < strTable.length; ++i) {
          table[i] = parseInt("0x" + strTable[i]);
        }


	crc32 = function(str, crc ) {
		if( crc === undefined ) crc = 0;
		var n = 0; //a number between 0 and 255
		var x = 0; //an hex number

		crc = crc ^ (-1);
		for( var i = 0, iTop = str.length; i < iTop; i++ ) {
			n = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
			x = "0x" + table[n];
			crc = ( crc >>> 8 ) ^ x;
		}
		return crc ^ (-1);
	};
})();*/

/*
 * Prototype: MemoryHash
 * Functions:
 *  - add(key,value)
 *  - get(key)
 *  - remove(key)
 *  - removeIf(callBack)
 *  - clear()
 *  - save()
 *  - escapeValue(val)
 *
 *  All keys and values must be strings.s
 */
function MemoryHash(filename)
{
    this.hash = {};
    this.fname = filename;

    var contents = sys.getFileContent(this.fname);
    if (contents !== undefined) {
        var lines = contents.split("\n");
        for(var i = 0; i < lines.length; ++i) {
            var line = lines[i];
            var key_value = line.split("*");
            var key = key_value[0];
            var value = key_value[1];
            if (key.length > 0) {
                if (value === undefined)
                    value = '';
                this.hash[key] = value;
            }
        }
    }
}

MemoryHash.prototype.add = function(key, value)
{
    this.hash[key] = value;
    // it doesn't matter if we add a duplicate, 
    // when we remove something eventually,
    // duplicates will be deleted
    sys.appendToFile(this.fname, key +'*' + value + '\n');
}

MemoryHash.prototype.get = function(key)
{
    return this.hash[key];
}

MemoryHash.prototype.remove = function(key)
{
    delete this.hash[key];
    this.save();
}

MemoryHash.prototype.removeIf = function(test)
{
    var i;
    var toDelete = []
    for (i in this.hash) {
        if (test(this, i)) {
            toDelete.push(i);
        }
    }
    for (i in toDelete) {
        delete this.hash[toDelete[i]];
    }
}

MemoryHash.prototype.clear = function()
{
    this.hash = {};
    this.save();
}

MemoryHash.prototype.save = function()
{
    var lines = [];
    for (var i in this.hash) {
        lines.push(i +'*' + this.hash[i] + '\n');
    }
    sys.writeToFile(this.fname, lines.join("")) 
}

MemoryHash.prototype.escapeValue = function(value)
{
    return value.replace(/\*\n/g,'');
}

/* End of prototype MemoryHash */

function Lazy(func)
{
    var done = false;
    return function() {
        if (done)
            return this._value
        else {
            done = true;
            return this._value = func.apply(arguments.callee, arguments);
        }
    }
}

function POUser(id)
{
    /* user's id */
    this.id = id;
    /* whether user is megauser or not */
    this.megauser = false;
    /* whether user is muted or not */
    this.mute = {active: false, by: null, expires: 0, time: null, reason: null};
    /* whether user is secrectly muted */
    this.smute = {active: false, by: null, expires: 0, time: null, reason: null};
    /* caps counter for user */
    this.caps = 0;
    /* whether user is impersonating someone */
    this.impersonation = undefined;
    /* last time user said something */
    this.timecount = parseInt(sys.time());
    /* counter on how many lines user has said recently */
    this.floodcount = 0;
    /* counts coins */
    this.coins = 0;
    /* whether user has enabled battling only in same tier */
    this.sametier = undefined;

    /* check if user is megauser */
    if (megausers.indexOf("*" + sys.name(id) + "*") != -1)
        this.megauser = true;

    /* check if user is banned  */
    var data;
    var loopArgs = [["mute", mutes], ["smute", smutes]];
	for (var i = 0; i < 2; ++i) {
        var action = loopArgs[i][0];
        if (data = loopArgs[i][1].get(sys.ip(id))) {
            this[action].active=true;
            var args = data.split(":");
            this[action].time = parseInt(args[0]);
            if (args.length == 5) {
                this[action].by = args[1];
                this[action].expires = parseInt(args[2]);
                this[action].reason = args.slice(4).join(":");
            }
        }
    }
	
}


POUser.prototype.toString = function() {
    return "[object POUser]";	// _todo_ something more informative
}

POUser.prototype.expired = function(thingy) {
	try{
    return this[thingy].expires != 0 && this[thingy].expires < sys.time();
	}catch(e) {sys.sendAll('+DebugBot: Error in POU.expired: '+e );}
}

POUser.prototype.activate = function(thingy, by, expires, reason, persistent) {
    this[thingy].active = true;
    this[thingy].by = by;
    this[thingy].expires = expires;
    this[thingy].time = parseInt(sys.time());
    this[thingy].reason = reason;
    if (persistent) {
        var table = {"mute": mutes, "smute": smutes}
        table[thingy].add(sys.ip(this.id), sys.time() + ":" + by + ":" + expires + ":" + sys.name(this.id) + ":" + reason);
    }
    if (thingy == "mute") {
        if (typeof trollchannel != "undefined" && sys.channel(trollchannel) !== undefined && !sys.isInChannel(this.id, trollchannel)) {
            sys.putInChannel(this.id, trollchannel);
        }
    }
}

POUser.prototype.un = function(thingy) {
    this[thingy].active = false;
    this[thingy].expires = 0;
    var table = {"mute": mutes, "smute": smutes}
    table[thingy].remove(sys.ip(this.id));

    if (thingy == "mute") {
        if (typeof trollchannel != "undefined" && sys.channel(trollchannel) !== undefined && sys.isInChannel(this.id, trollchannel)) {
            sys.kick(this.id, trollchannel);
            if (sys.isInChannel(this.id, 0) != true) {
                sys.putInChannel(this.id, 0)
            }
        }
    }
}


/* POChannel */
function POChannel(id)
{
    this.id = id;
    this.masters = [];
    this.operators = [];
    this.perm = false;
    this.inviteonly = 0;
    this.invitelist = [];
    this.topic = "";
    this.topicSetter = "";
    this.muteall = undefined;
    this.meoff = undefined;
}

POChannel.prototype.toString = function() {
    return "[object POChannel]";	// _todo_
}

POChannel.prototype.setTopic = function(src, topicInfo)
{
    var canSetTopic = (sys.auth(src) > 0 || this.isChannelOperator(src));
    if (topicInfo == undefined) {
        if (typeof this.topic != 'undefined') {
            sendChanMessage(src, "+ChannelBot: Topic for this channel is: " + this.topic);
            if (SESSION.channels(channel).topicSetter) {
                sendChanMessage(src, "+ChannelBot: Topic was set by " + this.topicSetter);
            }
        } else {
            sendChanMessage(src, "+ChannelBot: No topic set for this channel.");
        }
        if (canSetTopic) {
            sendChanMessage(src, "+ChannelBot: Specify a topic to set one!");
        }
        return;
    }
    if (!canSetTopic) {
        sendChanMessage(src, "+ChannelBot: You don't have the rights to set topic");
        return;
    }
    this.topic = topicInfo;
    this.topicSetter = sys.name(src);
    SESSION.global().channelManager.updateChannelTopic(sys.channel(this.id), topicInfo, sys.name(src));
    sendChanAll("+ChannelBot: " + sys.name(src) + " changed the topic to: " + topicInfo);
}

POChannel.prototype.isChannelMaster = function(id)
{
    return this.masters.indexOf(sys.name(id).toLowerCase()) > -1;
}
POChannel.prototype.isChannelOperator = function(id)
{
    return this.isChannelMaster(id) || this.operators.indexOf(sys.name(id).toLowerCase()) != -1;
}
POChannel.prototype.issueAuth = function(src, name, authlist)
{
    var lname;
    var role = authlist.substring(0, authlist.length-1);
    var tar = sys.id(name);
    if (tar !== undefined) {
        name = sys.name(tar);
        lname = name.toLowerCase();
        if (this[authlist].indexOf(lname) == -1) {
            this[authlist].push(lname);
            sendChanMessage(src, "+ChannelBot: " + name + " is now a " + role + ".");
            sendChanMessage(tar, "+ChannelBot: You are now a " + role + ".");
        } else {
            sendChanMessage(src, "+ChannelBot: " + name + " is already a " + role + ".");
        }
    } else {
        name = lname = name.toLowerCase();
        if (this[authlist].indexOf(lname) == -1) {
            this[authlist].push(lname);
            sendChanMessage(src, "+ChannelBot: " + name + " is now a " + role + ".");
        } else {
            sendChanMessage(src, "+ChannelBot: " + name + " is already a " + role + ".");
        }
    }
}

POChannel.prototype.takeAuth = function(src, name, authlist)
{
    var role = authlist.substring(0, authlist.length-1);
    name = name.toLowerCase();
    var index = this[authlist].indexOf(name);
    if (index != -1) {
        this[authlist].splice(index,1);
        sendChanMessage(src, "+ChannelBot: " + name + " is no more " + role +".");
    } else {
        sendChanMessage(src, "+ChannelBot: " + name + ": no such "+ role +".");
    }
}

POChannel.prototype.addOperator = function(src, name)
{
    this.issueAuth(src, name, "operators");
    SESSION.global().channelManager.updateOperators(sys.channel(this.id), this.operators);
}
POChannel.prototype.removeOperator = function(src, name)
{
    this.takeAuth(src, name, "operators");
    SESSION.global().channelManager.updateOperators(sys.channel(this.id), this.operators);
}

POChannel.prototype.addOwner = function(src, name)
{
    this.issueAuth(src, name, "masters");
    SESSION.global().channelManager.updateMasters(sys.channel(this.id), this.masters);
}
POChannel.prototype.removeOwner = function(src, name)
{
    this.takeAuth(src, name, "masters");
    SESSION.global().channelManager.updateMasters(sys.channel(this.id), this.masters);
}

POChannel.prototype.register = function(name)
{
    if (this.masters.length == 0) {
        this.masters.push(name.toLowerCase());
        return true;
    }
    return false;
}

POChannel.prototype.allowed = function(id, what)
{
    if (sys.auth(id) > 0)
        return true;
    if (this[what]) {
        var ip = sys.ip(id);
        if (this[what].ips.hasOwnProperty(ip))
            return false;
    }
    return true;
}
POChannel.prototype.canJoin = function(id)
{
    return this.allowed(id, "banned");
}

POChannel.prototype.canTalk = function(id)
{
    return this.allowed(id, "muted");
}

POChannel.prototype.disallow = function(data)
{
    var id = sys.id(data);
    var ip = id ? sys.ip(id) : sys.dbIp(data);
    if (ip) {
        this[what].ips[ip] = data;
        return true;
    }
    return false;
}

POChannel.prototype.allow = function(data, what)
{
    if (this[what].ips.hasOwnProperty(data)) {
        delete this[what].ips[data];
        return true;
    }
    return false;
}

POChannel.prototype.ban = function(data)
{
    this.disallow(data, "banned");
}

POChannel.prototype.unban = function(data)
{
    this.allow(data, "banned");
}

POChannel.prototype.mute = function(data)
{
    this.disallow(data, "muted");
}

POChannel.prototype.unmute = function(data)
{
    this.allow(data, "muted");
}

/* Object that manages channels */
function POChannelManager(fname)
{
    /* Permanent channels */
    this.channelDataFile = fname;
    try {
        this.channelData = JSON.parse(sys.getFileContent(this.channelDataFile));
    } catch (err) {
        print('Could not read channelData.');
        print('Error: ' + err);
        this.channelData = {};
    }
}

POChannelManager.prototype.toString = function()
{
    return "[object POChannelManager]";	// _todo_
}

POChannelManager.prototype.updateChannelTopic = function(channelName, topic, name)
{
    this.ensureChannel(channelName);
    this.channelData[channelName].topic = topic;
    this.channelData[channelName].topicSetter = name;
    this.save();
}

POChannelManager.prototype.updateChannelPerm = function(channelName, perm)
{
    this.ensureChannel(channelName);
    this.channelData[channelName].perm = perm;
    this.save();
}

POChannelManager.prototype.updateOperators = function(channelName, operators)
{
    this.ensureChannel(channelName);
    this.channelData[channelName].operators = operators;
    this.save();
}

POChannelManager.prototype.updateMasters = function(channelName, masters)
{
    this.ensureChannel(channelName);
    this.channelData[channelName].masters = masters;
    this.save();
}

POChannelManager.prototype.update = function(channelName, chan)
{
    this.ensureChannel(channelName);
    this.channelData[channelName].topic = chan.topic;
    this.channelData[channelName].topicSetter = chan.topicSetter;
    this.channelData[channelName].perm = chan.perm;
    this.channelData[channelName].masters = chan.masters;
    this.channelData[channelName].operators = chan.operators;
    this.save();
}

POChannelManager.prototype.save = function()
{
    sys.writeToFile(this.channelDataFile, JSON.stringify(this.channelData));
}

POChannelManager.prototype.ensureChannel = function(channelName)
{
    if (!(channelName in this.channelData)) {
        this.channelData[channelName] = {};
        this.channelData[channelName].topic = '';
        this.channelData[channelName].topicSetter = '';
        this.channelData[channelName].perm = false;
        this.channelData[channelName].masters = [];
        this.channelData[channelName].operators = [];
    }
}

POChannelManager.prototype.createPermChannel = function(name, defaultTopic)
{
    var cid;
    if (sys.existChannel(name)) {
        cid = sys.channelId(name);
    } else {
        cid = sys.createChannel(name);
    }
    this.restoreSettings(cid);
    if (!SESSION.channels(cid).topic) {
        SESSION.channels(cid).topic = defaultTopic;
    }
    SESSION.channels(cid).perm = true;
    return cid;
}

POChannelManager.prototype.restoreSettings = function(cid)
{
    var chan = SESSION.channels(cid);
    var name = sys.channel(cid)
    if (name in this.channelData) {
        var data = this.channelData[name];
        ['topic', 'topicSetter', 'operators', 'masters', 'perm'].forEach(
            function(attr) {
                if (data[attr] !== undefined)
                    chan[attr] = data[attr];
            }
        );
    }
}

function POGlobal(id)
{
   // this.mafia = undefined;
    this.coins = 0;
    this.channelManager = new POChannelManager('channelData.json');
    var manager = this.channelManager;
    sys.channelIds().forEach(function(id) {
        manager.restoreSettings(SESSION.channels(id));
    });
}


SESSION.identifyScriptAs("RPC.23.3");
SESSION.registerGlobalFactory(POGlobal);
SESSION.registerUserFactory(POUser);
SESSION.registerChannelFactory(POChannel);


// uncomment to update either Channel or User
/*
sys.channelIds().forEach(function(id) {
    SESSION.channels(id).__proto__ = POChannel.prototype;
});
*/
/*
sys.playerIds().forEach(function(id) {
    SESSION.users(id).__proto__ = POUser.prototype;
});
*/


var commands = {
    user: 
    [
        "/rules: To see the rules",
        "/me [message]: to speak with *** before its name",
        "/players: to get the number of players online",
        "/ranking: to get your ranking in your tier",
        "/selfkick: to kick any ghosts left behind...",
        "/join: allows you to join a tournament.",
        "/auth [owners/admins/mods]: allows you to view the auth of that class, will show all auth if left blank",
        "/megausers: to see the list of people who have power over tournaments.",
        "/unjoin: allows you to leave a tournament.",
        "/sameTier [on/off]: to force or not the same tier when people challenge you",
        "/uptime: view server uptime",
        "/resetpass: to clear your password",
        "/export: Текстовая версия команды загружается на pastebin.com",
		"/lastfm [имя пользователя]: Последние заскроббленные треки.",
        "/register: to register a channel to yourself",
        "/cauth: to view the channel authority"
    ],
    megauser:
    [
        "/tour tier:number: starts a tier tournament consisting of number of players.",
        "/endtour: ends the current tournament.",
        "/dq name: DQs someone in the tournament.",
        "/changecount [entrants]: Change the number of entrants during the signup phase.",
        "/push name: Adds someone in the tournament.",
        "/sub name1:name2: Replaces someone with someone else.",
        "/cancelBattle name1: Allows the user or his/her opponent to forfeit his/her current battle so he/she can battle again his/her opponent."
    ], 
    channel:
    [
        "/topic [topic]: to read or change the topic of a channel. Only works if you're the first to log on a channel.",
        "/ck [person]: to kick someone from your channel",
        "/inviteonly [on|off]: to change channel to inviteonly",
        "/invite [person]: to send a person an invite",
        "/op [person]: to give someone operators",
        "/deop [person]: to take away someone's operators",
        "/csilence [minutes]: to silence channel for some time",
        "/csilenceoff: to unsilence the channel",
        "/owner [person]: to give someone owners",
        "/deowner [person]: to take away someone's owners"
    ],
    mod:
    [
        "/k [person] : to kick someone",
        "/banlist [search term]: to search the banlist, shows full list if no search term is entered.",
        "/mutelist [search term]: to search the mutelist, shows full list if no search term is entered.",
        "/smutelist [search term]: to search the smutelist, shows full list if no search term is entered.",
        "/rangebans: list range bans",
        "/tempbans: list temp bans",
        "/namebans: list name bans",
        "/mute [name]:[reason]:[time] : to mute someone. Time is optional and defaults to 12 hours.",
        "/unmute [person] : To unmute one.",
        "/silence [x]: To call forth x minute of silence in the main chat (except for auth)",
        "/silenceoff: To undo that",
        "/silence [x] [channel]: To call forth x minute of silence in a specific channel (except for auth)",
        "/silenceoff [channel]: To undo that on a specific channel",
        "/meon, /meoff: to deal with /me happy people",
        "/meon [channel], /meoff [channel]: to deal with /me happy people on some channel",
        "/perm [on/off]: To make the current channel a permanent channel or not -- i.e. the channel wouldn't be destroyed on log off",
        "/userinfo [person]: to display various info about the person",
        "/tempban [user]:[minutes]: To temporary ban someone (0 < minute <= 60)",
        "/tempunban [user]: To unban temporary banned user (standard unban doens't work)",
        "/wfbset [message]: Sets your personal warning message, {{user}} will be replaced by the target",
        "/wfb [target]: Warns one about asking for battles",
		"/clearchat: Очищает чат для всех участников."
    ],
    admin:
    [
        "/memorydump: To see the state of the memory.",
        "/megauser[off] xxx: Tourney powers.",
        "/aliases xxx: See the aliases of an IP.",
        "/ban [name]: To ban a user.",
        "/unban [name]: To unban a user.",
        "/smute xxx: To secretly mute a user. Can't smute auth.",
        "/sunmute xxx: To secretly unmute a user.",
        "/nameban regexp: To name some name from being used.",
        "/nameunban full_regexp: To unban some name.",
        "/destroychan [channel]: Will destroy a channel (Certain channels are immune obviously...)",
        "/channelusers [channel]: to display people on a channel"
    ],
    owner:
    [
        "/changeRating [player] -- [tier] -- [rating]: to change the rating of a rating abuser",
        "/stopBattles: to stop all new battles. When you want to close the server, do that",
        "/imp [person] : to impersonate someone",
        "/impOff : to stop impersonating.",
        "/clearpass [name]: to clear a password",
        "/sendAll [message] : to send a message to everyone.",
        "/changeAuth [auth] [person]: to play the mega admin",
        "/showteam xxx: To help people who have problems with event moves or invalid teams.",
        "/rangeban [ip] [comment]: to make a range ban",
        "/rangeunban: [ip] to unban a range",
        "/purgemutes [time]: to purge old mutes. Time is given in seconds. Defaults is 4 weeks.",
        "/writetourstats: to force a writing of tour stats to tourstats.json",
        "/reloadtourstats : to force a reload of tour stats from tourstats.json",
        "/resettourstats: to reset tournament winners",
        "/updateScripts: updates scripts from the web"
    ]
};

({
serverStartUp : function() {
    startUpTime = parseInt(sys.time());
    this.init();
}
,
serverShutDown: function() {	// _todo_
	sys.sendAll('Shutting Down');
/*	var a = new Array();
	a['type'] = "shutdown";
	sys.syncronousWebCall('http://kalashnikov.pokecenter.ru/po_online.php', 'sys.sendAll(resp);', a);
	sys.sendAll('Online list was warned');*/
}
,
init : function() {
    lastMemUpdate = 0;

    var dwlist = ["Rattata", "Raticate", "Nidoran-F", "Nidorina", "Nidoqueen", "Nidoran-M", "Nidorino", "Nidoking", "Oddish", "Gloom", "Vileplume", "Bellossom", "Bellsprout", "Weepinbell", "Victreebel", "Ponyta", "Rapidash", "Farfetch'd", "Doduo", "Dodrio", "Exeggcute", "Exeggutor", "Lickitung", "Lickilicky", "Tangela", "Tangrowth", "Kangaskhan", "Sentret", "Furret", "Cleffa", "Clefairy", "Clefable", "Igglybuff", "Jigglypuff", "Wigglytuff", "Mareep", "Flaaffy", "Ampharos", "Hoppip", "Skiploom", "Jumpluff", "Sunkern", "Sunflora", "Stantler", "Poochyena", "Mightyena", "Lotad", "Ludicolo", "Lombre", "Taillow", "Swellow", "Surskit", "Masquerain", "Bidoof", "Bibarel", "Shinx", "Luxio", "Luxray", "Psyduck", "Golduck", "Growlithe", "Arcanine", "Scyther", "Scizor", "Tauros", "Azurill", "Marill", "Azumarill", "Bonsly", "Sudowoodo", "Girafarig", "Miltank", "Zigzagoon", "Linoone", "Electrike", "Manectric", "Castform", "Pachirisu", "Buneary", "Lopunny", "Glameow", "Purugly", "Natu", "Xatu", "Skitty", "Delcatty", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Bulbasaur", "Charmander", "Squirtle", "Ivysaur", "Venusaur", "Charmeleon", "Charizard", "Wartortle", "Blastoise", "Croagunk", "Toxicroak", "Turtwig", "Grotle", "Torterra", "Chimchar", "Infernape", "Monferno", "Piplup", "Prinplup", "Empoleon", "Treecko", "Sceptile", "Grovyle", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Caterpie", "Metapod", "Butterfree", "Pidgey", "Pidgeotto", "Pidgeot", "Spearow", "Fearow", "Zubat", "Golbat", "Crobat", "Aerodactyl", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Yanma", "Yanmega", "Murkrow", "Honchkrow", "Delibird", "Wingull", "Pelipper", "Swablu", "Altaria", "Starly", "Staravia", "Staraptor", "Gligar", "Gliscor", "Drifloon", "Drifblim", "Skarmory", "Tropius", "Chatot", "Slowpoke", "Slowbro", "Slowking", "Krabby", "Kingler", "Horsea", "Seadra", "Kingdra", "Goldeen", "Seaking", "Magikarp", "Gyarados", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Wooper", "Quagsire", "Qwilfish", "Corsola", "Remoraid", "Octillery", "Mantine", "Mantyke", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Barboach", "Whiscash", "Clamperl", "Gorebyss", "Huntail", "Relicanth", "Luvdisc", "Buizel", "Floatzel", "Finneon", "Lumineon", "Tentacool", "Tentacruel", "Corphish", "Crawdaunt", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Shellos", "Gastrodon", "Lapras", "Dratini", "Dragonair", "Dragonite", "Elekid", "Electabuzz", "Electivire", "Poliwag", "Poliwrath", "Politoed", "Poliwhirl", "Vulpix", "Ninetales", "Musharna", "Munna", "Darmanitan", "Darumaka", "Mamoswine", "Togekiss", "Burmy", "Wormadam", "Mothim", "Pichu", "Pikachu", "Raichu","Abra","Kadabra","Alakazam","Spiritomb","Mr. Mime","Mime Jr.","Meditite","Medicham","Meowth","Persian","Shuppet","Banette","Spinarak","Ariados","Drowzee","Hypno","Wobbuffet","Wynaut","Snubbull","Granbull","Houndour","Houndoom","Smoochum","Jynx","Ralts","Gardevoir","Gallade","Sableye","Mawile","Volbeat","Illumise","Spoink","Grumpig","Stunky","Skuntank","Bronzong","Bronzor"];
    /* use hash for faster lookup */
    dwpokemons = {};
    for(var dwpok in dwlist) {
        dwpokemons[sys.pokeNum(dwlist[dwpok])] = true;
    }

    var lclist = ["Bulbasaur", "Charmander", "Squirtle", "Croagunk", "Turtwig", "Chimchar", "Piplup", "Treecko","Torchic","Mudkip"]
    lcpokemons = [];
    for(var dwpok in lclist) {
        lcpokemons.push(sys.pokeNum(lclist[dwpok]));
    }
    bannedGSC = [sys.moveNum("Perish Song"), sys.moveNum("Hypnosis"), sys.moveNum("Mean Look")];

    var inconsistentList = ["Remoraid", "Bidoof", "Snorunt", "Smeargle", "Bibarel", "Octillery", "Glalie"];
    inpokemons = [];
    for(var inpok in inconsistentList) {
        inpokemons.push(sys.pokeNum(inconsistentList[inpok]));
    }

    var breedingList = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Croagunk", "Toxicroak", "Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Mamoswine", "Togekiss"];
    breedingpokemons = [];
    for(var inpok in breedingList) {
        breedingpokemons.push(sys.pokeNum(breedingList[inpok]));
    }

    /* restore mutes, smutes, rangebans, megausers */
    mutes = new MemoryHash("mutes.txt");
    smutes = new MemoryHash("smutes.txt");
    rangebans = new MemoryHash("rangebans.txt");
	
	    rules = [ "",
    "*** Rules ***",
    "",
    "Rule #1 - Do Not Abuse CAPS:",
    "- The occasional word in CAPS is acceptable, however repeated use is not.",
    "Rule #2 - No Flooding the Chat:",
    "- Please do not post a large amount of short messages when you can easily post one or two long messages.",
    "Rule #3 - Do not Challenge Spam:",
    "- If a person refuses your challenge, this means they do not want to battle you. Find someone else to battle with.",
    "Rule #4 - Don't ask for battles in the main chat:",
    "- There is a 'Find Battle' tab that you can use to find a battle immediately. If after a while you cannot find a match, then you can ask for one in the chat.",
    "Rule #5 - No Trolling/Flaming/Insulting of Any kind:",
    "- Behaving stupidly and excessive vulgarity will not be tolerated, using words including 'fuck' is a bad starting point.",
    "Rule #6 - Be Respectable of Each Others Cultures:",
    "- Not everyone speaks the same language. This server is not an English-Only Server. Do not tell someone to only speak a certain language.",
    "Rule #7 - No Advertising:",
    "- There will be absolutely no advertising on the server.",
    "Rule #8 - No Obscene or Pornographic Content Allowed:",
    "- This includes links, texts, images, and any other kind of media. This will result in an instant ban.",
    "Rule #9 - Do not ask for Auth:",
    "- Authority is given upon merit. By asking you have pretty much eliminated your chances at becoming an Auth in the future.",
    "Rule #10 - Do not Insult Auth:",
    "- Insulting Auth will result in immediate punishment. ",
    "Rule #11 - No minimodding:",
    "- Server has moderators for a reason. If someone breaks the rules, alert the auth, do not try to moderate yourself."
    ];

    if (typeof tempBans == 'undefined') {
        tempBans = {};
    }
    if (typeof nameBans == 'undefined') {
        nameBans = [];
        try {
            var serialized = JSON.parse(sys.getFileContent("nameBans.json"));
            for (var i = 0; i < serialized.nameBans.length; ++i) {
                nameBans.push(new RegExp(serialized.nameBans[i]));
            }
        } catch (e) {
            // ignore
        }
    }

    if (typeof VarsCreated != 'undefined')
        return;

    key = function(a,b) {
        return a + "*" + sys.name(b);
    }

    saveKey = function(thing, id, val) {
        sys.saveVal(key(thing,id), val);
    }

    getKey = function(thing, id) {
        return sys.getVal(key(thing,id));
    }

    cmp = function(a, b) {
        return a.toLowerCase() == b.toLowerCase();
    }

    battlesStopped = false;

    megausers = sys.getVal("megausers");

    muteall = false;

    maxPlayersOnline = 0;

    lineCount = 0;
    tourmode = 0;

    tourwinners = [];
    tourstats = {};
    tourrankingsbytier = {};
    try {
        var jsonObject = JSON.parse(sys.getFileContent('tourstats.json'));
        tourwinners = jsonObject.tourwinners;
        tourstats = jsonObject.tourstats;
        tourrankingsbytier = jsonObject.tourrankingsbytier;
    } catch (err) {
        print('Could not read tourstats, initing to null stats.');
        print('Error: ' + err);
    }

    border = "Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»Â»:";

    pokeNatures = [];

    var list = "Heatran-Eruption/Quiet=Suicune-ExtremeSpeed/Relaxed|Sheer Cold/Relaxed|Aqua Ring/Relaxed|Air Slash/Relaxed=Raikou-ExtremeSpeed/Rash|Weather Ball/Rash|Zap Cannon/Rash|Aura Sphere/Rash=Entei-ExtremeSpeed/Adamant|Flare Blitz/Adamant|Howl/Adamant|Crush Claw/Adamant";

    var sepPokes = list.split('=');
    for (var x in sepPokes) {
        sepMovesPoke = sepPokes[x].split('-');
        sepMoves = sepMovesPoke[1].split('|');

        var poke = sys.pokeNum(sepMovesPoke[0]);
        pokeNatures[poke] = [];

        for (var y = 0; y < sepMoves.length; ++y) {
            movenat = sepMoves[y].split('/');
            pokeNatures[poke][sys.moveNum(movenat[0])] = sys.natureNum(movenat[1]);
        }
    }

    staffchannel = SESSION.global().channelManager.createPermChannel("Indigo Plateau", "Welcome to the Staff Channel! Discuss of all what users shouldn't hear here! Or more serious stuff...");

    tourchannel = SESSION.global().channelManager.createPermChannel("Tournaments", 'Useful commands are "/join" (to join a tournament), "/unjoin" (to leave a tournament), "/viewround" (to view the status of matches) and "/megausers" (for a list of users who manage tournaments). Please read the full Tournament Guidelines: http://pokemon-online.eu/forums/showthread.php?2079-Tour-Rules');

    SESSION.global().channelManager.createPermChannel("League", "Challenge the PO League here! For more information, please visit this link: http://pokemon-online.eu/forums/forumdisplay.php?36-PO-League");

    trollchannel = SESSION.global().channelManager.createPermChannel("Mute City", 'This is a place to talk if you have been muted! Please behave, next stop will be bans.');

    /* global utility helpers */
    getSeconds = function(s) {
        var parts = s.split(" ")
        var secs = 0;
        for (var i = 0; i < parts.length; ++i) {
            var c = (parts[i][parts[i].length-1]).toLowerCase();
            var mul = 60;
            if (c == "s") { mul = 1; }
            else if (c == "m") { mul = 60; }
            else if (c == "h") { mul = 60*60; }
            else if (c == "d") { mul = 24*60*60; }
            else if (c == "w") { mul = 7*24*60*60; }
            secs += mul * parseInt(parts[i]);
        }
        return secs;
    };
    getTimeString = function(sec) {
        s = [];
        var n;
        var d = [[7*24*60*60, "week"], [24*60*60, "day"], [60*60, "hour"], [60, "minute"], [1, "second"]];
        for (j = 0; j < 5; ++j) {
            n = parseInt(sec / d[j][0]);
            if (n > 0) {
                s.push((n + " " + d[j][1] + (n > 1 ? "s" : "")));
                sec -= n * d[j][0];
                if (s.length >= 2) break;
            }
        }
        return s.join(", ");
    };

    sendChanMessage = function(id, message) {
        sys.sendMessage(id, message, channel);
    }
    
    sendChanAll = function(message) {
        sys.sendAll(message, channel);
    }
    
    sendMainTour = function(message) {
        sys.sendAll(message, 0);
        sys.sendAll(message, tourchannel);
    }

    VarsCreated = true;
} /* end of init */

,

issueBan : function(type, src, tar, commandData) {
        var memoryhash = {"mute": mutes, "smute": smutes}[type];
        var bot = type == "+Bot"; 
        var verb = {"mute": "muted", "smute": "secretly muted"}[type];
        var nomi = {"mute": "mute", "smute": "secret mute"}[type];
        var sendAll = (type == "smute") ? function(line) { sys.sendAll(line, staffchannel); } : sys.sendAll;

        var expires = 0;
        var defaultTime = {"mute": "24h", "smute": "0"}[type];
        var reason = "";
        var timeString = "";
        var tindex = 10;
        var data = [];
        if (tar == undefined) {
            data = commandData.split(":");
            if (data.length > 1) {
                commandData = data[0];
                tar = sys.id(commandData);

                if (data.length > 2 && /http$/.test(data[1])) {
                    reason = data[1] + ":" + data[2];
                    tindex = 3;
                } else {
                    reason = data[1];
                    tindex = 2;
                }
                if (tindex==data.length && reason.length > 0 && reason.charCodeAt(0) >= 48 && reason.charCodeAt(0) <= 57) {
                    tindex-=1;
                    reason="";
                }
            } 
        }
	
        var secs = getSeconds(data.length > tindex ? data[tindex] : defaultTime);
        if (secs > 0) {
            timeString = " for " + getTimeString(secs);
            expires = secs + parseInt(sys.time());
        }
			
        if (reason == "" && sys.auth(src) < 3) {
           sendChanMessage(src, bot+": You need to give a reason to the " + nomi + "!");
           return;
        }

        var bannedReasons = ["idiot", "shut up", "fuck", 'хуй', 'заткнись'];	// _todo_
        var lreason = reason.toLowerCase();
        for (var i = 0; i < bannedReasons.length; ++i) {
            if (lreason.indexOf(bannedReasons[i]) > -1) {
               sendChanMessage(src, bot+": Including '" + bannedReasons[i] + "' in the reason is not a good practice!");
               return;
            }
        }

        if (tar == undefined) {
            ip = sys.dbIp(commandData);
            var alias=sys.aliases(ip);
            var y=0;
            var z;
            for(var x in alias) {
                z = sys.dbAuth(alias[x])
                if (z > y) {
                    y=z
                }
            }
            if(y>=sys.auth(src)) {
               sendChanMessage(src, bot+": Can't do that to higher auth!");
               return;
            }
            if(sys.dbIp(commandData) != undefined) {
                ip = sys.dbIp(commandData)
                if (memoryhash.get(ip)) {
                    sendChanMessage(src, bot+": He/she's already " + verb + ".");
                    return;
                }
                sendAll(bot+": " + commandData + " was " + verb + " by " + sys.name(src) + timeString + "! [Reason: " + reason + "]");
                memoryhash.add(ip, sys.time() + ":" + sys.name(src) + ":" + expires + ":" + commandData + ":" + reason);
                return;
            }

            sendChanMessage(src, bot+": Couldn't find " + commandData);
            return;
        }
        if (SESSION.users(tar)[type].active) {
            sendChanMessage(src, bot+": He/she's already " + verb + ".");
            return;
        }
        if (sys.auth(tar) >= sys.auth(src)) {
            sendChanMessage(src, bot+": You dont have sufficient auth to " + nomi + " " + commandData + ".");
            return;
        }
        SESSION.users(tar).activate(type, sys.name(src), expires, reason, true);
		if (reason .length > 0)
			sendAll(bot+": " + commandData + " was " + verb + " by " + sys.name(src) + timeString + "! [Reason: " + reason + "]");
		else
			sendAll(bot+": " + commandData + " was " + verb + " by " + sys.name(src) + timeString) + "!";
}

,

importable : function(id, compactible) {
/*
Tyranitar (M) @ Choice Scarf
Lvl: 100
Trait: Sand Stream
IVs: 0 Spd
EVs: 4 HP / 252 Atk / 252 Spd
Jolly Nature (+Spd, -SAtk)
- Stone Edge
- Crunch
- Superpower
- Pursuit
*/
    if (compactible === undefined) compactible = false;
   // var nature_effects = {"Adamant": "(+Atk, -SAtk)", "Bold": "(+Def, -Atk)"}
    var genders = {0: '', 1: ' (M)', 2: ' (F)'};
    var stat = {0: 'HP', 1: 'Atk', 2: 'Def', 3: 'SAtk', 4: 'SDef', 5:'Spd'};
    var hpnum = sys.moveNum("Hidden Power");
    var ret = [];
    for (var i = 0; i < 6; ++i) {
        var poke = sys.teamPoke(id, i);
        if (poke === undefined)
            continue;

        var item = sys.teamPokeItem(id, i);
        item = item !== undefined ? sys.item(item) : "(no item)";
        ret.push(sys.pokemon(poke) + genders[sys.teamPokeGender(id, i)] + " @ " + item );
        ret.push('Trait: ' + sys.ability(sys.teamPokeAbility(id, i)));
        var level = sys.teamPokeLevel(id, i);
        if (!compactible && level != 100) ret.push('Lvl: ' + level);

        var ivs = [];
        var evs = [];
        var hpinfo = [sys.gen(id)];
        for (var j = 0; j < 6; ++j) {
            var iv = sys.teamPokeDV(id, i, j);
            if (iv != 31) ivs.push(iv + " " + stat[j]);
            var ev = sys.teamPokeEV(id, i, j);
            if (ev != 0) evs.push(ev + " " + stat[j]);
            hpinfo.push(iv);
        }
        if (!compactible && ivs.length > 0)
            ret.push('IVs: ' + ivs.join(" / "));
        if (evs.length > 0)
            ret.push('EVs: ' + evs.join(" / "));

        ret.push(sys.nature(sys.teamPokeNature(id, i)) + " Nature"); // + (+Spd, -Atk)

        for (var j = 0; j < 4; ++j) {
            var move = sys.teamPokeMove(id, i, j);
            if (move !== undefined) {
                ret.push('- ' + sys.move(move) + (move == hpnum ? ' [' + sys.type(sys.hiddenPowerType.apply(sys, hpinfo)) + ']':''));
            }
        }
        ret.push("")
    }
    return ret;
}

,

canJoinStaffChannel : function(src) {
    if (sys.auth(src) > 0)
        return true;
    if (SESSION.users(src).megauser)
        return true;
    /*var allowedNames = ["Lamperi-"];
    if (allowedNames.indexOf(sys.name(src)) > -1)
        return true;*/
    return false;
}

,

kickAll : function(ip) {
        var players = sys.playerIds();
        var players_length = players.length;
        for (var i = 0; i < players_length; ++i) {
            var current_player = players[i];
            if (ip == sys.ip(current_player)) {
                sys.kick(current_player);
            }
        }
        return;
}

,

beforeChannelJoin : function(src, channel) {

    if (SESSION.channels(channel).isChannelOperator(src)){
        return;
    }
    var index = SESSION.channels(channel).invitelist.indexOf(src);
    if (index != -1) {
        // allow to bypass all limits if invited
        SESSION.channels(channel).invitelist.splice(index, 1);
        return; 
    }
    if (SESSION.channels(channel).inviteonly > sys.auth(src)) {
        sys.sendMessage(src, "+Guard: Sorry, but this channel is for higher authority!")
        sys.stopEvent();
        return;
    }
    if (channel == trollchannel && (!SESSION.users(src).mute.active && sys.auth(src) <= 1)) {
        sys.sendMessage(src, "+Guard: Sorry, the access to that place is restricted!");
        sys.stopEvent();
        return;
    }
    if ((channel == staffchannel || channel == sys.channelId("shanaindigo")) && !this.canJoinStaffChannel(src)) {
        sys.sendMessage(src, "+Guard: Sorry, the access to that place is restricted!");
        sys.stopEvent();
        return;
    }
} /* end of beforeChannelJoin */

,

afterChannelCreated : function (chan, name, src) {
    SESSION.global().channelManager.restoreSettings(SESSION.channels(chan));
} /* end of afterChannelCreated */

,

afterChannelJoin : function(player, chan) {
    if (typeof SESSION.channels(chan).topic != 'undefined') {
        sys.sendMessage(player, "Welcome Message: " + SESSION.channels(chan).topic, chan);
        /*if (SESSION.channels(chan).topicSetter)
            sys.sendMessage(player, "Set by: " + SESSION.channels(chan).topicSetter, chan);*/
    }
    if (SESSION.channels(chan).isChannelOperator(player)) {
        sys.sendMessage(player, "+ChannelBot: use /topic <topic> to change the welcome message of this channel", chan);
        return;
    }
} /* end of afterChannelJoin */

,

beforeChannelDestroyed : function(channel) {
    if (channel == tourchannel || (SESSION.channels(channel).perm == true) ) {
        sys.stopEvent();
        return;
    }
} /* end of beforeChannelDestroyed */
,

afterNewMessage : function (message) {
    if (message == "Script Check: OK") {
        sys.sendAll("+ScriptBot: Scripts were updated!");
        if (typeof(scriptChecks)=='undefined')
            scriptChecks = 0;
        scriptChecks += 1;
        this.init();
    }
} /* end of afterNewMessage */

,

beforeLogIn : function(src) {
	var ip = sys.ip(src);
	
	if (sys.auth(src) > 0 || ip== '127.0.0.1' )
        return;
	
    if (ip in tempBans) {
        var time = parseInt(sys.time());
        if (time > tempBans[ip].time) {
            delete tempBans[ip];
        } else {
            sys.stopEvent();
            return;
        }
    }

    /*if (/[\u0400-\u044f]/.test(sys.name(src))) {
        sys.sendMessage(src, '+Bot: You are kicked for using bad characters in your name.');
        sys.stopEvent();
        return;
    }*/

    var name = sys.name(src).toLowerCase();

    for (var subip in rangebans.hash) {
        if (ip.substr(0, subip.length) == subip) {
            sys.stopEvent();
            return;
        }
    }
	
    for (var i = 0; i < nameBans.length; ++i) {
        var regexp = nameBans[i];
        if (regexp.test(name)) {
            sys.stopEvent();
            return;
        }
    }
    
    //sys.sendAll('DebugBot: Calling ' + 'http://api.ipinfodb.com/v3/ip-country/?key='+ipinfo_api_key +'&ip='+ip+'&format=json', sys.channelId('Indigo Plateau'));
    sys.webCall('http://api.ipinfodb.com/v3/ip-country/?key='+ipinfo_api_key +'&ip='+ip+'&format=json', function(resp) {
		//sys.sendAll('DebugBot: Got response:', sys.channelId('Indigo Plateau'));
		//sys.sendHtmlAll('<pre>'+resp+'</pre>', sys.channelId('Indigo Plateau'));
		try {
			o = JSON.parse(resp);
			sys.sendAll(sys.name(src)+' пришел к нам из '+ o.countryName.toLowerCase().replace(/^([a-z])|\s+([a-z])/g, function ($1) {return $1.toUpperCase()}));
			if (-1 == ["RU", "UA", "BY", "KZ", "EE", 'AZ'].indexOf(o.countryCode)) {
				sys.sendMessage(src, '+Bot: You don\'t seem to speak Russian, we suggest you finding another server.\nЕсли вы вы считаете, что видите это по ошибке, сообщите администрации, желательно указав свою страну и ip адрес.');
			}
		} catch(e) {
			sys.sendAll('DebugBot: Ошибка при определении страны: '+e, sys.channelId('Indigo Plateau'));
		}
	});
}

,

afterLogIn : function(src) {
    sys.sendMessage(src, "*** Прочтите правила, воспользовавшись командой /rules ***");
    sys.sendMessage(src, "+CommandBot: Для списка комманд наберите !commands");

    if (sys.numPlayers() > maxPlayersOnline) {
        maxPlayersOnline = sys.numPlayers();
    }

    if (maxPlayersOnline > sys.getVal("MaxPlayersOnline")) {
        sys.saveVal("MaxPlayersOnline", maxPlayersOnline);
    }

    sys.sendMessage(src, "+CountBot: Max number of players online was " + sys.getVal("MaxPlayersOnline") + ".");
    sys.sendMessage(src, "");

    if (SESSION.users(src).megauser)
        sys.appendToFile("staffstats.txt", sys.name(src) + "~" + src + "~" + sys.time() + "~" + "Connected as MU" + "\n");
    if (sys.auth(src) > 0 && sys.auth(src) <= 3)
        sys.appendToFile("staffstats.txt", sys.name(src) + "~" + src + "~" + sys.time() + "~" + "Connected as Auth" + "\n");

    authChangingTeam = (sys.auth(src) > 0 && sys.auth(src) <= 3);
    this.afterChangeTeam(src);

    if (SESSION.users(src).mute.active)
        sys.putInChannel(src, trollchannel);
    if (sys.auth(src) <= 3 && this.canJoinStaffChannel(src))
        sys.putInChannel(src, staffchannel);
		
	/*var a = new Array();
	a['type'] = "connected";
	a['player'] = sys.name(src);
	sys.webCall('http://kalashnikov.pokecenter.ru/po_online.php', '', a);*/
} /* end of afterLogin */

,

beforeLogOut : function(src) {
    if (SESSION.users(src).megauser)
        sys.appendToFile("staffstats.txt", sys.name(src) + "~" + src + "~" + sys.time() + "~" + "Disconnected as MU" + "\n");
    if (sys.auth(src) > 0 && sys.auth(src) <= 3)
        sys.appendToFile("staffstats.txt", sys.name(src) + "~" + src + "~" + sys.time() + "~" + "Disconnected as Auth" + "\n");

	/*var a = new Array();
	a['type'] = "disconnected";
	a['player'] = sys.name(src);
	sys.webCall('http://kalashnikov.pokecenter.ru/po_online.php', '', a);*/
}

,

beforeChangeTeam : function(src) {
    authChangingTeam = (sys.auth(src) > 0 && sys.auth(src) <= 3);
}

,

afterChangeTeam : function(src)
{
    /*if (/[\u0430-\u044f]/.test(sys.name(src))) {
        sys.sendMessage(src, '+Bot: You are kicked for using bad characters in your name.');
        sys.kick(src);
        return;
    }*/
	
	var name = sys.name(src).toLowerCase();
	
    for (var i = 0; i < nameBans.length; ++i) {
        if (nameBans[i].test(name)) {
            sys.sendMessage(src, '+Bot: You are kicked for using a bad name.');
            sys.kick(src);
            return;
        }
    }

    if (megausers.indexOf("*" + sys.name(src) + "*") != -1) {
        if(!SESSION.users(src).megauser) {
            sys.appendToFile("staffstats.txt", sys.name(src) + "~" + src + "~" + sys.time() + "~" + "Changed name to MU" + "\n");
        }
        SESSION.users(src).megauser = true;
    } else {
        if(SESSION.users(src).megauser) {
            sys.appendToFile("staffstats.txt", "~" + src + "~" + sys.time() + "~" + "Changed name from MU" + "\n");
        }
        SESSION.users(src).megauser = false;
    }
    if (authChangingTeam === false) {
        if (sys.auth(src) > 0 && sys.auth(src) <= 3)
            sys.appendToFile("staffstats.txt", sys.name(src) + "~" + src + "~" + sys.time() + "~" + "Changed name to Auth" + "\n");
    } else if (authChangingTeam === true) {
        if (!(sys.auth(src) > 0 && sys.auth(src) <= 3))
            sys.appendToFile("staffstats.txt", "~" + src + "~" + sys.time() + "~" + "Changed name from Auth" + "\n");
    }

    SESSION.users(src).sametier = getKey("forceSameTier", src) == "1";

    if (sys.gen(src) >= 4) {
    for (var i = 0; i < 6; i++) {
        var poke = sys.teamPoke(src, i);
        if (poke in pokeNatures) {
            for (x in pokeNatures[poke]) {
                if (sys.hasTeamPokeMove(src, i, x) && sys.teamPokeNature(src, i) != pokeNatures[poke][x])
                {
                    sys.sendMessage(src, "+CheckBot: " + sys.pokemon(poke) + " with " + sys.move(x) + " must be a " + sys.nature(pokeNatures[poke][x]) + " nature. Change it in the teambuilder.");
                    sys.changePokeNum(src, i, 0);
                }
            }
        }
    }
   }

   if (sys.gen(src) == 2) {
        for (var i = 0; i <= 6; i++) {
            if (sys.hasTeamPokeMove(src, i, bannedGSC[0])
                && sys.hasTeamPokeMove(src, i, bannedGSC[1])
                && sys.hasTeamPokeMove(src, i, bannedGSC[2])) {
                sys.sendMessage(src, "+CheckBot: PerishTrapSleep is banned in GSC.");
                sys.changePokeNum(src, i, 0);
            }
        }
    }
    this.dreamWorldAbilitiesCheck(src, false);
	this.pcTourney3Check(src, false);
	this.redOctoberCheck(src, false);
    this.littleCupCheck(src, false);
    this.inconsistentCheck(src, false);
    this.monotypecheck(src);
    this.weatherlesstiercheck(src);
    this.shanaiAbilityCheck(src, false)
    this.monoColourCheck(src)

} /* end of afterChangeTeam */

,
userCommand: function(src, command, commandData, tar) {
    if (command == "commands" || command == "command") {
        if (commandData == undefined) {
            sendChanMessage(src, "*** Commands ***");
            for(var x = 0; x < commands["user"].length; ++x) {
                sendChanMessage(src, commands["user"][x]);
            }
            sendChanMessage(src, "*** Other Commands ***");
            sendChanMessage(src, "/commands channel: To know of channel commands");
            if (SESSION.users(src).megauser || sys.auth(src) > 0) {
                sendChanMessage(src, "/commands megauser: To know of megauser commands");
            }
            if (sys.auth(src) > 0) {
                sendChanMessage(src, "/commands mod: To know of moderator commands");
            }
            if (sys.auth(src) > 1) {
                sendChanMessage(src, "/commands admin: To know of admin commands");
            }
            if (sys.auth(src) > 2) {
                sendChanMessage(src, "/commands owner: To know of owner commands");
            }
            sendChanMessage(src, "");
            sendChanMessage(src, "Commands starting with \"|\" will be forwarded to Shanai if she's online.");
            sendChanMessage(src, "");
            return;
        }

        commandData = commandData.toLowerCase();
        if ( (commandData == "mod" && sys.auth(src) > 0)
            || (commandData == "admin" && sys.auth(src) > 1)
            || (commandData == "owner" & sys.auth(src) > 2)
            || (commandData == "megauser" && (sys.auth(src) > 0 || SESSION.users(src).megauser))
            || (commandData == "channel") ) {
            sendChanMessage(src, "*** " + commandData.toUpperCase() + " Commands ***");
            for(x in commands[commandData]) {
                sendChanMessage(src, commands[commandData][x]);
            }
        }
        
        return;
    }
    if (command == "me" && !muteall && !SESSION.channels(channel).muteall) {
        if ((typeof meoff != "undefined" && meoff != false && (channel == tourchannel || channel == 0)) 
            || SESSION.channels(channel).meoff === true) {
            sendChanMessage(src, "+Bot: /me was turned off.");
            return;
        }
        if (commandData === undefined)
            return;
        if (channel == sys.channelId("Trivia") && SESSION.channels(channel).triviaon) {
            sys.sendMessage(src, "Â±Trivia: Answer using \a, /me not allowed now.", channel);
            return;
        }

        if (usingBannedWords()) {
            sys.stopEvent();
            return;
        }
        
        if (sys.auth(src) == 0 && SESSION.users(src).smute.active) {
            sendChanMessage(src, "*** " + sys.name(src) + " " + commandData);
            sys.stopEvent();
            this.afterChatMessage(src, '/'+command+ ' '+commandData);
            return;
        }
		commandData=this.html_escape(commandData)
        sys.sendHtmlAll("<span style='color:#0483c5'><timestamp/> *** <b>" + sys.name(src) + "</b> " + commandData + "</span>", channel);
        this.afterChatMessage(src, '/'+command+' '+commandData);
        return;
    }
    if (command == "megausers") {
        sendChanMessage(src, "");
        sendChanMessage(src, "*** MEGA USERS ***");
        sendChanMessage(src, "");
        var spl = megausers.split('*');
        for (var x = 0; x < spl.length; ++x) {
            if (spl[x].length > 0)
                sendChanMessage(src, spl[x]);
        }
        sendChanMessage(src, "");
        return;
    }
    if (command == "rules") {
        for (rule in rules) {
            sendChanMessage(src, rules[rule]);
        }
        return;
    }
    if (command == "players") {
        sendChanMessage(src, "+CountBot: There are " + sys.numPlayers() + " players online.");
        return;
    }
    if (command == "ranking") {
        var rank = sys.ranking(src);
        if (rank == undefined) {
            sendChanMessage(src, "+RankingBot: You are not ranked in " + sys.tier(src) + " yet!");
        } else {
            sendChanMessage(src, "+RankingBot: Your rank in " + sys.tier(src) + " is " + rank + "/" + sys.totalPlayersByTier(sys.tier(src)) + " [" + sys.ladderRating(src) + " points / " + sys.ratedBattles(src) +" battles]!");
        }
        return;
    }
    if (command == "auth") {
        var authlist = sys.dbAuths().sort()
        sendChanMessage(src, "");
        if(commandData == "owners") {
            sendChanMessage(src, "*** Owners ***")
            for(x in authlist) {
                if(sys.dbAuth(authlist[x]) == 3) {
                    if(sys.id(authlist[x]) == undefined) {
                       sendChanMessage(src, authlist[x] + " (Offline)")
                    }
                    if(sys.id(authlist[x]) != undefined) {
                        sys.sendHtmlMessage(src, '<timestamp/><font color = "green">' + sys.name(sys.id(authlist[x])) + ' (Online)</font>',channel)
                    }
                }
            }
            sendChanMessage(src, "");
        }
        if(commandData == "admins" || commandData == "administrators") {
            sendChanMessage(src, "*** Administrators ***")
            for(x in authlist) {
                if(sys.dbAuth(authlist[x]) == 2) {
                    if(sys.id(authlist[x]) == undefined) {
                        sendChanMessage(src, authlist[x] + " (Offline)")
                    }
                    if(sys.id(authlist[x]) != undefined) {
                        sys.sendHtmlMessage(src, '<timestamp/><font color = "green">' + sys.name(sys.id(authlist[x])) + ' (Online)</font>',channel)
                    }
                }
            }
            sys.sendMessage(src, "");
        }
        if(commandData == "mods" || commandData == "moderators") {
            sendChanMessage(src, "*** Moderators ***")
            for(x in authlist) {
                if(sys.dbAuth(authlist[x]) == 1) {
                    if(sys.id(authlist[x]) == undefined) {
                        sendChanMessage(src, authlist[x] + " (Offline)")
                    }
                    if(sys.id(authlist[x]) != undefined) {
                        sys.sendHtmlMessage(src, '<timestamp/><font color = "green">' + sys.name(sys.id(authlist[x])) + ' (Online)</font>',channel)
                    }
                }
            }
            sys.sendMessage(src, "");
        }

        if(commandData != "moderators" && commandData != "mods" && commandData != "administrators" && commandData != "admins" && commandData != "owners") {

            sendChanMessage(src, "*** Owners ***")
            for(x in authlist) {
                if(sys.dbAuth(authlist[x]) == 3) {
                    if(sys.id(authlist[x]) == undefined) {
                        sendChanMessage(src, authlist[x] + " (Offline)")
                    }
                    if(sys.id(authlist[x]) != undefined) {
                        sys.sendHtmlMessage(src, '<timestamp/><font color = "green">' + sys.name(sys.id(authlist[x])) + ' (Online)</font>',channel)
                    }
                }
            }
            sendChanMessage(src, "");
            sendChanMessage(src, "*** Administrators ***")
            for(x in authlist) {
                if(sys.dbAuth(authlist[x]) == 2) {
                    if(sys.id(authlist[x]) == undefined) {
                        sendChanMessage(src, authlist[x] + " (Offline)")
                    }
                    if(sys.id(authlist[x]) != undefined) {
                        sys.sendHtmlMessage(src, '<timestamp/><font color = "green">' + sys.name(sys.id(authlist[x])) + ' (Online)</font>',channel)
                    }
                }

            }
            sendChanMessage(src, "");
            sendChanMessage(src, "*** Moderators ***")
            for(x in authlist) {
                if(sys.dbAuth(authlist[x]) == 1) {
                    if(sys.id(authlist[x]) == undefined) {
                        sendChanMessage(src, authlist[x] + " (Offline)")
                    }
                    if(sys.id(authlist[x]) != undefined) {
                        sys.sendHtmlMessage(src, '<timestamp/><font color = "green">' + sys.name(sys.id(authlist[x])) + ' (Online)</font>',channel)
                    }
                }
            }
        }
        return;
    }
    if (command == "sametier") {
        if (commandData == "on")
            sendChanMessage(src, "+SleepBot: You enforce same tier in your battles.");
        else
            sendChanMessage(src, "+SleepBot: You allow different tiers in your battles.");
        SESSION.users(src).sametier = commandData == "on";
        saveKey("forceSameTier", src, SESSION.users(src).sametier * 1);
        return;
    }
    if (command == "selfkick" || command == "sk") {
        var src_ip = sys.ip(src);
        var players = sys.playerIds();
        var players_length = players.length;
        for (var i = 0; i < players_length; ++i) {
            var current_player = players[i];
            if ((src != current_player) && (src_ip == sys.ip(current_player))) {
                sys.kick(current_player);
                sys.sendMessage(src, "+Bot: Your ghost was kicked...")
            }
        }
        return;
    }
    if (command == "topic") {
        SESSION.channels(channel).setTopic(src, commandData);
        return;
    }
    if (command == "uptime") {
        if (typeof startUpTime != "number") {
            sendChanMessage(src, "+UptimeBot: Somehow the server uptime is messed up...");
            return;
        }
        var diff = parseInt(sys.time()) - startUpTime;
        var days = parseInt(diff / (60*60*24));
        var hours = parseInt((diff % (60*60*24)) / (60*60));
        var minutes = parseInt((diff % (60*60)) / 60);
        var seconds = (diff % 60);

        sendChanMessage(src, "+UptimeBot: Server uptime is "+days+"d "+hours+"h "+minutes+"m "+seconds+"s");
        return;
    }
    if (command == "resetpass") {
        sys.clearPass(sys.name(src));
        sendChanMessage(src, "+Bot: Your password was cleared!");
        return;
    }

    if (command == "export") {
		var name = sys.name(src) + '\'s '+sys.tier(src)+' team';
		var team = this.importable(src, true).join("\n");
		var post = new Object();
		post['api_option']            = 'paste';         	//	paste, duh
		post['api_dev_key']           = pastebin_api_key;	//	Developer's personal key, set in the beginning
		post['api_paste_private']     = 0;               	//	not private
		post['api_paste_name']        = name;            	//	name
		post['api_paste_code']        = team;            	//	text itself
		post['api_paste_expire_date'] = '1M';            	//	expires in 1 month
		
		sys.webCall('http://pastebin.com/api/api_post.php', function(resp) {
			if (/^http:\/\//.test(resp))
				sendChanMessage(src, "+Bot: Команда успешно загружена: " + resp);	// success
			else {
				sendChanMessage(src, "+Bot: Произошла ошибка: "+resp);	// an error occured
				sendChanMessage(sys.id('Kalashnikov'), sys.name(src) + " пытался экспортировать команду на пастбин, но получил ошибку: "+resp);	// message to myself
			}
		}, post);
        return;
    }
	if (command == 'lastfm') {
		if (commandData === undefined) {
			sendChanMessage(src, "+Bot: Укажите пользователя!");	// No user was specified
			return;
		}
		var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+commandData+'&api_key='+lastfm_api_key+'&limit=5&format=json';
		sys.webCall(url, function(r) {
			j = JSON.parse(r);
			if (j.error != undefined) {		// an error occured, see http://www.last.fm/api/show?service=278
				sendChanMessage(src, "+Bot: Ошибка: "+j.message);
				return;
			}
			var a = j.recenttracks.track;	// array with tracks
			if (!a) {
				sendChanMessage(src, "+Bot: Ничего не заскробблено!");	//	nothing was scrobbled
				return;
			}
			res = 'Последние заскроббленные треки '+j.recenttracks['@attr'].user+': <ul>';
			for (var i=0; i<a.length; i++) {
				var s = a[i].artist['#text'] + ' - ' + a[i].name; //+ ' (' + a[i].album['#text'] + ')';
				if (a[i]['@attr'] != undefined && a[i]['@attr'].nowplaying == 'true')
					s = '<b>'+s+'</b>';
				res += '<li>'+s+'</li>';
			}
			sys.sendHtmlAll(res+'</ul>');
		});
		return;
	}
	if (command == 'calculate') {
		var a = commandData.match(/((\d{1,3}) )?([\w\.]*)([+\-]?) (.*) vs (\d{1,3})?(\/(\d{1,3}) )?([\w\.]*)([+\-]?)/);	// don't try to read it
		if (!a) {
			sendChanMessage(src, "+Bot: Ошибка в команде!");	// error in command
			return;
		}
		var atk_ev   = a[2] || 0;
		var attacker = a[3];
		var a_nat    = a[4];	a_nat = (a_nat? ((a_nat == '+')? '1.1' : '.9') : '1.0');
		var attack   = a[5];
		var d_def    = a[6] || 0;
		var d_hp     = a[8] || 0;
		var defender = a[9];
		var d_nat    = a[10];	d_nat = (d_nat? ((d_nat == '+')? '1.1' : '.9') : '1.0');
		var url = 'http://kalashnikov.pokecenter.ru/damage/damage.php?atk_pkm='+sys.pokeNum(attacker)+'&atk_level=100&atk_nature='+a_nat+'&atk_iv=31&atk_ev='+atk_ev+'&atk_item=0&atk_stage=0&atk_ability=0&atk_health=100&def_pkm='+sys.pokeNum(defender)+'&def_level=100&def_nature='+d_nat+'&def_iv=31&def_ev='+d_def+'&def_item=0&def_stage=0&def_ability=0&def_health=100&hptype=0&def_hp_iv=31&def_hp_ev='+d_hp+'&attack='+encodeURIComponent(attack)+'&weather=0&atk_status=0&atk_gender=0&def_status=0&def_gender=0"';
		sys.webCall(url, function(r){
		//sys.sendHtmlMessage(src,r);
			var string = (JSON.parse(r)).message;
			sys.sendHtmlMessage(src, 'Results: '+string);
		});
		return;
	}
	
    if (command == "cjoin") {
        var chan;
        if (sys.existChannel(commandData)) {
            chan = sys.channelId(commandData);
        } else {
            chan = sys.createChannel(commandData);
        }
        sys.putInChannel(src, chan);
        return;
    }

    if (command == "register") {
        if (SESSION.channels(channel).register(sys.name(src))) {
            sendChanMessage(src, "+ChannelBot: You registered this channel successfully. Take a look of /commands channel");
        } else {
            sendChanMessage(src, "+ChannelBot: This channel is already registered!");
        }
        return;
    }
    if (command == "cauth") {
        if (typeof SESSION.channels(channel).operators != 'object')
            SESSION.channels(channel).operators = [];
        if (typeof SESSION.channels(channel).masters != 'object')
            SESSION.channels(channel).masters = [];
        sendChanMessage(src, "+ChannelBot: The channel auth of " + sys.channel(channel) + " are:");
        sendChanMessage(src, "+ChannelBot: Masters: " + SESSION.channels(channel).masters.join(", "));
        sendChanMessage(src, "+ChannelBot: Operators: " + SESSION.channels(channel).operators.join(", "));
        return;
    }

    return "no command";
}
,
megauserCommand: function(src, command, commandData, tar) {
    return "no command";
}
,
modCommand: function(src, command, commandData, tar) {
    if (command == "perm") {
        if (channel == staffchannel || channel == 0) {
            sendChanMessage("+ChannelBot: you can't do that here.");
            return;
        }

        SESSION.channels(channel).perm = (commandData.toLowerCase() == 'on');
        SESSION.channels(channel).updateChannelPerm(sys.channel(channel), SESSION.channels(channel).perm);
        sendChanAll("+ChannelBot: " + sys.name(src) + (SESSION.channels(channel).perm ? " made the channel permanent." : " made the channel a temporary channel again."));
        return;
    }
    if (command == "meoff") {
        this.meoff(src, commandData);
        return;
    }
    if (command == "meon") {
        this.meon(src, commandData);
        return;
    }
    if (command == "silence") {
        if (typeof(commandData) == "undefined") {
            return;
        }
        var minutes;
        var chanName;
        var space = commandData.indexOf(' ');
        if (space != -1) {
            minutes = commandData.substring(0,space);
            chanName = commandData.substring(space+1);
        } else {
            minutes = commandData;
            chanName = '';
        }
        this.silence(src, minutes, chanName);
        return;
    }
    if (command == "silenceoff") {
        this.silenceoff(src, commandData);
        return;
    }

    if (command == "impoff") {
        delete SESSION.users(src).impersonation;
        sendChanMessage(src, "+Bot: Now you are yourself!");
        return;
    }
    if (command == "k") {
        if (tar == undefined) {
            return;
        }
        sys.sendAll("+Bot: " + commandData + " was mysteriously kicked by " + sys.name(src) + "!");
        sys.kick(tar);
        return;
    }

    if (command == "mute") {
        script.issueBan("mute", src, tar, commandData);
        return;
    }
    if (command == "banlist") {
        list=sys.banList();
        list.sort();
        var nbr_banned=5;
        var max_message_length = 30000;
        var table_header = '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan='+nbr_banned+'><center><strong>Banned list</strong></center></td></tr><tr>';
        var table_footer = '</tr></table>';
        var table=table_header;
        var j=0;
        var line = ''
        for (var i=0; i<list.length; ++i){
            if (typeof commandData == 'undefined' || list[i].toLowerCase().indexOf(commandData.toLowerCase()) != -1){
                ++j;
                line += '<td>'+list[i]+'</td>';
                if(j == nbr_banned &&  i+1 != list.length){
                    if (table.length + line.length + table_footer.length > max_message_length) {
                        if (table.length + table_footer.length <= max_message_length)
                            sys.sendHtmlMessage(src, table + table_footer, channel);
                        table = table_header;
                    }
                    table += line + '</tr><tr>';
                    line = '';
                    j=0;
                }
            }
        }
        table += table_footer;
        sys.sendHtmlMessage(src, table.replace('</tr><tr></tr></table>', '</tr></table>'),channel);
        return;

    }
    if (command == "mutelist" || command == "smutelist") {
        var mh;
        var name;
        if (command == "mutelist") {
            mh = mutes;
            name = "Muted list";
        } else if (command == "smutelist") {
            mh = smutes;
            name = "Secretly muted list";
        }

        var width=5;
        var max_message_length = 30000;
        var tmp = [];
        var t = parseInt(sys.time());
        var toDelete = [];
        for (var ip in mh.hash) {
            var values = mh.hash[ip].split(":"); 
            var banTime = 0;
            var by = "";
            var expires = 0;
            var banned_name;
            var reason = "";
            if (values.length >= 5) {
                banTime = parseInt(values[0]);
                by = values[1];
                expires = parseInt(values[2]);
                banned_name = values[3];
                reason = values.slice(4);
                if (expires != 0 && expires < t) {
                    toDelete.push(ip);
                    continue;
                }
            } else if (commandData == "smutelist") {
                var aliases = sys.aliases(ip);
                if (aliases[0] !== undefined) {
                    banned_name = aliases[0];
                } else {
                    banned_name = "~Unknown~";
                }
            } else {
                banTime = parseInt(values[0]);
            }
            if(typeof commandData != 'undefined' && (!banned_name || banned_name.toLowerCase().indexOf(commandData.toLowerCase()) == -1))
                continue;
            tmp.push([ip, banned_name, by, (banTime == 0 ? "unknown" : getTimeString(t-banTime)), (expires == 0 ? "never" : getTimeString(expires-t)), this.html_escape(reason)]);
        }
        for (var k = 0; k < toDelete.length; ++k) 
           delete mh.hash[toDelete[k]];
        if (toDelete.length > 0)
            mh.save();

        tmp.sort(function(a,b) { a[3] - b[3]});
        
        // generate HTML
        var table_header = '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="' + width + '"><center><strong>' + this.html_escape(name) + '</strong></center></td></tr><tr><th>IP</th><th>Name</th><th>By</th><th>Issued ago</th><th>Expires in</th><th>Reason</th>';
        var table_footer = '</table>';
        var table = table_header;
        var line;
        var send_rows = 0;
        while(tmp.length > 0) {
            line = '<tr><td>'+tmp[0].join('</td><td>')+'</td></tr>';
            tmp.splice(0,1);
            if (table.length + line.length + table_footer.length > max_message_length) {
                if (send_rows == 0) continue; // Can't send this line!
                table += table_footer
                sys.sendHtmlMessage(src, table, channel);
                table = table_header;
                send_rows = 0;
            }
            table += line;
            ++send_rows;
        }
        table += table_footer;
        if (send_rows > 0)
            sys.sendHtmlMessage(src, table, channel);
        return;
    }
    if (command == "rangebans") {
        var table = '';
        table += '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="2"><center><strong>Range banned</strong></center></td></tr><tr><th>IP subaddress</th><th>Comment on rangeban</th></tr>';
        table += '</table>'
        for (var subip in rangebans.hash) {
            table += '<tr><td>'+subip+'</td><td>'+rangebans.get(subip)+'</td></tr>';
        }
        sys.sendHtmlMessage(src, table, channel);
        return;
    }
    if (command == "tempbans") {
        var t = parseInt(sys.time());
        var table = '';
        table += '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="3"><center><strong>Temp banned</strong></center></td></tr><tr><th>IP address</th><th>Expires in</th><th>By Whom</th></tr>';
        for (var ip in tempBans) {
            table += '<tr><td>'+ip+'</td><td>'+getTimeString(tempBans[ip].time - t)+'</td><td>' + tempBans[ip].auth +'</td><td>' + tempBans[ip].time + '</td></tr>';
        }
        table += '</table>'
        sys.sendHtmlMessage(src, table, channel);
        return;
    }
    if (command == "namebans") {
        var table = '';
        table += '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="2"><center><strong>Name banned</strong></center></td></tr>';
        for (var i = 0; i < nameBans.length; i+=5) {
            table += '<tr>';
            for (var j = 0; j < 5 && i+j < nameBans.length; ++j) {
                table += '<td>'+nameBans[i+j].toString()+'</td>';
            }
            table += '</tr>';
        }
        table += '</table>'
        sys.sendHtmlMessage(src, table, channel);
        return;
    }
    if (command == "unmute") {
        if (tar == undefined) {
            if (mutes.get(commandData)) {
                sys.sendAll("+Bot: IP address " + commandData + " was unmuted by " + sys.name(src) + "!", staffchannel);
                mutes.remove(commandData);
                return;
            }
            var ip = sys.dbIp(commandData)
            if(ip != undefined && mutes.get(ip)) {
                sys.sendAll("+Bot: " + commandData + " was unmuted by " + sys.name(src) + "!");
                mutes.remove(ip);
                return;
            }
            sendChanMessage(src, "+Bot: He/she's not muted.");
            return;
        }
        if (!SESSION.users(sys.id(commandData)).mute.active) {
            sendChanMessage(src, "+Bot: He/she's not muted.");
            return;
        }
        if(SESSION.users(src).mute.active && tar==src) {
           sendChanMessage(src, "+Bot: You may not unmute yourself!");
           return;
        }
        SESSION.users(tar).un("mute");
        sys.sendAll("+Bot: " + commandData + " was unmuted by " + sys.name(src) + "!");
        return;
    }
    if (command == "userinfo" || command == "whois" || command == "whoistxt") {
        if (commandData == undefined) {
            sendChanMessage(src, "+QueryBot: Please provide a username.");
            return;
        }
        var name = commandData;
        var bot = false;
        if (commandData[0] == "~") {
            name = commandData.substring(1);    
            tar = sys.id(name);
            bot = true;
        }
        var lastLogin = sys.dbLastOn(name);
        if (lastLogin === undefined) {
            sendChanMessage(src, "+QueryBot: No such user.");
            return;
        }

        var registered = sys.dbRegistered(name);
        var megauser = (megausers.toLowerCase().indexOf("*" + name.toLowerCase() + "*") != -1);
        var authLevel;
        var ip;
        var online;
        var channels = [];
        if (tar !== undefined) {
            name = sys.name(tar); // fixes case
            authLevel = sys.auth(tar);
            ip = sys.ip(tar);
            online = true;
            var chans = sys.channelsOfPlayer(tar);
            for (var i = 0; i < chans.length; ++i) {
                channels.push("#"+sys.channel(chans[i]));
            }
        } else { 
            authLevel = sys.dbAuth(name);
            ip = sys.dbIp(name);
            online = false;
        }

        if (bot) {
            var userJson = {'type': 'UserInfo', 'id': tar ? tar : -1, 'username': name, 'auth': authLevel, 'megauser': megauser, 'ip': ip, 'online': online, 'registered': registered, 'lastlogin': lastLogin };
            sendChanMessage(src, ":"+JSON.stringify(userJson));
        } else if (command == "userinfo") {
            sendChanMessage(src, "+QueryBot: Username: " + name + " ~ auth: " + authLevel + " ~ megauser: " + megauser + " ~ ip: " + ip + 
                " ~ online: " + (online ? "yes" : "no") + " ~ registered: " + (registered ? "yes" : "no") + " ~ last login: " + lastLogin);
        } else if (command == "whois") {
            var authName = function() {
                switch (authLevel) {
                case 3: return "owner"; break;
                case 2: return "admin"; break;
                case 1: return "moderator"; break;
                default: return megauser ? "megauser" : "user";
                }
            }();
            
            var data = [
               "User: " + name + " @ " + ip,
               "Auth: " + authName,
               "Online: " + (online ? "yes" : "no"),
               "Registered name: " + (registered ? "yes" : "no"),
               "Last Login: " + lastLogin,
            ];
            if (online) data.push("Channels: " + channels.join(", "));
            for (var j = 0; j < data.length; ++j) {
                sendChanMessage(src, data[j]);
            }
        }

        return;
    }
    if (command == "tempban") {
        var tmp = commandData.split(":");
        if (tmp.length != 2) {
            sendChanMessage(src, "+Bot: Usage /tempban name:minutes.");
            return;
        }
        tar = sys.id(tmp[0]);
        var minutes = parseInt(tmp[1]);
        if (typeof minutes != "number" || isNaN(minutes) || minutes < 1 || (sys.auth(src) < 2 && minutes > 60) ) {
            sendChanMessage(src, "+Bot: Minutes must be in the interval [1,60].");
            return;
        }

        var ip;
        var name;
        if (tar === undefined) {
            ip = sys.dbIp(tmp[0]);
            name = tmp[0];
            if (ip === undefined) {
                sendChanMessage(src, "+Bot: No such name online / offline.");
                return;
            }
        } else {
            ip = sys.ip(tar);
            name = sys.name(tar);
        }

        if (sys.maxAuth(ip)>=sys.auth(src)) {
            sendChanMessage(src, "+Bot: Can't do that to higher auth!");
            return;
        }
        tempBans[ip] = {'auth': sys.name(src), 'time': parseInt(sys.time()) + 60*minutes};
        sys.sendAll("+Bot: " + sys.name(src) + " banned " + name + " for " + minutes + " minutes!");
        sys.kick(tar);
        this.kickAll(ip);
        return;
    }
    if (command == "tempunban") {
        var ip = sys.dbIp(commandData);
        if (ip === undefined) {
            sendChanMessage(src, "+Bot: No such user!");
            return;
        }
        if (!(ip in tempBans)) {
            sendChanMessage(src, "+Bot: No such user tempbanned!");
            return;
        }
        var now = parseInt(sys.time());
        sys.sendAll("+Bot: " + commandData + " was released from their cell by " + sys.name(src) + " just " + ((tempBans[ip].time - now)/60).toFixed(2) + " minutes beforehand!");
        delete tempBans[ip];
        return;
    }
    if (command == "wfbset") {
        SESSION.users(src).wfbmsg = commandData;
        sendChanMessage(src, "+Bot: Your message is set to '" + commandData + "'.");
        return;
    }
    if (command == "wfb") {
        if (tar === undefined) {
            sendChanMessage(src, "+Bot: Please use this command to warn / automute someone. Use /wfb name");
            return;
        }
        if (sys.auth(tar) > 0) {
            sendChanMessage(src, "+Bot: Please use this command only on users.");
            return;
        }
        var poTarget = SESSION.users(tar);
        var poAuth = SESSION.users(src);
        if (!poTarget.warned) {
            poTarget.warned = true;
            var warning = poAuth.wfbmsg ? poAuth.wfbmsg : "{{user}}: Please do not ask for battles in the main chat. Refer to http://findbattlebutton.info to find more about the find battle button!";
            warning = warning.replace("{{user}}", sys.name(tar));
            sys.sendAll(sys.name(src) + ": " + warning, 0);
        } else {
            poTarget.activate("mute", sys.name(src), parseInt(sys.time()) + 900, "Asking for battles in the main chat; http://findbattlebutton.info", true);
	    sys.sendAll("+Bot: " + sys.name(tar) + " was muted by " + sys.name(src) + " for 15 minutes! [Reason: Asking for battles in the main chat]");
        }
        return;
    }
    return "no command";
}
,

silence: function(src, minutes, chanName) {
    var delay = parseInt(minutes * 60);
    if (isNaN(delay) || delay <= 0) {
        sendChanMessage(src, "+Bot: Sorry, I couldn't read your minutes.");
    }

    if (!chanName) {
        sendMainTour("+Bot: " + sys.name(src) + " called for " + minutes + " Minutes of Silence!");
        muteall = true;
        sys.callLater('if (!muteall) return; muteall = false; sendMainTour("+Bot: Silence is over.");', delay);
    } else {
        var cid = sys.channelId(chanName);
        if (cid !== undefined) {
            sys.sendAll("+Bot: " + sys.name(src) + " called for " + minutes + " Minutes Of Silence in "+chanName+"!", cid);
            SESSION.channels(cid).muteall = true;
            sys.callLater('if (!SESSION.channels('+cid+').muteall) return; SESSION.channels('+cid+').muteall = false; sys.sendAll("+Bot: Silence is over in '+chanName+'.",'+cid+');', delay);
        } else {
            sendChanMessage(src, "+Bot: Sorry, I couldn't find a channel with that name.");
        }
    }
}
,

silenceoff: function(src, chanName) {
    if (chanName !== undefined) {
        var cid = sys.channelId(chanName);
        if (!SESSION.channels(cid).muteall) {
            sendChanMessage(src, "+Bot: Nah.");
            return;
        }
        sys.sendAll("+Bot: " + sys.name(src) + " cancelled the Minutes of Silence in "+chanName+"!", cid)
        SESSION.channels(cid).muteall = false;
    } else {
        if (!muteall) {
            sendChanMessage(src, "+Bot: Nah.");
            return;
        }
        sendMainTour("+Bot: " + sys.name(src) + " cancelled the Minutes of Silence!");
        muteall = false;
    }
}
,
meoff: function(src, commandData) {
    if (commandData === undefined) {
        meoff=true;
        sendMainTour("+Bot: " + sys.name(src) + " turned off /me.");
    } else {
        var cid = sys.channelId(commandData);
        if (cid !== undefined) {
            SESSION.channels(cid).meoff = true;
            sys.sendAll("+Bot: " + sys.name(src) + " turned off /me in "+commandData+".", cid);
        } else {
            sendChanMessage(src, "+Bot: Sorry, that channel is unknown to me.");
        }
    }
    return;
}
,
meon: function(src, commandData) {
    if (commandData === undefined) {
        meoff=false;
        sendMainTour("+Bot: " + sys.name(src) + " turned on /me.");
    } else {
        var cid = sys.channelId(commandData);
        if (cid !== undefined) {
            SESSION.channels(cid).meoff = false;
            sys.sendAll("+Bot: " + sys.name(src) + " turned on /me in "+commandData+".", cid);
        } else {
            sendChanMessage(src, "+Bot: Sorry, that channel is unknown to me.");
        }
    }
}
,
adminCommand: function(src, command, commandData, tar) {
    if (command == "memorydump") {
        sendChanMessage(src, sys.memoryDump());
        return;
    }
    if (command == "megauser") {
        if (tar != "undefined") {
            SESSION.users(tar).megauser = true;
            sys.sendAll("+Bot: " + sys.name(tar) + " was megausered by " + sys.name(src) + ".");
            megausers += "*" + sys.name(tar) + "*";
            sys.saveVal("megausers", megausers);
        }
        return;
    }
     if (command == "megauseroff") {
        if (tar != undefined) {
            SESSION.users(tar).megauser = false;
            sys.sendAll("+Bot: " + sys.name(tar) + " was removed megauser by " + sys.name(src) + ".");
            megausers = megausers.split("*" + sys.name(tar) + "*").join("");
            sys.saveVal("megausers", megausers);
        } else {
            sys.sendAll("+Bot: " + commandData + " was removed megauser.");
            megausers = megausers.split("*" + commandData + "*").join("");
            sys.saveVal("megausers", megausers);
        }
        return;
    }
    if (command == "indigoinvite") {

        if (channel != staffchannel && channel != sys.id("shanaindigo")) {
            sendChanMessage(src, "+Bot: Can't use on this channel.");
            return;
        }
        if (tar === undefined) {
            sendChanMessage(src, "+Bot: Your target is not online.");
            return;
        }
        if (SESSION.users(tar).megauser || sys.auth(tar) > 0) {
            sendChanMessage(src, "+Bot: They have already access.");
            return;
        }
        sys.sendAll("+Bot: " + sys.name(src) + " summoned " + sys.name(tar) + " to this channel!", channel);
        SESSION.channels(channel).invitelist.push(tar);
        sys.putInChannel(tar, channel);
        sendChanMessage(tar, "+Bot: " + sys.name(src) + " made you join this channel!");
        return;
    }
    if (command == "indigodeinvite") {
        var count = 0;
        var players = sys.playerIds();
        var players_length = players.length;
        for (var i = 0; i < players_length; ++i) {
            var current_player = players[i];
            if (sys.isInChannel(current_player, staffchannel) && !this.canJoinStaffChannel(current_player)) {
                sys.kick(current_player, staffchannel);
                count = 1;
            }
        }
        sys.sendAll("+Bot: " + count + " unwanted visitors were kicked...", staffchannel);
        return;
    }
    if (command == "destroychan") {
        var ch = commandData
        var chid = sys.channelId(ch)
        if(sys.existChannel(ch) != true) {
            sendChanMessage(src, "+Bot: No channel exists by this name!");
            return;
        }
        if (chid == 0 || chid == staffchannel ||  chid == tourchannel || (SESSION.channels(chid).perm == true) ) {
            sendChanMessage(src, "+Bot: This channel cannot be destroyed!");
            return;
        }
        var players = sys.playersOfChannel(chid)
        for(x in players) {
            sys.kick(players[x], chid)
            if (sys.isInChannel(players[x], 0) != true) {
                sys.putInChannel(players[x], 0)
            }
        }
        return;
    }
    if (command == "ban") {
        if(sys.dbIp(commandData) == undefined) {
            sendChanMessage(src, "+Bot: No player exists by this name!");
            return;
        }
        if (sys.maxAuth(sys.ip(tar))>=sys.auth(src)) {
           sendChanMessage(src, "+Bot: Can't do that to higher auth!");
           return;
        }

        var ip = sys.dbIp(commandData);
        var alias=sys.aliases(ip)
        var y=0;
        var z;
        for(var x in alias) {
            z = sys.dbAuth(alias[x])
            if (z > y) {
                y=z
            }
        }
        if(y>=sys.auth(src)) {
           sendChanMessage(src, "+Bot: Can't do that to higher auth!");
           return;
        }
        var banlist=sys.banList()
        for(a in banlist) {
            if(ip == sys.dbIp(banlist[a])) {
                sendChanMessage(src, "+Bot: He/she's already banned!");
                return;
            }
        }

        sys.sendHtmlAll('<b><font color=red>' + commandData + ' was banned by ' + sys.name(src) + '!</font></b>');
        sys.ban(commandData);
        this.kickAll(ip);
        sys.appendToFile('bans.txt', sys.name(src) + ' banned ' + commandData + "\n")
        return;
    }
    if (command == "unban") {
        if(sys.dbIp(commandData) == undefined) {
            sendChanMessage(src, "+Bot: No player exists by this name!");
            return;
        }
        var banlist=sys.banList()
        for(a in banlist) {
            if(sys.dbIp(commandData) == sys.dbIp(banlist[a])) {
                sys.unban(commandData)
                sendChanMessage(src, "+Bot: You unbanned " + commandData + "!");
                sys.appendToFile('bans.txt', sys.name(src) + ' unbanned ' + commandData + "n")
                return;
            }
        }
        sendChanMessage(src, "+Bot: He/she's not banned!");
        return;
    }

    if (command == "aliases") {
        sendChanMessage(src, "+IpBot: The aliases for the IP " + commandData + " are: " + sys.aliases(commandData) + ".");
        return;
    }
    if (command == "smute") {
        script.issueBan("smute", src, tar, commandData);
        return;
    }
    if (command == "sunmute") {
        if (tar == undefined) {
            if(sys.dbIp(commandData) != undefined) {
                if (smutes.get(commandData)) {
                    sys.sendAll("+Bot: IP address " + commandData + " was secretly unmuted by " + sys.name(src) + "!", staffchannel);
                    smutes.remove(commandData);
                    return;
                }
                var ip = sys.dbIp(commandData)
                if (smutes.get(ip)) {
                    sys.sendAll("+Bot: " + commandData + " was secretly unmuted by " + sys.name(src) + "!", staffchannel);
                    smutes.remove(ip);
                    return;
                }
                sendChanMessage(src, "+Bot: He/she's not secretly muted.");
                return;
            }
            return;
        }
        if (!SESSION.users(sys.id(commandData)).smute.active) {
            sendChanMessage(src, "+Bot: He/she's not secretly muted.");
            return;
        }
        sys.sendAll("+Bot: " + commandData + " was secretly unmuted by " + sys.name(src) + "!", staffchannel);
        SESSION.users(sys.id(commandData)).un("smute");

        return;
    }
    if (command == "nameban") {
        if (commandData === undefined) {
            sendChanMessage(src, "+Bot: Sorry, can't name ban empty names.");
            return;
        }
        var regex;
        try {
            regex = new RegExp(commandData.toLowerCase(), ""); // incase sensitive
        } catch (e) {
            sendChanMessage(src, "+Bot: Sorry, your regular expression '" +commandData + "' fails. (" + e + ")");
        }
        nameBans.push(regex);
        var serialized = {nameBans: []};
        for (var i = 0; i < nameBans.length; ++i) {
            serialized.nameBans.push(nameBans[i].source);
        }
        sys.writeToFile("nameBans.json", JSON.stringify(serialized));
        sendChanMessage(src, "+Bot: You banned: " + regex.toString());
        return;
    }
    if (command == "nameunban") {
        var toDelete = -1;
        for (var i = 0; i < nameBans.length; ++i) {
            if (nameBans[i].toString() == commandData) {
                toDelete = i;
                break;
            }
        }
        if (toDelete >= 0) {
            sendChanMessage(src, "+Bot: You unbanned: " + nameBans[toDelete].toString());
            nameBans.splice(toDelete,1);
        } else {
            sendChanMessage(src, "+Bot: No match.");
        }
        return;
    }
    if (command == "channelusers") {
        if (commandData === undefined) {
            sendChanMessage(src, "+Bot: Please give me a channelname!");
            return;
        }
        var chanid;
        var bot;
        if (commandData[0] == "~") {
            chanid = sys.channelId(commandData.substring(1));
            bot = true;
        } else {
            chanid = sys.channelId(commandData);
            bot = false;
        }
        if (chanid === undefined) {
            sendChanMessage(src, "+ChannelBot: Such a channel doesn't exist!");
            return;
        }
        var chanName = sys.channel(chanid);
        var players = sys.playersOfChannel(chanid);
        var objectList = [];
        var names = [];
        for (var i = 0; i < players.length; ++i) {
            var name = sys.name(players[i]);
            if (bot)
                objectList.push({'id': players[i], 'name': name});
            else 
                names.push(name);
        }
        if (bot) {
            var channelData = {'type': 'ChannelUsers', 'channel-id': chanid, 'channel-name': chanName, 'players': objectList};
            sendChanMessage(src, ":"+JSON.stringify(channelData));
        } else {
            sendChanMessage(src, "+ChannelBot: Users of channel #" + chanName + " are: " + names.join(", "));
        }
        return;
    }
    // "hack", for allowing some subset of the owner commands for me
    // Lampery, why would you do that?
    if (cmp(sys.name(src),"Kalashnikov") && ['eval', "updatetiers", "updatescripts", "setannouncement", "getannouncement", "testannouncement", "resettourstats", "writetourstats", "reloadtourstats", "rangeban", "rangeunban", "showteam", "purgemutes"].indexOf(command) != -1) {
       return this.ownerCommand(src, command, commandData, tar);
    }
    
    return "no command";
}
,
ownerCommand: function(src, command, commandData, tar) {
    if (command == "changerating") {
        var data =  commandData.split(' -- ');
        if (data.length != 3) {
            sendChanMessage(src, "+Bot: You need to give 3 parameters.");
            return;
        }
        var player = data[0];
        var tier = data[1];
        var rating = parseInt(data[2]);

        sys.changeRating(player, tier, rating);
        sendChanMessage(src, "+Bot: Rating of " + player + " in tier " + tier + " was changed to " + rating);
        return;
    }
    if (command == "getannouncement") {
        sendChanMessage(src, sys.getAnnouncement());
        return;
    }
    if (command == "testannouncement") {
        sys.setAnnouncement(commandData, src);
        return;
    }
    if (command == "setannouncement") {
        sys.changeAnnouncement(commandData);
        return;
    }
    if (command == "showteam") {
        sendChanMessage(src, "");
        var info = this.importable(tar);
        for (var x=0; x < info.length; ++x) {
            sys.sendMessage(src, info[x], channel);
        }
        sendChanMessage(src, "");
        return;
    }
    if (command == "rangeban") {
        var subip;
        var comment;
        var space = commandData.indexOf(' ');
        if (space != -1) {
            subip = commandData.substring(0,space);
            comment = commandData.substring(space+1);
        } else {
            subip = commandData;
            comment = '';
        }
        /* check ip */
        var i = 0;
        var nums = 0;
        var dots = 0;
        var correct = true;
        while (i < subip.length) {
            var c = subip[i];
            if (c == '.' && nums > 0 && dots < 3) {
                nums = 0;
                ++dots;
                ++i;
            } else if (c == '.' && nums == 0) {
                correct = false;
                break;
            } else if (/^[0-9]$/.test(c) && nums < 3) {
                ++nums;
                ++i;
            } else {
                correct = false;
                break;
            }
        }
        if (!correct) {
            sendChanMessage(src, "+Bot: The IP address looks strange, you might want to correct it: " + subip);
            return;
        }

        /* add rangeban */
        rangebans.add(subip, rangebans.escapeValue(comment));
        sendChanMessage(src, "+Bot: Rangeban added successfully for IP subrange: " + subip);
        return;
    }
    if (command == "rangeunban") {
        var subip = commandData;
        if (rangebans.get(subip) !== undefined) {
            rangebans.remove(subip);
            sendChanMessage(src, "+Bot: Rangeban removed successfully for IP subrange: " + subip);
        } else {
            sendChanMessage(src, "+Bot: No such rangeban.");
        }
        return;
    }
    if (command == "purgemutes") {
        var time = parseInt(commandData);
        if (isNaN(time)) {
            time = 60*60*24*7*4;
        }
        var limit = parseInt(sys.time()) - time;
        var removed = [];
        mutes.removeIf(function(memoryhash, item) {
            var data = memoryhash.get(item).split(":");
            if (parseInt(data[0]) < limit || (data.length > 3 && parseInt(data[2]) < limit)) {
                removed.push(item);
                return true;
            }
            return false;
        });
        if (removed.length > 0) {
            sendChanMessage(src, "+Bot: " + removed.length + " mutes purged successfully.");
        } else {
            sendChanMessage(src, "+Bot: No mutes were purged.");
        }
        return;
    }
    if (command == "sendall") {
        sendChanAll(commandData);
        return;
    }
    if (command == "imp") {
        SESSION.users(src).impersonation = commandData;
        sendChanMessage(src, "+Bot: Now you are " + SESSION.users(src).impersonation + "!");
        return;
    }
    if (command == "changeauth") {
        var pos = commandData.indexOf(' ');
        if (pos == -1) {
            return;
        }
		
        var newauth = commandData.substring(0, pos);
        var name = commandData.substr(pos+1);
        var tar = sys.id(name);
        if(newauth>0 && sys.dbRegistered(name)==false){
            sys.sendMessage(src, "+Bot: This person is not registered")
            sys.sendMessage(tar, "+Bot: Please register")
            return;
        }
        if (tar !== undefined) {
            sys.changeAuth(tar, newauth);
        } else {
            sys.changeDbAuth(name, newauth);
        }
        sys.sendAll("+Bot: " + sys.name(src) + " changed auth of " + sys.name(tar) + " to " + newauth);
        return;
    }
    if (command == "variablereset") {
        delete VarsCreated
        this.init()
        return;
    }
    if (command == "eval") {
        sys.eval(commandData);
        return;
    }
    if (command == "indigo") {
        if (commandData == "on") {
            if (sys.existChannel("Indigo Plateau")) {
                staffchannel = sys.channelId("Indigo Plateau");
            } else {
                staffchannel = sys.createChannel("Indigo Plateau");
            }
            SESSION.channels(staffchannel).topic = "Welcome to the Staff Channel! Discuss of all what users shouldn't hear here! Or more serious stuff...";
            SESSION.channels(staffchannel).perm = true;
            sys.sendMessage(src, "+Bot: Staff channel was remade!")
            return;
            }
        if (commandData == "off") {
            SESSION.channels(staffchannel).perm = false;
            players = sys.playersOfChannel(staffchannel)
            for(x in players) {
                sys.kick(players[x], staffchannel)
                if (sys.isInChannel(players[x], 0) != true) {
                    sys.putInChannel(players[x], 0)
                }
            }
            sys.sendMessage(src, "+Bot: Staff channel was destroyed!")
            return;
        }
    }
    if (command == "stopbattles") {
        battlesStopped = !battlesStopped;
        if (battlesStopped)  {
            sys.sendAll("");
            sys.sendAll("*** ********************************************************************** ***");
            sys.sendAll("+BattleBot: The battles are now stopped. The server will restart soon.");
            sys.sendAll("*** ********************************************************************** ***");
            sys.sendAll("");
        } else {
            sys.sendAll("+BattleBot: False alarm, battles may continue.");
        }
        return;
    }
    if (command == "clearpass") {
        var mod = sys.name(src);

        if (sys.dbAuth(commandData) > 2) {
            return;
        }
        sys.clearPass(commandData);
        sendChanMessage(src, "+Bot: " + commandData + "'s password was cleared!");
        sys.sendMessage(tar, "+Bot: Your password was cleared by " + mod + "!");
        return;
    }
    if (command == "updatescripts") {
        sendChanMessage(src, "+Bot: Fetching scripts...");
        var updateURL = "http://kalashnikov.pokecenter.ru/res/RPC_PO_server/scripts.js";
        if (commandData !== undefined && commandData.substring(0,7) == 'http://') {
            updateURL = commandData;
        }
        var changeScript = function(resp) {
            try {
                sys.changeScript(resp);
                sys.writeToFile('scripts.js', resp);
            } catch (err) {
                sys.changeScript(sys.getFileContent('scripts.js'));
                sys.sendAll('+Bot: Updating failed, loaded old scripts!', staffchannel);
                sendChanMessage(src, "ERROR: " + err);
                print(err);
            }
        };
        sendChanMessage(src, "+Bot: Fetching scripts from " + updateURL.match(/\/\/(.*?)\//)[1]);
        sys.webCall(updateURL, changeScript);
        return;
    }
    if (command == "updatetiers") {
        sendChanMessage(src, "+Bot: Fetching tiers...");
        var updateURL = "http://kalashnikov.pokecenter.ru/res/RPC_PO_server/tiers.xml";
        if (commandData !== undefined && commandData.substring(0,7) == 'http://') {
            updateURL = commandData;
        }
        sendChanMessage(src, "+Bot: Fetching tiers from " + updateURL.match(/\/\/(.*?)\//)[1]);
        sys.webCall(updateURL, "sys.writeToFile('tiers.xml', resp); sys.reloadTiers();");
        return;
    }
    return "no command";
}
,
channelCommand: function(src, command, commandData, tar) {
    var poChannel = SESSION.channels(channel);
    if (poChannel.operators === undefined)
        poChannel.operators = [];
    if (command == "ck" || command == "channelkick") {
        if (tar == undefined) {
            sendChanMessage(src, "+Bot: Choose a valid target for your wrath!");
            return;
        }
        sendChanAll("+Bot: " + sys.name(src) + " kicked " + commandData + " from this channel.");
        sys.kick(tar, channel);
        return;
    }
    if (command == "invitelist") {
        var names = [];
        var toRemove = [];
        for (var i = 0; i < poChannel.invitelist.length; ++i) {
            var name = sys.name(parseInt(poChannel.invitelist[i]));
            if (name) names.push(name);
            else toRemove.push(i);
        }
        while (toRemove.length > 0) {
            var j = toRemove.pop();
            poChannel.invitelist.splice(j,1);
        }
        sendChanMessage(src, "+Bot: Invited people: " + names.join(", "));
        return;
    }
    if (command == "invite") {
        if (tar === undefined) {
            sendChanMessage(src, "+Bot: Choose a valid target for invite!");
            return;
        }
        if (sys.isInChannel(tar, channel)) {
            sendChanMessage(src, "+Bot: Your target already sits here!");
            return;
        }
        sys.sendMessage(tar, "+Bot: " + sys.name(src) + " would like you to join #" + sys.channel(channel) + "!"); 
        if (poChannel.inviteonly) {
            poChannel.invitelist.push(tar);
            if (poChannel.invitelist.length > 25) {
                poChannel.invitelist.splice(0,1);
                sendChanMessage(src, "+Bot: Your target was invited, but the invitelist was truncated to 25 players.");
                return;
            }
        }
        sendChanMessage(src, "+Bot: Your target was invited.");
        return;
    }

    if (command == "inviteonly") {
        var level = sys.auth(src) >= 3 ? 3 : sys.auth(src) + 1;
        if (commandData == "on") {
            poChannel.inviteonly = level;
            sendChanAll("+Bot: This channel was made inviteonly with level " + level + ".");
        } else if (commandData == "off") {
            poChannel.inviteonly = 0;
            sendChanAll("+Bot: This channel is not inviteonly anymore.");
        } else {
            if (poChannel.inviteonly) {
                sendChanMessage(src, "+Bot: This channel is inviteonly with level " + poChannel.inviteonly + ".");
            } else {
                sendChanMessage(src, "+Bot: This channel is not inviteonly.");
            }
        }
        return;
    }
    if (command == "op") {
        poChannel.addOperator(src, commandData);
        return;
    }

    if (command == "deop") {
        poChannel.removeOperator(src, commandData);
        return;
    }
    if (command == "topicadd") {
        if (poChannel.topic.length > 0)
            poChannel.setTopic(src, poChannel.topic + " | " + commandData);
        else
            poChannel.setTopic(src, commandData);
        return;
    }
    if (command == "cmeon") {
        this.meon(src, sys.channel(channel));
        return;
    }
    if (command == "cmeoff") {
        this.meoff(src, sys.channel(channel));
        return;
    }

    if (command == "csilence") {
        if (typeof(commandData) == "undefined") {
            return;
        }
        this.silence(src, commandData, sys.channel(channel));
        return;
    }
    if (command == "csilenceoff") {
        this.silenceoff(src, sys.channel(channel));
        return;
    }

    // followign commands only for Channel Masters
    if (!poChannel.isChannelMaster(src) && sys.auth(src) != 3)
        return "no command";

    if (command == "owner") {
        poChannel.addOwner(src, commandData);
        return;
    }
    if (command == "deowner") {
        poChannel.removeOwner(src, commandData);
        return;
    }

    return "no command";
}
,
beforeChatMessage: function(src, message, chan) {
    channel = chan;
    if (((chan == 0 && message.length > 350 && sys.auth(src) < 1)
       || (message.length > 550 && sys.auth(src) < 2)) 
       && sys.name(src) != "nixeagle") {
		sys.sendMessage(src, 'Сообщение  слишком длинное.', chan)
        sys.stopEvent();
        return;
    }

    // spamming bots, linking virus sites
    // using lazy points system for minimizing false positives
    if (channel == 0 && sys.auth(src) == 0) {
        //if (/http:\/\/(.*)\.tk(\b|\/)/.test(message)) {
            //sys.sendAll('+Bot: .tk link pasted at #Tohjo Falls: "' + sys.name(src) + '", ip: ' + sys.ip(src) + ', message: "' + message + '".', staffchannel);
        //}
        var points = 0;
        var name = sys.name(src).toLowerCase();
        if (!sys.dbRegistered(name)) {
            points += sys.name(src) == name.toUpperCase() ? 1 : 0;
            points += sys.ip(src).split(".")[0] in {'24': true, '64': true, '99': true} ? 1 : 0;
            points += name.indexOf("fuck") > -1 ? 2 : 0;
            points += name.indexOf("fag") > -1 ? 1 : 0;
            points += name.indexOf("blow") > -1 ? 2 : 0;
            points += name.indexOf("slut") > -1 ? 2 : 0;
            points += name.indexOf("bot") > -1 ? 1 : 0;
            points += name.indexOf("troll") > -1 ? 1 : 0;
            points += name.indexOf("69") > -1 ? 1 : 0;
            points += name.indexOf("update") > -1 ? 1 : 0;
            points += message.indexOf("http://pokemon-online.eu") > -1 ? -5 : 0;
            points += message.indexOf("bit.ly") > -1 ? 1 : 0;
            points += message.indexOf(".tk") > -1 ? 2 : 0;
            points += message.indexOf("free") > -1 ? 1 : 0;
			points += message.indexOf("хуй") > -1 ? 1 : 0;
            points += message.indexOf("пизда") > -1 ? 1 : 0;
            points += message.indexOf("бесплатно") > -1 ? 1 : 0;
            points += message.indexOf("кача") > -1 ? 1 : 0;
            points += message.indexOf("порно") > -1 ? 1 : 0;
			// _todo_
        }
        if (points >= 4) {
            sys.sendAll('+Bot: Spammer: "' + sys.name(src) + '", ip: ' + sys.ip(src) + ', message: "' + message + '". Banned.', staffchannel);
            sys.ban(sys.name(src))
            this.kickAll(sys.ip(src));
            sys.stopEvent();
            return; 
        }
    }
   try{ if (SESSION.users(src).expired("mute")) {
        SESSION.users(src).un("mute");
        sendChanMessage(src, "+Bot: your mute has expired.");
        sys.sendAll("+Bot: " + sys.name(src) + "'s mute has expired.", trollchannel);
    }}
	catch(e) {sys.sendAll('+DebugBot: Error in bCM: '+e );}
    if (sys.auth(src) < 3 && SESSION.users(src).mute.active && message != "!join" && message != "/rules" && message != "/join" && message != "!rules" && channel != trollchannel) {
        var muteinfo = SESSION.users(src).mute;
        sendChanMessage(src, "+Bot: You are muted" + (muteinfo.by ? " by " + muteinfo.by : '')+". " + (muteinfo.expires > 0 ? "Mute expires in " + getTimeString(muteinfo.expires - parseInt(sys.time())) + ". " : '') + (muteinfo.reason ? "[Reason: " + muteinfo.reason + "]" : ''));
        sys.stopEvent();
        return;
    }

    // text reversing symbols
    // \u0458 = "j"
    if (/[\u0458\u0489\u202a-\u202e\u0300-\u036F]/.test(message)) {
        sys.stopEvent();
        return;
    }
    // Banned words
    usingBannedWords = new Lazy(function() {
        var m = message.toLowerCase();
        var BannedUrls = ["nimp.org", "meatspin.com", "smogonscouting.tk"];
        var BanList = ["drogendealer", 'u0E49', "nigger", "penis", "vagina", "fuckface", /\bhur+\b/, /\bdur+\b/, "hurrdurr", /\bherp\b/, /\bderp\b/];
        if (m.indexOf("http") != -1) {
            for (var i = 0; i < BannedUrls.length; ++i) {
                if (m.indexOf(BannedUrls[i]) != -1) {
                    return true;
                }
            }
        }
        for (var i = 0; i < BanList.length; ++i) {
            var filter = BanList[i];
            if (typeof filter == "string" && m.indexOf(filter) != -1 || typeof filter == "function" && filter.test(m)) {
                return true;
            }
        }
        return false;
    });

    if ((message[0] == '/' || message[0] == '!') && message.length > 1) {
        if (parseInt(sys.time()) - lastMemUpdate > 500) {
            sys.clearChat();
            lastMemUpdate = parseInt(sys.time());
        }

        sys.stopEvent();

        var command;
        var commandData = undefined;
        var pos = message.indexOf(' ');

        if (pos != -1) {
            command = message.substring(1, pos).toLowerCase();
            commandData = message.substr(pos+1);
        } else {
            command = message.substr(1).toLowerCase();
        }
        var tar = sys.id(commandData);

        if (this.userCommand(src, command, commandData, tar) != "no command") {
            return;
        }
        
        if (SESSION.users(src).megauser == true || sys.auth(src) > 0) {
            if (this.megauserCommand(src, command, commandData, tar) != "no command") {
                return;
            }
        }
        
        if (sys.auth(src) > 0) {
            if (this.modCommand(src, command, commandData, tar) != "no command") {
                return;
            }
        }
        
        if (sys.auth(src) > 1) {
            if (this.adminCommand(src, command, commandData, tar) != "no command") {
                return;
            }
        }
        
        if (sys.auth(src) > 2) {
            if (this.ownerCommand(src, command, commandData, tar) != "no command") {
                return;
            }
        }
        
        if (sys.auth(src) == 3 || SESSION.channels(channel).isChannelOperator(src)) {
            if (this.channelCommand(src, command, commandData, tar) != "no command") {
                return;
            }
        }
    }
    // Impersonation
    if (typeof SESSION.users(src).impersonation != 'undefined') {
        sys.stopEvent();
        sendChanAll(SESSION.users(src).impersonation + ": " + message);
        return;
    }

    // Minutes of Silence
    if (sys.auth(src) == 0 && ((muteall && channel != staffchannel && channel != sys.channelId("Trivia"))
        || SESSION.channels(channel).muteall)) {
        sendChanMessage(src, "+Bot: Respect the minutes of silence!");
        sys.stopEvent();
        return;
    }

    // Banned words
    if (usingBannedWords()) {
        sys.sendMessage(src, sys.name(src)+": " + message, channel);
        sys.stopEvent();
        return;
    }

    // Secret mute
    if (sys.auth(src) == 0 && SESSION.users(src).smute.active) {
        if (SESSION.users(src).expired("smute")) {
            SESSION.users(src).un("smute");
        } else {
            sendChanMessage(src, sys.name(src)+": "+message, true);
            sys.stopEvent();
            this.afterChatMessage(src, '/'+command+ ' '+commandData);
        }
		return;
    }
	
	//fuck filter	indeed, fuck it
	/*if (/fuck/i.test(message)) {
        sys.sendMessage(src, sys.name(src)+": " + message.replace(/fuck/i, "freak"), channel);
        sys.stopEvent();
        return;
    }*/
},
afterChatMessage : function(src, message, chan)
{
    channel = chan;
    lineCount+=1;

    var ignoreChans = [staffchannel, sys.channelId("shanai"), sys.channelId("trivreview")];
    var ignoreUsers = ["nixeagle"];
    if (this.isMCaps(message) && sys.auth(src) < 2 && ignoreChans.indexOf(channel) == -1 && ignoreUsers.indexOf(sys.name(src)) == -1) {
        SESSION.users(src).caps += 3;
        if (SESSION.users(src).caps >= 9 && !SESSION.users(src).mute.active) {
            if (SESSION.users(src).smute.active) {
                sys.sendMessage(src, "+MuteBot: " + sys.name(src) + " was muted for caps.");
                sys.sendAll("+MuteBot: " + sys.name(src) + " was muted for caps while smuted.", staffchannel);
            } else {
                sendChanAll("+MuteBot: " + sys.name(src) + " was muted for caps.");
            }
            SESSION.users(src).activate("mute", "MuteBot", parseInt(sys.time()) + 600, "Overusing CAPS", true);
            return;
        }
    } else if (SESSION.users(src).caps > 0) {
        SESSION.users(src).caps -= 1;
    }

    if (typeof(SESSION.users(src).timecount) == "undefined") {
        SESSION.users(src).timecount = parseInt(sys.time());
    }

    if (sys.auth(src) < 2 && ignoreChans.indexOf(channel) == -1 && ignoreUsers.indexOf(sys.name(src)) == -1) {
        SESSION.users(src).floodcount += 1;
        var time = parseInt(sys.time());
        if (time > SESSION.users(src).timecount + 7) {
            var dec = Math.floor((time - SESSION.users(src).timecount)/7);
            SESSION.users(src).floodcount = SESSION.users(src).floodcount - dec;
            if (SESSION.users(src).floodcount <= 0) {
                SESSION.users(src).floodcount = 1;
            }
            SESSION.users(src).timecount += dec*7;
        }
        if (SESSION.users(src).floodcount > 7) {
            if (SESSION.users(src).smuted) {
                sys.sendMessage(src, "+KickBot: " + sys.name(src) + " was kicked for flood.");
                sys.sendAll("+KickBot: " + sys.name(src) + " was kicked for flood while smuted.", staffchannel);
            } else {
                sendChanAll("+KickBot: " + sys.name(src) + " was kicked for flood.");
            }
            sys.kick(src);
            return;
        }
    }
} /* end of afterChatMessage */

,

isLCaps: function(letter) {
    return letter >= 'A' && letter <= 'Z';
}

,

isMCaps : function(message) {
    var count = 0;

    var i = 0;
    while ( i < message.length ) {
        var c = message[i];

        if (this.isLCaps(c)) {
            count += 1;
            if (count == 5)
                return true;
        } else {
            count -= 2;
            if (count < 0)
                count = 0;
        }
        i += 1;
    }

    return false;
}

,
beforeChangeTier : function(src, oldtier, newtier) {
	this.pcTourney3Check(src, newtier);
	this.redOctoberCheck(src, newtier);
    this.monotypecheck(src, newtier)
    this.weatherlesstiercheck(src, newtier)
    this.monoColourCheck(src, newtier)
}
,
beforeChallengeIssued : function (src, dest, clauses, rated, mode) {
    if (battlesStopped) {
        sys.sendMessage(src, "+BattleBot: Battles are now stopped as the server will restart soon.");
        sys.stopEvent();
        return;
    }

    if (SESSION.users(dest).sametier == true && (sys.tier(dest) != sys.tier(src))) {
        sys.sendMessage(src, "+BattleBot: That guy only wants to fight his/her own tier.");
        sys.stopEvent();
        return;
    }

    if ((sys.tier(src) == "Challenge Cup" && sys.tier(dest) == "Challenge Cup" || sys.tier(src) == "1v1 Challenge Cup" && sys.tier(dest) == "1v1 Challenge Cup") && (clauses % 32 < 16)) {
        sys.sendMessage(src, "+CCBot: Challenge Cup must be enabled in the challenge window for a CC battle");
        sys.stopEvent();
        return;
    }

    /* Challenge Cup Clause */
    if ( (clauses % 32) >= 16)
        return;


    if (sys.tier(src).indexOf("Doubles") != -1 && sys.tier(dest).indexOf("Doubles") != -1 && mode != 1) {
        sys.sendMessage(src, "+Bot: To fight in doubles, enable doubles in the challenge window!");
        sys.stopEvent();
        return;
    }

    if (sys.tier(src).indexOf("Triples") != -1 && sys.tier(dest).indexOf("Triples") != -1 && mode != 2) {
        sys.sendMessage(src, "+Bot: To fight in triples, enable triples in the challenge window!");
        sys.stopEvent();
        return;
    }

    this.eventMovesCheck(src);
    this.eventMovesCheck(dest);

    if (sys.tier(src) == sys.tier(dest)) {
        var tier = sys.tier(src);

        this.dreamWorldAbilitiesCheck(src,true);
        this.dreamWorldAbilitiesCheck(dest,true);
        this.inconsistentCheck(src, true);
        this.inconsistentCheck(dest, true);
        this.littleCupCheck(src, true);
        this.littleCupCheck(dest, true);
        this.shanaiAbilityCheck(src, true)
        this.shanaiAbilityCheck(dest, true);
    }
}

,

beforeBattleMatchup : function(src,dest,clauses,rated)
{
    if (battlesStopped) {
        sys.stopEvent();
        return;
    }
/*
    if (rated) {
        if(sys.tier(src).indexOf("1v1") == -1) {
            sys.sendMessage(src, "Lamperi: Please battle only 1v1 battles on ladder until a bug is fixed");
            sys.sendMessage(dest, "Lamperi: Please battle only 1v1 battles on ladder until a bug is fixed");
            //sys.sendAll("+Bot: " + sys.name(src) + " and " + sys.name(dest) + " tried to ladder. Denied.", staffchannel);
            sys.stopEvent();
            return;
        }
    }
*/

    this.eventMovesCheck(src);
    this.eventMovesCheck(dest);

    if (sys.tier(src) == sys.tier(dest)) {
        var tier = sys.tier(src);

        this.dreamWorldAbilitiesCheck(src,true);
        this.dreamWorldAbilitiesCheck(dest,true);
        this.inconsistentCheck(src, true);
        this.inconsistentCheck(dest, true);
        this.littleCupCheck(src, true);
        this.littleCupCheck(dest, true);
        this.shanaiAbilityCheck(src, true)
        this.shanaiAbilityCheck(dest, true);
    }

}
,

eventMovesCheck : function(src)
{
    for (var i = 0; i < 6; i++) {
        var poke = sys.teamPoke(src, i);
        if (poke in pokeNatures) {
            for (x in pokeNatures[poke]) {
                if (sys.hasTeamPokeMove(src, i, x) && sys.teamPokeNature(src, i) != pokeNatures[poke][x])
                {
                    sys.sendMessage(src, "+CheckBot: " + sys.pokemon(poke) + " with " + sys.move(x) + " must be a " + sys.nature(pokeNatures[poke][x]) + " nature. Change it in the teambuilder.");
                    sys.stopEvent();
                    sys.changePokeNum(src, i, 0);
                }

            }
        }
    }
}
,
littleCupCheck : function(src, se) {
 if (["LC Wifi", "LC Ubers Wifi"].indexOf(sys.tier(src)) == -1) {
    return; // only care about these tiers
 }
 for (var i = 0; i < 6; i++) {
        var x = sys.teamPoke(src, i);
        if (x != 0 && sys.hasDreamWorldAbility(src, i) && lcpokemons.indexOf(x) != -1 ) {
            if (se) {
                    sys.sendMessage(src, "+CheckBot: " + sys.pokemon(x) + " is not allowed with a Dream World ability in this tier. Change it in the teambuilder.");
                    }

            if (sys.tier(src) == "LC Wifi" && sys.hasLegalTeamForTier(src, "LC Dream World") || sys.tier(src) == "LC Ubers Wifi" && sys.hasLegalTeamForTier(src, "Dream World")) {
                sys.changeTier(src, "LC Dream World");
            }else {
                if (se)
                    sys.changePokeNum(src, i, 0);

            }
            if (se)
                sys.stopEvent();
        }
    }
}
,
dreamWorldAbilitiesCheck : function(src, se) {
    if (sys.gen(src) < 5)
        return;

    if (["Третий Межсайтовый", "Красный Октябрь", "Dream World", "Dream World Ubers", "LC Dream World", "Monotype", "Dream World UU", "Dream World LU", "Clear Skies", "Challenge Cup" , "Uber Triples", "OU Triples", "Uber Doubles", "OU Doubles", "Shanai Cup", "Shanai Cup 1.5", "Shanai Cup STAT", "Monocolour"].indexOf(sys.tier(src)) != -1) {
        return; // don't care about these tiers
    }

    for (var i = 0; i < 6; i++) {
        var x = sys.teamPoke(src, i);
        if (x != 0 && sys.hasDreamWorldAbility(src, i) && (!(x in dwpokemons) || (breedingpokemons.indexOf(x) != -1 && sys.compatibleAsDreamWorldEvent(src, i) != true))) {
            if (se) {
                if (!(x in dwpokemons))
                    sys.sendMessage(src, "+CheckBot: " + sys.pokemon(x) + " is not allowed with a Dream World ability in this tier. Change it in the teambuilder.");
                else
                    sys.sendMessage(src, "+CheckBot: " + sys.pokemon(x) + " has to be Male and have no egg moves with its Dream World ability in  " + sys.tier(src) + " tier. Change it in the teambuilder.");
            }
            if (sys.tier(src) == "Wifi" && sys.hasLegalTeamForTier(src, "Dream World")) {
                sys.changeTier(src, "Dream World");
            } else if (sys.tier(src) == "Wifi" && sys.hasLegalTeamForTier(src, "Dream World Ubers")) {
                sys.changeTier(src, "Dream World Ubers");
            } else if (sys.tier(src) == "Wifi Ubers") {
                sys.changeTier(src, "Dream World Ubers");
            }
            else if (sys.tier(src) == "1v1 Gen 5" && sys.hasLegalTeamForTier(src, "Dream World")) {
                sys.changeTier(src, "Dream World");
            }
            else if (sys.tier(src) == "1v1 Gen 5" && sys.hasLegalTeamForTier(src, "Dream World Ubers")) {
                sys.changeTier(src, "Dream World Ubers");
            }
            else if (sys.tier(src) == "Wifi UU" && sys.hasLegalTeamForTier(src, "Dream World UU")) {
                sys.changeTier(src, "Dream World UU");
            } else if (sys.tier(src) == "Wifi LU" && sys.hasLegalTeamForTier(src, "Dream World LU")) {
                sys.changeTier(src, "Dream World LU");
            }
            else if (sys.tier(src) == "LC Wifi" && sys.hasLegalTeamForTier(src, "LC Wifi") || sys.tier(src) == "LC Ubers Wifi" && sys.hasLegalTeamForTier(src, "LC Ubers Wifi")) {
                sys.changeTier(src, "LC Dream World");
            }else {
                if (se)
                    sys.changePokeNum(src, i, 0);

            }
            if (se)
                sys.stopEvent();
        }
    }
}
,

inconsistentCheck : function(src, se) {
    if (["Dream World", "Dream World UU", "Dream World LU", "Wifi", "Wifi UU", "Wifi LU", "LC Wifi", "LC Dream World", "Wifi Ubers", "Dream World Ubers", "Clear Skies", "Monotype", "Monocolour"].indexOf(sys.tier(src)) == -1) {
        return; // only care about these tiers
    }
    for (var i = 0; i < 6; i++) {
        var x = sys.teamPoke(src, i);

        if (x != 0 && inpokemons.indexOf(x) != -1 && sys.hasDreamWorldAbility(src, i)) {
            if (se)
                sys.sendMessage(src, "+CheckBot: " + sys.pokemon(x) + " is not allowed with Moody in this tier. Change it in the teambuilder.");
                sys.changeTier(src, "Challenge Cup");
            if (se)
                sys.stopEvent();
        }
    }
}
,
weatherlesstiercheck : function(src, tier) {
    if (!tier) tier = sys.tier(src);
    if (tier != "Clear Skies") return;
    for (var i = 0; i < 6; i++){
        ability = sys.ability(sys.teamPokeAbility(src, i))
        if(ability.toLowerCase() == "drizzle" || ability.toLowerCase() == "drought" || ability.toLowerCase() == "snow warning" || ability.toLowerCase() == "sand stream") {
            sys.sendMessage(src, "+Bot: Your team has a pokvÂ©mon with the ability: " + ability + ", please remove before entering this tier.");
            if(sys.hasLegalTeamForTier(src, "Dream World")) {
                if(sys.hasLegalTeamForTier(src,"Wifi")) {
                    sys.changeTier(src, "Wifi");
                    sys.stopEvent()
                    return;
                }
                sys.changeTier(src, "Dream World");
                sys.stopEvent()
                return;
            }
            if(sys.hasLegalTeamForTier(src,"Wifi Ubers")) {
                sys.changeTier(src, "Wifi Ubers");
                sys.stopEvent()
                return;
            }
            sys.changeTier(src, "Dream World Ubers");
            sys.stopEvent()
            return;
        }
    }
} /* end of weatherlesstiercheck */
,
// Will escape "&", ">", and "<" symbols for HTML output.
html_escape : function(text)
{
    var m = text.toString();
    if (m.length > 0) {
        var amp = "&am" + "p;";
        var lt = "&l" + "t;";
        var gt = "&g" + "t;";
        return m.replace(/&/g, amp).replace(/\</g, lt).replace(/\>/g, gt);
    }else{
        return "";
    }
}
,
monotypecheck : function(src, tier) {
    if (!tier) tier = sys.tier(src);
    if (tier != "Monotype") return; // Only interested in monotype
    var TypeA = sys.pokeType1(sys.teamPoke(src, 0), 5);
	var TypeB = sys.pokeType2(sys.teamPoke(src, 0), 5);
	if (TypeA == 17)	TypeA = "excluded";	// Which means this is not mono type for this team
	if (TypeB == 17)	TypeB = "excluded";
	
	for (var i=1; sys.teamPoke(src, i); i++) {	// Here we can add '&& TypeA != "excluded" && TypeB != "excluded"', but I think 6 iterations is not that much to add another condition to check
		if ( sys.pokeType1(sys.teamPoke(src, i), 5) != TypeA && sys.pokeType2(sys.teamPoke(src, i), 5) != TypeA ) 
			TypeA = "excluded";
		if ( sys.pokeType1(sys.teamPoke(src, i), 5) != TypeB && sys.pokeType2(sys.teamPoke(src, i), 5) != TypeB ) 
			TypeB = "excluded";
	}
	
	if (TypeA == "excluded" && TypeB == "excluded") {
		sys.sendMessage(src, '+Bot: Your team is not monotype.');
		sys.changeTier(src, "Challenge Cup");
		sys.stopEvent();	// _todo_ 	check if it's correct
		return;
	}
}
,
pcTourney3Check : function(src, tier) {
	if (!tier) tier = sys.tier(src);
	if (tier != "Третий Межсайтовый") return;
	var bannedAbilities = [sys.abilityNum('Shadow Tag'), sys.abilityNum('Moody')];
	
	for (var slot = 0; slot<6; slot++) {
		if (-1 < bannedAbilities.indexOf(sys.teamPokeAbility(src, slot))) {
			sys.sendMessage(src, "+Bot: "+sys.teamPokeNick(src, slot)+" имеет способность "+sys.ability(sys.teamPokeAbility(src, slot))+", которая запрещена в турнире.");
			sys.changeTier(src, "Challenge Cup");
			sys.stopEvent();
			return;
		}
	}
	
	var blaziken = sys.pokeNum('Blaziken');
	if (!sys.hasTeamPoke(src, blaziken))
		return;

	var num = sys.indexOfTeamPoke(src, blaziken);
	
	if (sys.indexOfTeamPokeMove(src, num, sys.moveNum('Swords Dance')) != undefined 
		&& sys.teamPokeAbility(src, num) == sys.abilityNum('Speed Boost')) {
		sys.sendMessage(src, "+Bot: Blaziken со Speed Boost и Swords Dance запрещён в этом турнире");
		sys.changeTier(src, "Challenge Cup");
		sys.stopEvent();
		return;
	}
	
	for (var slot = 0; slot<6; slot++) {
		changePokeLevel(src, slot, 100);
	}
},

redOctoberCheck: function(src, tier) {
	if (!tier)
		tier = sys.tier(src);
	if (tier != 'Красный Октябрь')
		return;
	
	slot = sys.indexOfTeamPoke(src, sys.pokeNum('Blaziken'));
	if (slot != undefined && sys.teamPokeAbility == sys.abilityNum('Speed Boost')) {
		sys.changeTier(src, 'Challenge Cup');
		sys.sendMessage(src, 'Постановлением Временного Правительства Speed Boost Blaziken запрещён!');
		return;
	}
	// Blaziken
	
	var RED = [4, 5, 6, 45, 46, 47, 98, 99, 100, 101, 118, 119, 124, 126, 129, 136, 165, 166, 168, 193, 212, 218, 219, 224, 225, 233, 240, 250, 255, 256, 257, 265, 308, 318, 323, 338, 341, 342, 380, 383, 386, 401, 402, 467, 474, 479, 498, 499, 500, 513, 514, 538, 543, 545, 553, 554, 555, 557, 558, 560, 616, 617, 621, 624, 625, 628, 631];
	var WHITE = [12, 86, 87, 175, 176, 179, 235, 249, 264, 266, 278, 280, 281, 282, 288, 335, 351, 359, 372, 417, 459, 460, 468, 475, 478, 483, 486, 581, 582, 583, 584, 587, 590, 591, 592, 593, 602, 607, 613, 614, 627, 636, 637, 643, 648];
	
	var countRed = countWhite = 0;
	for (var slot = 0; slot<4; slot++) {
		pkm = sys.teamPoke(src, slot);
		if (-1 != RED.indexOf(pkm))
			countRed++;
		else if (-1 != WHITE.indexOf(pkm))
			countWhite++;
	}
	if (3 <= countRed) {
		sys.sendMessage(src, 'Товарищ! Приветствуем в рядах Красного Пролетариата.');
		return;
	}
	else if (3 <= countWhite) {
		sys.sendMessage(src, 'Добро пожаловать в верные Отчизне ряды  Белогвардейцев.');
		return;
	}
	
	sys.sendMessage(src, 'Сердце Слушай, Товарищ! Божий Сын! Выбор сделай!');
	sys.changeTier(src, 'Challenge Cup');

}
,

monoColourCheck : function(src, tier) {
    if (!tier) tier = sys.tier(src);
    if (tier != "Monocolour") return;
    var colours = {
        'Red': ['Charmander', 'Charmeleon', 'Charizard', 'Vileplume', 'Paras', 'Parasect', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Goldeen', 'Seaking', 'Jynx', 'Magikarp', 'Magmar', 'Flareon', 'Ledyba', 'Ledian', 'Ariados', 'Yanma', 'Scizor', 'Slugma', 'Magcargo', 'Octillery', 'Delibird', 'Porygon2', 'Magby', 'Ho-Oh', 'Torchic', 'Combusken', 'Blaziken', 'Wurmple', 'Medicham', 'Carvanha', 'Camerupt', 'Solrock', 'Corphish', 'Crawdaunt', 'Latias', 'Groudon', 'Deoxys', 'Deoxys-A', 'Deoxys-D', 'Deoxys-S', 'Kricketot', 'Kricketune', 'Magmortar', 'Porygon-Z', 'Rotom', 'Rotom-H', 'Rotom-F', 'Rotom-W', 'Rotom-C', 'Rotom-S', 'Tepig', 'Pignite', 'Emboar', 'Pansear', 'Simisear', 'Throh', 'Venipede', 'Scolipede', 'Krookodile', 'Darumaka', 'Darmanitan', 'Dwebble', 'Crustle', 'Scrafty', 'Shelmet', 'Accelgor', 'Druddigon', 'Pawniard', 'Bisharp', 'Braviary', 'Heatmor', ],
        'Blue': ['Squirtle', 'Wartortle', 'Blastoise', 'Nidoran?', 'Nidorina', 'Nidoqueen', 'Oddish', 'Gloom', 'Golduck', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Tentacool', 'Tentacruel', 'Tangela', 'Horsea', 'Seadra', 'Gyarados', 'Lapras', 'Vaporeon', 'Omanyte', 'Omastar', 'Articuno', 'Dratini', 'Dragonair', 'Totodile', 'Croconaw', 'Feraligatr', 'Chinchou', 'Lanturn', 'Marill', 'Azumarill', 'Jumpluff', 'Wooper', 'Quagsire', 'Wobbuffet', 'Heracross', 'Kingdra', 'Phanpy', 'Suicune', 'Mudkip', 'Marshtomp', 'Swampert', 'Taillow', 'Swellow', 'Surskit', 'Masquerain', 'Loudred', 'Exploud', 'Azurill', 'Meditite', 'Sharpedo', 'Wailmer', 'Wailord', 'Swablu', 'Altaria', 'Whiscash', 'Chimecho', 'Wynaut', 'Spheal', 'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Bagon', 'Salamence', 'Beldum', 'Metang', 'Metagross', 'Regice', 'Latios', 'Kyogre', 'Piplup', 'Prinplup', 'Empoleon', 'Shinx', 'Luxio', 'Luxray', 'Cranidos', 'Rampardos', 'Gible', 'Gabite', 'Garchomp', 'Riolu', 'Lucario', 'Croagunk', 'Toxicroak', 'Finneon', 'Lumineon', 'Mantyke', 'Tangrowth', 'Glaceon', 'Azelf', 'Phione', 'Manaphy', 'Oshawott', 'Dewott', 'Samurott', 'Panpour', 'Simipour', 'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat', 'Tympole', 'Palpitoad', 'Seismitoad', 'Sawk', 'Tirtouga', 'Carracosta', 'Ducklett', 'Karrablast', 'Eelektrik', 'Eelektross', 'Elgyem', 'Cryogonal', 'Deino', 'Zweilous', 'Hydreigon', 'Cobalion', 'Thundurus', ],
        'Green': ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Caterpie', 'Metapod', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Scyther', 'Chikorita', 'Bayleef', 'Meganium', 'Spinarak', 'Natu', 'Xatu', 'Bellossom', 'Politoed', 'Skiploom', 'Larvitar', 'Tyranitar', 'Celebi', 'Treecko', 'Grovyle', 'Sceptile', 'Dustox', 'Lotad', 'Lombre', 'Ludicolo', 'Breloom', 'Electrike', 'Roselia', 'Gulpin', 'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Cradily', 'Kecleon', 'Tropius', 'Rayquaza', 'Turtwig', 'Grotle', 'Torterra', 'Budew', 'Roserade', 'Bronzor', 'Bronzong', 'Carnivine', 'Yanmega', 'Leafeon', 'Shaymin', 'Shaymin-S', 'Snivy', 'Servine', 'Serperior', 'Pansage', 'Simisage', 'Swadloon', 'Cottonee', 'Whimsicott', 'Petilil', 'Lilligant', 'Basculin', 'Maractus', 'Trubbish', 'Garbodor', 'Solosis', 'Duosion', 'Reuniclus', 'Axew', 'Fraxure', 'Golett', 'Golurk', 'Virizion', 'Tornadus', ],
        'Yellow': ['Kakuna', 'Beedrill', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Ninetales', 'Meowth', 'Persian', 'Psyduck', 'Ponyta', 'Rapidash', 'Drowzee', 'Hypno', 'Exeggutor', 'Electabuzz', 'Jolteon', 'Zapdos', 'Moltres', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Pichu', 'Ampharos', 'Sunkern', 'Sunflora', 'Girafarig', 'Dunsparce', 'Shuckle', 'Elekid', 'Raikou', 'Beautifly', 'Pelipper', 'Ninjask', 'Makuhita', 'Manectric', 'Plusle', 'Minun', 'Numel', 'Lunatone', 'Jirachi', 'Mothim', 'Combee', 'Vespiquen', 'Chingling', 'Electivire', 'Uxie', 'Cresselia', 'Victini', 'Sewaddle', 'Leavanny', 'Scraggy', 'Cofagrigus', 'Archen', 'Archeops', 'Deerling', 'Joltik', 'Galvantula', 'Haxorus', 'Mienfoo', 'Keldeo', ],
        'Purple': ['Rattata', 'Ekans', 'Arbok', 'Nidoran?', 'Nidorino', 'Nidoking', 'Zubat', 'Golbat', 'Venonat', 'Venomoth', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Koffing', 'Weezing', 'Starmie', 'Ditto', 'Aerodactyl', 'Mewtwo', 'Crobat', 'Aipom', 'Espeon', 'Misdreavus', 'Forretress', 'Gligar', 'Granbull', 'Mantine', 'Tyrogue', 'Cascoon', 'Delcatty', 'Sableye', 'Illumise', 'Swalot', 'Grumpig', 'Lileep', 'Shellos', 'Gastrodon', 'Ambipom', 'Drifloon', 'Drifblim', 'Mismagius', 'Stunky', 'Skuntank', 'Spiritomb', 'Skorupi', 'Drapion', 'Gliscor', 'Palkia', 'Purrloin', 'Liepard', 'Gothita', 'Gothorita', 'Gothitelle', 'Mienshao', 'Genesect', ],
'Pink': ['Clefairy', 'Clefable', 'Jigglypuff', 'Wigglytuff', 'Slowpoke', 'Slowbro', 'Exeggcute', 'Lickitung', 'Chansey', 'Mr. Mime', 'Porygon', 'Mew', 'Cleffa', 'Igglybuff', 'Flaaffy', 'Hoppip', 'Slowking', 'Snubbull', 'Corsola', 'Smoochum', 'Miltank', 'Blissey', 'Whismur', 'Skitty', 'Milotic', 'Gorebyss', 'Luvdisc', 'Cherubi', 'Cherrim', 'Mime Jr.', 'Happiny', 'Lickilicky', 'Mesprit', 'Munna', 'Musharna', 'Audino', 'Alomomola', ],
        'Brown': ['Weedle', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Raticate', 'Spearow', 'Fearow', 'Vulpix', 'Diglett', 'Dugtrio', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Abra', 'Kadabra', 'Alakazam', 'Geodude', 'Graveler', 'Golem', 'Farfetch\'d', 'Doduo', 'Dodrio', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Kangaskhan', 'Staryu', 'Pinsir', 'Tauros', 'Eevee', 'Kabuto', 'Kabutops', 'Dragonite', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Sudowoodo', 'Teddiursa', 'Ursaring', 'Swinub', 'Piloswine', 'Stantler', 'Hitmontop', 'Entei', 'Zigzagoon', 'Seedot', 'Nuzleaf', 'Shiftry', 'Shroomish', 'Slakoth', 'Slaking', 'Shedinja', 'Hariyama', 'Torkoal', 'Spinda', 'Trapinch', 'Baltoy', 'Feebas', 'Regirock', 'Chimchar', 'Monferno', 'Infernape', 'Starly', 'Staravia', 'Staraptor', 'Bidoof', 'Bibarel', 'Buizel', 'Floatzel', 'Buneary', 'Lopunny', 'Bonsly', 'Hippopotas', 'Hippowdon', 'Mamoswine', 'Heatran', 'Patrat', 'Watchog', 'Lillipup', 'Conkeldurr', 'Sandile', 'Krokorok', 'Sawsbuck', 'Beheeyem', 'Stunfisk', 'Bouffalant', 'Vullaby', 'Mandibuzz', 'Landorus', ],
         'Black': ['Snorlax', 'Umbreon', 'Murkrow', 'Unown', 'Sneasel', 'Houndour', 'Houndoom', 'Mawile', 'Spoink', 'Seviper', 'Claydol', 'Shuppet', 'Banette', 'Duskull', 'Dusclops', 'Honchkrow', 'Chatot', 'Munchlax', 'Weavile', 'Dusknoir', 'Giratina', 'Darkrai', 'Blitzle', 'Zebstrika', 'Sigilyph', 'Yamask', 'Chandelure', 'Zekrom', ],
        'Gray': ['Machop', 'Machoke', 'Machamp', 'Magnemite', 'Magneton', 'Onix', 'Rhyhorn', 'Rhydon', 'Pineco', 'Steelix', 'Qwilfish', 'Remoraid', 'Skarmory', 'Donphan', 'Pupitar', 'Poochyena', 'Mightyena', 'Nincada', 'Nosepass', 'Aron', 'Lairon', 'Aggron', 'Volbeat', 'Barboach', 'Anorith', 'Armaldo', 'Snorunt', 'Glalie', 'Relicanth', 'Registeel', 'Shieldon', 'Bastiodon', 'Burmy', 'Wormadam', 'Wormadam-G', 'Wormadam-S', 'Glameow', 'Purugly', 'Magnezone', 'Rhyperior', 'Probopass', 'Arceus', 'Herdier', 'Stoutland', 'Pidove', 'Tranquill', 'Unfezant', 'Drilbur', 'Excadrill', 'Timburr', 'Gurdurr', 'Whirlipede', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino', 'Escavalier', 'Ferroseed', 'Ferrothorn', 'Klink', 'Klang', 'Klinklang', 'Durant', 'Terrakion', 'Kyurem', ],
        'White': ['Butterfree', 'Seel', 'Dewgong', 'Togepi', 'Togetic', 'Mareep', 'Smeargle', 'Lugia', 'Linoone', 'Silcoon', 'Wingull', 'Ralts', 'Kirlia', 'Gardevoir', 'Vigoroth', 'Zangoose', 'Castform', 'Absol', 'Shelgon', 'Pachirisu', 'Snover', 'Abomasnow', 'Togekiss', 'Gallade', 'Froslass', 'Dialga', 'Regigigas', 'Swanna', 'Vanillite', 'Vanillish', 'Vanilluxe', 'Emolga', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent', 'Tynamo', 'Litwick', 'Lampent', 'Cubchoo', 'Beartic', 'Rufflet', 'Larvesta', 'Volcarona', 'Reshiram', 'Meloetta', 'Meloetta-S' ],
    }
    var poke = sys.pokemon(sys.teamPoke(src, 0));
    var thecolour = '';
    for (var colour in colours) {
        if (colours[colour].indexOf(poke) > -1) {
            thecolour = colour;
        }
    }
    if (thecolour == '') {
        sys.sendMessage(src, "+Bot: Bug! " + poke + " has not a colour in checkMonocolour :(");
        sys.changeTier(src, "Challenge Cup")
        sys.stopEvent()
        return;
    }
    for (var i = 1; i < 6; ++i) {
        var poke = sys.pokemon(sys.teamPoke(src, i));
        if (colours[thecolour].indexOf(poke) == -1) {
            sys.sendMessage(src, "+Bot: " + poke + " has not the colour: " + thecolour);
            sys.changeTier(src, "Challenge Cup")
            sys.stopEvent()
            return;
        }
    }
    sys.sendMessage(src, "+Bot: Your team is a good monocolour team with colour: " + thecolour);
},

shanaiAbilityCheck : function(src, se) {
    var tier = sys.tier(src);
    if (["Shanai Cup", "Shanai Cup 1.5", "Shanai Cup STAT"].indexOf(tier) == -1) {
        return; // only intereted in shanai battling
    }
    var bannedAbilities = {
        'treecko': ['overgrow'],
        'chimchar': ['blaze'],
        'totodile': ['torrent'],
        'spearow': ['sniper'],
        'skorupi': ['battle armor', 'sniper'],
        'spoink': ['thick fat'],
        'golett': ['iron fist'],
        'magnemite': ['magnet pull', 'analytic'],
        'electrike': ['static', 'lightningrod'],
        'nosepass': ['sturdy', 'magnet pull'],
        'axew': ['rivalry'],
        'croagunk': ['poison touch', 'dry skin'],
        'cubchoo': ['rattled'],
        'joltik': ['swarm'],
        'shroomish': ['effect spore', 'quick feet'],
        'pidgeotto': ['big pecks'],
        'karrablast': ['swarm']
    };
    for (var i = 0; i < 6; ++i) {
        var ability = sys.ability(sys.teamPokeAbility(src, i));
        var lability = ability.toLowerCase();
        var poke = sys.pokemon(sys.teamPoke(src, i));
        var lpoke = poke.toLowerCase();
        if (lpoke in bannedAbilities && bannedAbilities[lpoke].indexOf(lability) != -1) {
            sys.sendMessage(src, "+CheckBot: " + poke + " is not allowed to have ability " + ability + " in this tier. Please change it in Teambuilder (You are now in Challenge Cup).")
            sys.changeTier(src, "Challenge Cup")
            if (se)
                sys.stopEvent();
            return;
        }
    }
}
})
