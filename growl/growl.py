# -*- coding: utf-8 -*-
# JabberCommands.py
# eval, log
# rewrite scripts

#from wokkel.xmppim import MessageProtocol, AvailablePresence
from poprotocol import *
from teamloader import loadTeam
from hashlib import md5
from collections import deque
from twisted.internet.protocol import Protocol, Factory
from twisted.internet.endpoints import TCP4ClientEndpoint
from twisted.internet import reactor
from wokkel.muc import MUCClient
import JabberCommands
import POCommands

config = None

class MUC (MUCClient):
	def userJoinedRoom(self, room, user):
		if user.nick not in config.xmpp.ignored:
			self.users.append(user.nick)
	
	def userLeftRoom(self, room, user):
		self.users.remove(user.nick)
	
	def __init__(self, muc, passedConfig):
		global config 
		config = passedConfig
		MUCClient.__init__(self)
		self.muc = muc
		self.nick = config.xmpp.nick
		self.po = None
		self.users = []

	def connectionInitialized(self):
		global config 
		MUCClient.connectionInitialized(self)
		self.join(self.muc, self.nick)
		
		factory = Factory()
		factory.protocol = PO
		point = TCP4ClientEndpoint(reactor, config.po.server, config.po.port)
		d = point.connect(factory)
		d.addCallback(self.gotPO)
	
	def receivedGroupChat(self, muc, user, message):
		global config
		
		if user.nick in config.xmpp.ignored:
			return
		
		if config.xmpp.sendEverything:
			content = message.body
		elif message.body.startswith(self.nick + ': '):
			content = message.body[len(self.nick)+2:]
		else:
			return
		
		if content[0] in ('/', '!') and len(content) > 1:
			if content[0] != content[1]:	# escaping
				a = content.split(' ', 1)
				cmd = a[0][1:]
				param = None
				if len(a) == 2:
					param = a[1]
				return self.handleCommand(user, cmd, param)
			else:
				content = content[1:]

		self.po.sendChannelMessage(0, user.nick + ': ' + content)
		
	def sendMessage(self, msg):
		self.groupChat(self.muc, msg)

	def gotPO(self, po):
		global config 
		#print "Connected to PO!"
		self.po = po
		po.xmpp = self
		self.po.setProxyIP(self.po.transport.getHost().host)
		self.onLogin()

	def onLogin(self):
		global config 
		info = loadTeam()
		info.team.nick = config.po.nick
		#info.nameColor.fromHEX(config.po.colour)
		info.team.info = config.po.info
		self.po.login(info)
	
	def keepALive(self):
		self.send(' ')
	
	def handleCommand(self, user, cmd, param):
		#print 'Got a command', cmd, 'from', user.nick, 'params:', param
		if hasattr(JabberCommands, cmd):
			getattr(JabberCommands, cmd)(self, user, param)
		else:
			self.sendMessage(user.nick + u': Нет такой команды.')

class PO (POProtocol):
	def __init__(self):
		global config 
		#print 'Creating PO instance'
		POProtocol.__init__(self)
		self.xmpp = None
		self.nick = config.po.nick
		self.channel = 0
		self.usernames = {}	# {id: 'username'}
		self.ids = {}		# {'name': id}		# rjcnskm		# _todo_	течёт
		self.users = []		# [username, username] - users on the channel
		self.waiting = {}	# {whom: [who1, who2]}
		self.messageLog = deque((), config.po.log)
		
		self.printEvents = False
	
	def onLogin(self, info):
		self.usernames[info.id] = info.name
		self.ids[info.name] = info.id
		self.away(True)		# would be better to refuse challenges instead of going away
		# opponent, clauses, double/single
		#self.challengeStuff( ChallengeInfo(0, 1532, 0, 0) )		# challenge myself, for test only
		
	def onAskForPass(self, salt):
		global config
		#print 'salt:', salt
		s = md5(md5(config.po.password.decode("utf-8").encode("iso-8859-1", "ignore")).hexdigest() + salt.encode("iso-8859-1", "ignore")).hexdigest()
		pw = s.decode("iso-8859-1")
		self.askForPass(pw)		# why is it called ask?
		
	def onKeepAlive(self, whatever):
		self.xmpp.keepALive()
		
	def onChannelMessage(self, chanid, user, message):
		global config 
		
		if user in config.po.ignored:
			return
		
		self.messageLog.append(user + ': ' + message)
		
		if config.po.sendEverything:
			content = message
		elif message.startswith(self.nick + ': '):
			content = message[len(self.nick)+2:]
		else:
			return
		
		if content[0] in ('/', '!') and len(content) > 1:
			if content[0] != content[1]:	# escaping
				a = content.split(' ', 1)
				cmd = a[0][1:]
				param = None
				if len(a) == 2:
					param = a[1]
				return self.handleCommand(user, cmd, param)
			else:
				content = content[1:]
		self.xmpp.sendMessage(user + ': ' + content)

	def handleCommand(self, user, cmd, param):
		#print 'Got a command', cmd, 'from', user, 'params:', param
		if hasattr(POCommands, cmd):
			getattr(POCommands, cmd)(self, user, param)
		else:
			self.sendMessage(user + u': Нет такой команды.')

	def onSendTeam(self, player):
		self.onPlayersList(player)
	
	def onPlayersList(self, player):
		self.usernames[player.id] = player.name
		self.ids[player.name] = player.id
		if player.name in self.waiting:
			for waiter in self.waiting[player.name]:
				if waiter in self.xmpp.users: 
					self.xmpp.sendMessage(waiter + ': ' + player.name + u' пришёл.')
			del self.waiting[player.name]
		#print 'List:', self.usernames
	
	def onChannelPlayers(self, channel, players):
		if channel == self.channel:
			self.users = [self.usernames[x] for x in players]
	def onJoinChannel(self, channel, player):
		if channel == self.channel and self.usernames[player] not in config.po.ignored:
			self.users.append(self.usernames[player])
	def onLeaveChannel(self, channel, player):
		if channel == self.channel:
			try:
				self.users.remove(self.usernames[player])
			except ValueError:
				pass

# own func test
	def onBattleRated(self, bid, spot, rated):
		print 'Battle rated:', rated

	def onBattleTier(self, bid, spot, tier):
		print 'Tier', tier
