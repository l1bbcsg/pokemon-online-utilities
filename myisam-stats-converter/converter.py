from os import mkdir, listdir
from shutil import copyfile
from struct import pack
from time import time
from sys import argv

start = time()

sqldb = 'stats'
#tier = 'DW OU'
path = './'
month = 'august'
tier = argv[1]

try: mkdir(sqldb)
except OSError: pass

table = month +'_'+ tier.replace(' ', '@0020')
db = open(sqldb +'/'+ table +'.MYD', 'wb')
count = 0

files = listdir(path + tier)
files.remove('ranks.rnk')	# .filter()
#files = files[:2]

for filename in files:
	f = open(path + tier +'/'+ filename, 'rb')
	while 'coffee is not cold':
		record = f.read(40);
		if not len(record):
			break	#	python, y u no eof?
		db.write('\xFF')
		db.write(record)
		count += 1
	f.close()
db.close()

copyfile('template.frm', sqldb +'/'+ table +'.frm')
copyfile('template.MYI', sqldb +'/'+ table +'.MYI')
myi = open(sqldb +'/'+ table +'.MYI', 'r+b')
myi.seek(0x1C, 0)
myi.write(pack('>q', count))
myi.seek(0x44, 0)
myi.write(pack('>q', count*41))
myi.close()

print '''
	Table `%s.%s` was created.
	%d records were writen, total: %d bytes,
	which took %d seconds.
	Don't forget to copy '%s' folder to your mysql folder and
	make user mysql owner of it and its sub files.
''' % (sqldb, month +'_'+ tier, count, count*41, time()-start, sqldb)
	#If tables got '#mysql50#' prefix, run mysqlcheck --databases %s --fix-db-names --fix-table-names
