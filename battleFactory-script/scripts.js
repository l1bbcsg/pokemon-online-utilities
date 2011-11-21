var DEBUG = false

var TIER_FACTORY  = "Battle Factory";
var TIER_BACKYARD = "Main Hall";

var STATE_NO_TEAM   = 0;
var STATE_INIT_TEAM = 1;
var STATE_HAS_TEAM  = 2;
var STATE_BATTLING  = 3;
var STATE_SWAPING   = 4;

var MISSINGNO = new Pokemon({"item": [0], "ev": [[0, 0, 0, 0, 0, 0]], "ratio": 0, "ability": [0], "nature": [0], "move": [[0], [0], [0], [0]], "id": 0, "iv": [[0, 0, 0, 0, 0, 0]]});

/*
if (DEBUG)
	SESSION.identifyScriptAs(sys.rand(0, 0xFFFAAA));
*/
function debug(message){
	if (!DEBUG)
		return;
	sys.sendHtmlAll('!debugBot: '+message);
}

function attendant(id, message) {
	sys.sendHtmlMessage(id, '<table width="100%" style="margin: 0 auto; background: #222; border: 1px solid blue; border-top: 3px solid red;">\
	<tr border="0">\
		<td width="80"><img src="Themes/Classic/Trainer Sprites/'+ (215 + 5*(id%2))+ '.png"/></td>\
		<td style="vertical-align: top; padding: 5px; color: white; font-family: \'Ubuntu\', \'Trebuchet MS\', sans-serif;"> <b>Factory Attendant</b>:<br>' +message+ '</td>\
	</tr>\
	</table>');
}

function bot (id, message) {
	sys.sendHtmlMessage(id, '<span style="font-family: lucida console, consolas, monospace; font-weight: 800; font-size: 16px; color: crimson">Bot</span>: ' + message);
}

commands = {
	"channel": {
		"rules               ": "Shows the rules",
		"commands [category] ": "Lists all commands, if optional category is specfied, list only commands from this category. Categories: channel, factory.",
		"bug [message]       ": "Reports bug to administrator. Describe your bugs throughfully."
	},
	"factory": {
		"wat                      ": "Suggests your next action.",
		"team                     ": "Lists your current team.",
		"streak [player]          ": "Shows player's winstreak, shows your own if player name is omitted.",
		"choices                  ": "Lists all pokemon you can choose with /choose or /swap at the moment.",
		"choose [number]          ": "Claims number's pokemon as your.",
		"swap [number1] [number2] ": "Replaces number1'th pokemon in your team with number2'th from opponent's.",
		"noswap                   ": "Lets you proceed without swaping any pokemon."
	}
}

sets = JSON.parse(sys.getFileContent('sets_subway.json'))

function Pokemon(set) {
	for (var i in {'item':0, 'ev':0, 'ability':0, 'nature':0})
		this[i] = set[i][sys.rand(0, set[i].length)];
	this.id = set.id;
	this.iv = set.iv;
	this.moves = [];
	for (var i=0; i<4; i++)
		this.moves[i] = set.move[i][sys.rand(0, set.move[i].length)];
	
	if (set.ratio == -1)
		this.gender = 0;
	else
		this.gender = (sys.rand(0, 9) < set.ratio? 2 : 1);
}

Pokemon.prototype.toHtml = function(i, short) {
	var s = '<table width="100%" style="margin: 0 auto; background: #333;"><tr>';
	s += '<td width="90"><img src="pokemon:num=' +this.id+ '"/></td><td style="padding: 5px; color: #ddd; font-family: panic sans, consolas, monospace;">';
	s += '<span style="font-size: 18px; font-family: ubuntu, trebuchet ms, sans-serif; color: white">' +(i? i+'.' : '')+ ' ' + sys.pokemon(this.id) + '</span> ' + ['', '♂', '♀'][this.gender]+ '<br>';
	if (!short) {
		s += 'Nature&nbsp; <b>' + sys.nature(this.nature) + '</b><br>';
		s += 'Ability <b>' + sys.ability(this.ability) + '</b><br>';
		s += 'Item&nbsp;&nbsp;&nbsp; <b>'+ sys.item(this.item) + '</b><br>';
		s += 'Moves&nbsp;&nbsp;&nbsp;';
		s += this.moves.map(function(m) {return '<b>'+sys.move(m)+'</b>';}).join(', ');
	}
	s += '</td></tr></table>';
/*	if (DEBUG) {
		s += '\nIVs: '       + this.iv;
		s += '\nEVs: '       + this.ev;
		//s += '\nMoves: '     + this.moves;
		//s += '\nAbility: '   + this.abilities;
		//s += '\nFemales: '   + this.f_ratio;
	}*/
	return s;
};

debug('Random pokemon:' + (new Pokemon(sets[sys.rand(0, sets.length)]).toHtml()));

function Player(id) {
	this.id = id;
	this.winstreak = 0;
	this.team = [];		// contains Pokemon instances
	this.party = 0;		// number of pokemon in the party
	this.choices = [];	// possible choices for swapping/initial team
	for (var i=0; i<6; i++)
		this.team[i] = MISSINGNO;
	this.state = STATE_NO_TEAM;
	for (var i=0; i<5; i++)
		this.choices.push(new Pokemon(sets[sys.rand(0, sets.length)]));

	// called inb4Battle started, loads this.team into actual team
	this.prepare = function() {
		if (this.state != STATE_HAS_TEAM || this.party != 3) {
			bot(this.id, 'An unknown error occured: You don\'t have a team!')
			//sys.stopEvent();
			return;
		}
		for (var i=0; i<3; i++) {
			//debug('setting this pokemon:'+this.team[i].toHtml());
			sys.changePokeNum      (this.id, i, this.team[i].id);
			sys.changePokeItem     (this.id, i, this.team[i].item);
			sys.changePokeNature   (this.id, i, this.team[i].nature);
			sys.changePokeLevel    (this.id, i, 50);
			sys.changePokeName     (this.id, i, sys.pokemon(this.team[i].id));
			sys.changePokeAbility  (this.id, i, this.team[i].ability);
			sys.changePokeGender   (this.id, i, this.team[i].gender);
			sys.changePokeShine    (this.id, i, !sys.rand(0, 8096));
			sys.changePokeHappiness(this.id, i, 255);
			for (var j=0; j<4; j++)
				sys.changePokeMove    (this.id, i, j, this.team[i].moves[j])
			for (var j=0; j<6; j++)
				sys.changeTeamPokeEV  (this.id, i, j, this.team[i].ev[j]);	// WARNING
			for (var j=0; j<6; j++)
				sys.changeTeamPokeIV  (this.id, i, j, this.team[i].iv[j]);	// WARNING
		}
	}
	//dropChoices() {}
}

SESSION.registerUserFactory(Player);

({
	afterLogIn: function(src) {
		sys.changeTier(src, TIER_BACKYARD);
		attendant(src, 'Greetings, trainer, wellcome to the battle factory<br>\
We research pokemon battles here.<br>\
To get started, read the rules by typing "/rules"<br>\
For list of commands type "/commands."');
	},
	
	afterChangeTier: function(src, oldtier, newtier) {
		if (newtier == TIER_FACTORY && SESSION.users(src).state == STATE_NO_TEAM) {
			attendant(src, 'I\'ll take your pokemon for safekeeping<br>Choose 3 pokemon pokemon from this list:');
			for (var i=0; i<5; i++) {
				pkm = SESSION.users(src).choices[i];
				if (pkm.id == 0)
					continue;
				sys.sendHtmlMessage(src, pkm.toHtml(i+1));
			}
			attendant(src, 'Type "/choose number" to choose a pokemon.');
			SESSION.users(src).state = STATE_INIT_TEAM;
		}
	},
	
	beforeFindBattle: function(src) {	// WARNING
		if (SESSION.users(src).state != STATE_HAS_TEAM) {
			attendant(src, 'You can\'t battle yet.');
			bot(src, 'stopping event');
			sys.stopEvent();
			return;
		}
	},
	
	beforeBattleMatchup: function(){
		debug('bBM fired');
		//sys.stopEvent();
	},
	
	beforeChallengeIssued: function(src, tar, clauses) {
		/*if (sys.tier(src) == TIER_BACKYARD) {
			bot(src, 'You can\'t battle in '+TIER_BACKYARD);
			sys.stopEvent();
			return;
		} */
		if (sys.tier(src) != sys.tier(tar)) {
			bot(src, 'Cross-tier battling is not possible.');
			sys.stopEvent();
			return;
		}
		if (SESSION.users(src).state != STATE_HAS_TEAM) {
			attendant(src, 'You can\'t start battling yet.');
			sys.stopEvent();
			return;
		}
		if (SESSION.users(tar).state != STATE_HAS_TEAM) {
			attendant(src, sys.name(tar) + ' is busy right now.');
			sys.stopEvent();
			return;
		}
		if (clauses) {
			attendant(src, "You can only battle with all clauses diabled.");
			// at least we need to get rid of WF clause
			sys.stopEvent();
		}
		//sys.forceBattle(src, tar, 0, 0, false);
	},

	beforeBattleStarted: function(p1, p2) {
		//debug('bBS');
		SESSION.users(p1).prepare();
		SESSION.users(p2).prepare();
		SESSION.users(p1).state = STATE_BATTLING;
		SESSION.users(p2).state = STATE_BATTLING;
	},
	
	afterBattleEnded: function(winner, looser, result) {
		if (sys.tier(winner) != TIER_FACTORY)
			return;
		if (result == 'tie') {
			//for (p in [winner, looser]) {
				attendant(winner, 'What? A tie? This is quite unexpected.');
				SESSION.users(winner).state = STATE_HAS_TEAM;
				attendant(looser, 'What? A tie? This is quite unexpected.');
				SESSION.users(looser).state = STATE_HAS_TEAM;
			//}
			return;
		}
		SESSION.users(winner).winstreak++;
		SESSION.users(winner).state = STATE_SWAPING;
		attendant(winner, 'Congratulations for your win, now you can swap one of your pokmon with one of defeated trainer\'s:');
		for (var i=0; i< 3; i++)
			sys.sendHtmlMessage(winner, (SESSION.users(winner).choices[i] = SESSION.users(looser).team[i]).toHtml(i+1, true));
		attendant(winner, 'Type "/swap pokemon_to_swap pokemon_to_take".');
		// is it possible to set rating to winstreak?
		
		//SESSION.users(looser) = new Player(looser);	// will it work?
		
		sys.changeTier(looser, TIER_BACKYARD);
		SESSION.users(looser).winstreak = 0;
		for (i=0; i< 3; i++)
			SESSION.users(looser).team[i] = MISSINGNO;
		SESSION.users(looser).state = STATE_NO_TEAM;
		SESSION.users(looser).party = 0;
		
		for (var i=0; i<5; i++)
			SESSION.users(looser).choices[i] = new Pokemon(sets[sys.rand(0, sets.length)]);
		attendant(looser, 'Sorry, but you lost. You winstreak is reset to 0.');
	},

	beforeChatMessage: function(src, msg) {
		if (msg[0] == '/') {
			sys.stopEvent();
			var a = msg.split(' ');
			command = a[0].substr(1).toLowerCase();
			param   = a.slice(1).join(' ');
			
			switch (command){
				case 'rules':
					sys.sendHtmlMessage(src, '<table><tr> <td align="center" style="background: #eee; font-family: ubuntu, trebuchet ms, sans-serif; font-size: 18px; text-align: center;">The only rule is COMMON SENSE.<br>\
That also means you can be punished for whatever reason.<br>\
To start the game switch to "'+TIER_FACTORY+'" tier and follow the instructions.<br>\
If you ever get lost, try <tt>/wat</tt> or <tt>/commands</tt>.</td></tr></table>');
					break;
				case 'commands':
					var head = '<span style="white-space: pre; font-family: lucida console, consolas, monospace; color: purple;">/';
					if (!param) {
						for (cat in commands)
							for (c in commands[cat])
								bot(src, head+c+'</span>'+commands[cat][c]);
					}
					else if (param in commands) {
						for (c in commands[param])
							bot(src, head+c+'</span>'+commands[param][c]);
					}
					else
						bot(src, 'No such category "'+param+'".');
					break;
				case 'wat':
					var message;
					switch(SESSION.users(src).state){
						case STATE_NO_TEAM:
							message = 'You don\'t have a team yet, switch to "'+TIER_FACTORY+'" tier to start building it.';
							break;
						case STATE_INIT_TEAM:
							message = 'You have yet to choose pokemon for your starting team, use "/choices" command.';
							break;
						case STATE_HAS_TEAM:
							message = 'You can start battling. Click Find Battle, or make a challenge.';
							break;
						case STATE_BATTLING:
							message = 'What are doing here? <br> You have a battle ongoing, don\'t make your opponent wait.';
							break;
						case STATE_SWAPING:
							message = 'You have yet to swap pokemon, use "/choices" command to see possible choices.';
							break;
						default:
							message = 'SCIENCE!';
					}
					attendant(src, message);
					break;
				case 'choices':
					if (SESSION.users(src).state == STATE_INIT_TEAM) {
						left = 3 - SESSION.users(src).party;
						short = false;
						msg = 'Type "/swap number1 number2" to swap your number1\'th pokemon with number2\'th pokemon.<br>Type "/noswap" to keep your current team.';
					}
					else if (SESSION.users(src).state == STATE_SWAPING){
						left = 'one';
						short = true;
						msg = 'Type "/choose number" to choose a pokemon.';
					}
					else {
						attendant(src, 'You don\'t have any pokemon to choose.');
						break;
					}
					attendant(src, 'You may choose ' +left+ ' pokemon from this list:');
					for (var i=0; i<5; i++) {
						pkm = SESSION.users(src).choices[i];
						if (pkm.id == 0)
							continue;
						sys.sendHtmlMessage(src, pkm.toHtml(i+1, short));
					}
					attendant(src, msg);
					break;
				case 'choose':
					if (SESSION.users(src).state != STATE_INIT_TEAM) {
						attendant(src, 'This isn\'t the time to use that.');
						break;
					}
					if (SESSION.users(src).party >= 3) {
						attendant(src, 'Your team is full, proceed battling.');
						break;
					}
					if (!/^[1-5]$/.test(param)) {
						attendant(src, 'What is "' +param+ '"? Please, enter a number from 1 to 5.');
						break;
					}
					pkm = SESSION.users(src).choices[param-1];
					if (pkm.id == 0 ) {
						attendant(src, 'You took that pokemon already.');
						break;
					}
					SESSION.users(src).team[SESSION.users(src).party] = pkm;
					attendant(src, 'You took ' +sys.pokemon(pkm.id)+ '.');
					SESSION.users(src).choices[param-1] = MISSINGNO;
					if(++SESSION.users(src).party >= 3) {
						for (i=0; i<SESSION.users(src).choices.length; i++)
							SESSION.users(src).choices[i] = MISSINGNO;
						attendant(src, 'Your team is set, <br>You can start battling.');
						SESSION.users(src).state = STATE_HAS_TEAM;
					}
					break;
				case 'team': 
					if (SESSION.users(src).state == STATE_NO_TEAM || !SESSION.users(src).party) {
						attendant(src, 'You don\'t have a team.');
						break;
					}
					attendant(src, 'Your current team:');
					for (i=0; i<SESSION.users(src).party; i++)
						sys.sendHtmlMessage(src, SESSION.users(src).team[i].toHtml());
					break;
				case 'swap':
					if (SESSION.users(src).state != STATE_SWAPING) {
						attendant(src, 'You can\'t swap pokemo right now.');
						break;
					}
					if (!/^[1-3] [1-3]$/.test(param)) {
						attendant(src, 'What do you mean by "' +param+ '"? Please, enter two numbers from 1 to 3.');
						break;
					}
					// Hey, get back to RegExps		// and rewrite everything else here as well
					a = param.split(' ');
					attendant(src, 'You replaced your '+ sys.pokemon(SESSION.users(src).team[a[0]-1].id) +' with '+ sys.pokemon(SESSION.users(src).choices[a[1]-1].id) +'.');
					SESSION.users(src).team[a[0]-1] = SESSION.users(src).choices[a[1]-1];
					for (i=0; i<SESSION.users(src).choices.length; i++)
						SESSION.users(src).choices[i] = MISSINGNO;
					SESSION.users(src).state = STATE_HAS_TEAM;
					break;
				case 'noswap':
					if (SESSION.users(src).state != STATE_SWAPING) {
						attendant(src, 'But there\'s nothing to swap anyway...');
						break;
					}
					for (i=0; i<SESSION.users(src).choices.length; i++)
						SESSION.users(src).choices[i] = MISSINGNO;
					SESSION.users(src).state = STATE_HAS_TEAM;
					attendant(src, 'You skipped swaping');
					break;
				case 'streak':
					if (param) {
						var target = sys.id(param.toLowerCase());
						name = param + "'s";
					}
					else {
						var target = src;
						name = 'Your';
					}
					attendant(src, name + ' current winstreak is ' +SESSION.users(target).winstreak+ '.');
					break;
				case 'bug':
					if (!param) {
						bot(src, 'What do you mean?');
						break;
					}
					me = sys.id('Kalashnikov');
					if (me)
						sys.sendHtmlMessage(me, '<br> '+sys.name(src)+' reported a bug: <br> '+param+' <br>');
					sys.appendToFile('bugs.txt', sys.time() + ' ' +sys.name(src)+ '(' +sys.ip(src)+ '):\n' + param + '\n\n');
					bot(src, 'Bug reported. Thank you for your help.');
					break;
				case 'eval':
					if (sys.ip(src) == '127.0.0.1') {
						sys.eval(param);
						break;
					}
				default: 
					bot(src, 'No such command: "' +command+ '".');
			}
		}
	}
})

