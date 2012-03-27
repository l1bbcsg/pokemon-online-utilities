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
		
		if (tier && TierFilter.exists(tier)) {
			var errors = TierFilter.validate(pid, tier);
			if (errors && errors.length) {
				sys.sendMessage(pid, 'Команда не подходит для ' + tier);
				
				var msg = '<ul>';
				for (var i = 0; i<errors.length; i++)
					msg += '<li>' + errors[i] + '</li>';
				msg += '</ul>'
				sys.sendHtmlMessage(pid, msg);
				
				if (stoppable)
					sys.stopEvent();
				else
					sys.changeTier(pid, TierFilter.findAppropriateTier(pid));
			}
		}
		else
			sys.changeTier(pid, TierFilter.findAppropriateTier(pid));
	},
	findAppropriateTier: function(pid) {
		var queue = ['Wifi UU', 'DW UU', 'Wifi OU', 'DW OU', 'Wifi Ubers', 'DW Ubers', 'Challenge Cup'];
		for (var i = 0; i<queue.length; i++) {
			if (sys.hasLegalTeamForTier(pid, queue[i]) 
				&& !TierFilter.exists[queue[i]] 
				&& !(TierFilter.validate(pid, queue[i]).length) )
				return queue[i];
		}
	},
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
		return ['Команда не имеет единого типа.'];

	return [];
});
/*
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

	// Blaziken + Speed Boost + Swords Dance
TierFilter.add(['Третий Межсайтовый', 'Февральский Турнир'], function(pid) {
	var ret = [];

	for (var slot = 0; slot<6; slot++)
		if (sys.teamPoke(pid, slot) == sys.pokeNum('Blaziken') 
		 && sys.teamPokeAbility(pid, slot) == sys.abilityNum('Speed Boost')
		 && sys.indexOfTeamPokeMove(pid, slot, sys.moveNum('Swords Dance')) !== undefined)
			ret.push('Blaziken со Speed Boost и Swords Dance запрещён в этом турнире');

	return ret;
});
*/

	// Shadow Tag && Moody
TierFilter.add(['Третий Межсайтовый', 'Февральский Турнир'], function(pid) {
	var ret = [];
	var bannedAbilities = [sys.abilityNum('Shadow Tag'), sys.abilityNum('Moody')];
	
	for (var slot = 6; slot --> 0; ) {
		if (-1 < bannedAbilities.indexOf(sys.teamPokeAbility(pid, slot)))
			ret.push(sys.teamPokeNick(pid, slot) + " имеет способность "+sys.ability(sys.teamPokeAbility(pid, slot))+", которая запрещена в турнире.");
	}
	
	return ret;
});

	// Комбо Swift Swim + Drizzle
TierFilter.add(['Февральский Турнир'], function(pid) {
	var Drizzle     = false,
		SwiftSwim = false;

	var ret = [];
	
	for (var slot = 0; slot<6; slot++) {
		var ability = sys.teamPokeAbility(pid, slot);
		if (ability == sys.abilityNum('Drizzle'))
			Drizzle = true;
		else if (ability == sys.abilityNum('Swift Swim'))
			SwiftSwim = true;
	}
	
	if (Drizzle && SwiftSwim)
		ret.push('Комбо Drizzle и Swift Swim запрещено в этом турнире.');
		
	return ret;
});

	// Комбо Chlorophyll + Drought
TierFilter.add(['Февральский Турнир'], function(pid) {
	var Drought     = false,
		Chlorophyll = false;

	var ret = [];
	
	for (var slot = 0; slot<6; slot++) {
		var ability = sys.teamPokeAbility(pid, slot);
		if (ability == sys.abilityNum('Drought'))
			Drought = true;
		else if (ability == sys.abilityNum('Chlorophyll'))
			Chlorophyll = true;
	}
	
	if (Drought && Chlorophyll)
		ret.push('Комбо Drought и Chlorophyll запрещено в этом турнире.');
		
	return ret;
});

	// Excadrill + Sand Rush
TierFilter.add(['Февральский Турнир'], function(pid) {
	var ret = [];

	for (var slot = 0; slot<6; slot++)
		if (sys.teamPoke(pid, slot) == sys.pokeNum('Excadrill') && sys.teamPokeAbility(pid, slot) == sys.abilityNum('Sand Rush'))
			ret.push('Excadrill с Sand Rush и запрещён в этом турнире');
	
	return ret;
});

	// Allow only lvl 100
TierFilter.add(['Красный Октябрь', 'Третий Межсайтовый', 'Февральский Турнир'], function(pid) {
	for (var slot = 0; slot<6; slot++)
		sys.changePokeLevel(pid, slot, 100);
	return [];
});

	// Dream World
TierFilter.add(['Wifi OU', 'Wifi UU', 'Wifi Ubers'], function(pid) {
	var ret = []
	for (var slot =0; slot<6; slot++) {
		var poke = sys.teamPoke(pid, slot);
		if (!sys.hasDreamWorldAbility(pid, slot))
			continue;
		if (-1 != Utils.DW.female.indexOf(poke))
			continue;
		else if (sys.compatibleAsDreamWorldEvent(pid, slot))
			continue;
		ret.push(sys.pokemon(poke) + ' is not released in DW yet.');
	}
	return ret;
})

TierFilter // eval will return this
