var TierFilter = {
	filters: {}, // 'tier': [func]
	
	add: function(affected, func) {
		for (var i in affected) {
			tier = affected[i];
			if (TierFilter.filters[tier])
				TierFilter.filters[tier].push(func);
			else
				TierFilter.filters[tier] = [func];
		}
	},
	exists: function(tier) { return TierFilter.filters.hasOwnProperty(tier) },
	validate : function(pid, tier) {
		ret = [];
		for (var i in TierFilter.filters[tier])
			ret = ret.concat( TierFilter.filters[tier][i](pid) );
		return ret;
	},
	
	filter: function(pid, tier, stoppable) {
		if (!tier)
			tier = sys.tier(pid);
		if (stoppable === undefined)
			stoppable = true;
		
		if (TierFilter.exists(tier)) {
			errors = TierFilter.validate(pid, tier);
			if (errors && errors.length) {
				sys.sendMessage(pid, 'Êîìàíäà íå ïîäõîäèò äëÿ ' + tier);
				
				var msg = '<ul>';
				for (var i in errors)
					msg += '<li>' + errors[i] + '</li>';
				msg += '</ul>'
				sys.sendHtmlMessage(pid, msg);
				
				if (stoppable)
					sys.stopEvent();
				else
					sys.changeTier(pid, findAppropriateTier(pid));
			}
		}
	}
}


// Examples
/*TierFilter.add(['Disabled Tier', 'Another Disabled Tier'], function(pid) { return ['This tier is disabled']; });
TierFilter.add(['Disabled Tier'], function(pid) { return ['No, seriously disabled', 'No jokes here']; });
TierFilter.add(['Disabled Tier'], function(pid) { if(parseInt(Math.random()*10)) return ['You also have bad luck']; else return []; });
*/

TierFilter.add(['Monotype'], function(pid) {
	var excluded = 17;
	var gen = 5;	// can't monotype be played in other gens?
	var TypeA = sys.pokeType1(sys.teamPoke(pid, 0), gen);
	var TypeB = sys.pokeType2(sys.teamPoke(pid, 0), gen);

	var slot = 0;
	while (++slot <6 && TypeA != TypeB) {
		var p = sys.teamPoke(pid, slot);
		if ( sys.pokeType1(p, gen) != TypeA && sys.pokeType2(p, gen) != TypeA ) 
			TypeA = excluded;
		if ( sys.pokeType1(p, gen) != TypeB && sys.pokeType2(p, gen) != TypeB ) 
			TypeB = excluded;
	}

	if (TypeA == TypeB)
		return ['Êîìàíäà íå èìååò åäèíîãî òèïà.'];

	return [];
});

TierFilter.add(['Красный Октябрь'], function(pid) {
	var ret = [];
	var slot = sys.indexOfTeamPoke(src, sys.pokeNum('Blaziken'));
	if (slot != undefined && sys.teamPokeAbility == sys.abilityNum('Speed Boost'))
		ret.push('Постановлением Временного Правительства Speed Boost Blaziken запрещён!');
	
	var RED = [4, 5, 6, 45, 46, 47, 98, 99, 100, 101, 118, 119, 124, 126, 129, 136, 165, 166, 168, 193, 212, 218, 219, 224, 225, 233, 240, 250, 255, 256, 257, 265, 308, 318, 323, 338, 341, 342, 380, 383, 386, 401, 402, 467, 474, 479, 498, 499, 500, 513, 514, 538, 543, 545, 553, 554, 555, 557, 558, 560, 616, 617, 621, 624, 625, 628, 631];
	var WHITE = [12, 86, 87, 175, 176, 179, 235, 249, 264, 266, 278, 280, 281, 282, 288, 335, 351, 359, 372, 417, 459, 460, 468, 475, 478, 483, 486, 581, 582, 583, 584, 587, 590, 591, 592, 593, 602, 607, 613, 614, 627, 636, 637, 643, 648];
	
	var countRed = countWhite = 0;
	for (var slot = 0; slot<4; slot++) {
		var pkm = sys.teamPoke(pid, slot);
		if (-1 != RED.indexOf(pkm))
			countRed++;
		else if (-1 != WHITE.indexOf(pkm))
			countWhite++;
	}
	if (3 <= countRed) {
		Utils.message(pid, 'Товарищ! Приветствуем в рядах Красного Пролетариата.');
		return false;
	}
	else if (3 <= countWhite) {
		Utils.message(pid, 'Добро пожаловать в верные Отчизне ряды  Белогвардейцев.');
		return false;
	}
	
	ret.push('Сердце Слушай, Товарищ! Божий Сын! Выбор сделай!');
	return ret;
});

TierFilter.add('Третий Межсайтовый', function(pid) {
	var ret = [];
	var bannedAbilities = [sys.abilityNum('Shadow Tag'), sys.abilityNum('Moody')];
	
	for (var slot = 6; slot --> 0; ) {
		if (-1 < bannedAbilities.indexOf(sys.teamPokeAbility(pid, slot)))
			ret.push(sys.teamPokeNick(pid, slot) + " имеет способность "+sys.ability(sys.teamPokeAbility(pid, slot))+", которая запрещена в турнире.");
	}
	
	var blaziken = sys.pokeNum('Blaziken');

	var num = sys.indexOfTeamPoke(pid, blaziken);
	
	if (num !== undefined
	&&  sys.indexOfTeamPokeMove(pid, num, sys.moveNum('Swords Dance')) !== undefined 
	&&  sys.teamPokeAbility(pid, num) == sys.abilityNum('Speed Boost'))
		ret.push('Blaziken со Speed Boost и Swords Dance запрещён в этом турнире');
	
	return ret;
});

	// Allow only lvl 100
TierFilter.add(['Красный Октябрь', 'Третий Межсайтовый'], function(pid) {
	for (var slot = 0; slot<6; slot++)
		changePokeLevel(pid, slot, 100);
	return false;
});

// _todo_ DreamWorld

TierFilter // eval will return this
