#from wokkel.xmppim import MessageProtocol, AvailablePresence
from twisted.internet.protocol import Protocol, Factory
from twisted.internet.endpoints import TCP4ClientEndpoint
from twisted.internet import reactor
from poprotocol import *
from teamloader import loadTeam
from wokkel.muc import MUCClient
from hashlib import md5

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
		
		if content[0] in ('/', '!'):
			a = content.split(' ', 1)
			cmd = a[0][1:]
			param = None
			if len(a) == 2:
				param = a[1]
			return self.handleCommand(user, cmd, param)

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
		if cmd == 'list':
			self.sendMessage(user.nick + ': Users on the channel: ' + ', '.join(self.po.users))
		elif cmd == 'wait':
			if not param:
				self.sendMessage(user.nick + ': Wait for whom?')
			elif param in self.po.users:
				self.sendMessage(user.nick + ': ' +param+ ' is already there.')
			else:
				if self.po.waiting.has_key(param): # if somebody is waiting for him alreay
					self.po.waiting[param].append(user.nick)
				else:
					self.po.waiting[param] = [user.nick]

class PO (POProtocol):
	def __init__(self):
		global config 
		#print 'Creating PO instance'
		POProtocol.__init__(self)
		self.xmpp = None
		self.nick = config.po.nick
		self.channel = 0
		self.usernames = {}	# {id: 'username'}
		self.users = []		# [username, username] - users on the channel
		self.waiting = {}	# {whom: [who1, who2]}
		
		self.printEvents = False
	
	def onLogin(self, info):
		self.usernames[info.id] = info.name
		self.away(True)		# would be better to refuse challenges instead of going away
		
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
		
		if config.po.sendEverything:
			content = message
		elif message.startswith(self.nick + ': '):
			content = message[len(self.nick)+2:]
		else:
			return
		
		if content[0] in ('/', '!'):
			a = content.split(' ', 1)
			cmd = a[0][1:]
			param = None
			if len(a) == 2:
				param = a[1]
			return self.handleCommand(user, cmd, param)

		self.xmpp.sendMessage(user + ': ' + content)

	def handleCommand(self, user, cmd, param):
		#print 'Got a command', cmd, 'from', user, 'params:', param
		if cmd == 'list':
			self.sendChannelMessage(0, user + ': Users in MUC: ' + ', '.join(self.xmpp.users))

	def onSendTeam(self, player):
		self.onPlayersList(player)
	
	def onPlayersList(self, player):
		self.usernames[player.id] = player.name
		if player.name in self.waiting:
			for waiter in self.waiting[player.name]:
				if waiter in self.xmpp.users: 
					self.xmpp.sendMessage(waiter + ': ' + player.name + ' has come.')
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
			self.users.remove(self.usernames[player])

