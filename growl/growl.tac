from twisted.application import service
from twisted.words.protocols.jabber import jid
from wokkel.client import XMPPClient

from growl import MUC

from config import Config

config = Config('growl.conf')

application = service.Application("GROWL")

xmppclient = XMPPClient(jid.internJID(config.xmpp.jid), config.xmpp.password)
xmppclient.logTraffic = False
xmppclient.setServiceParent(application)

transport = MUC(jid.internJID(config.xmpp.muc), config)
transport.setHandlerParent(xmppclient)

