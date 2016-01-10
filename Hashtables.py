tablesize = 100
hashtable = []
    
def hashing(obj):
    hashvalue = 0
    for each in obj:
        hashvalue += int(ord(each))
    hashvalue = hashvalue % tablesize
    return hashvalue

def findItem(obj):
    hashvalue = hash(obj)
    if len(hashtable[hashvalue]) == 0:
        return False
    elif obj not in hashtable[hashvalue]:
        return False
    elif obj in hashtable[hashvalue]:
        return True
    
for i in range(0,tablesize):
    hashtable.append([])

while(True):
    names = raw_input("Please enter a name")
    hashtable[hashing(names)].append(names)
    cont = raw_input("Continue? (y/n)")
    if(cont == 'y'):
        continue
    else:
        break
    
for each in range(0,tablesize):
    print hashtable[each]