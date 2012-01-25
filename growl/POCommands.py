# -*- coding: utf-8 -*-
# Commands recieved on PO side
# Passed parameters: po - PO object, user - command sender (name), param (string or None)

def list(po, user, param):
	po.sendChannelMessage(0, user + u': Пользователи в конференции: ' + u', '.join(po.xmpp.users))

def log(po, user, param):
	pass


#		elif cmd == 'battle':
#			challenge = ChallengeInfo(0, self.ids[user], 0, 0)	# wtf is the first parameter?
#			self.challengeStuff(challenge)
