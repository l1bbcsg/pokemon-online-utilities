# -*- coding: utf-8 -*-
# Commands recieved on Jabber side
# Passed parameters: muc - MUC object, user - command sender object, see: , param (string or None)

def list(muc, user, param):
	muc.sendMessage(user.nick + u': Пользователи на канале: ' + ', '.join(muc.po.users))

def wait(muc, user, param):
	if not param:
		muc.sendMessage(user.nick + u': Кого ждать?')
	elif param in muc.po.users:
		muc.sendMessage(user.nick + ': ' +param+ u' итак здесь.')
	else:
		if muc.po.waiting.has_key(param): # if somebody is waiting for him alreay
			muc.po.waiting[param].append(user.nick)
		else:
			muc.po.waiting[param] = [user.nick]

def eval(muc, user, param):
	pass
	# check authority
	# send '/eval + param'
	# modify scripts


def log(muc, user, param):		# _todo_ user specified size
	log = muc.po.messageLog
	muc.sendMessage(user.nick + u': Последниие '+ unicode(len(log)) + u' сообщений: \n' + '\n'.join(log) )
