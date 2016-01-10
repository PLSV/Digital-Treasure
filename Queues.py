import sys

f = -1
r = -1
maxsize = 10
Queue = []

def queue_underflow():
    global r
    if r==-1 or f==-1:
        return True
    else:
        return False
    
def queue_overflow():
    global f,r,maxsize
    if (r+1)%maxsize == f:
        return True
    else:
        return False
    
def insert(object):
    global f,r,maxsize
    r = (r + 1) % maxsize
    Queue.append(object)
    if f==-1:               #this case occurs at the starting when both f and r are equal to -1
        f = 0               

def remove():
    global f,r,maxsize
    rem = Queue[f]
    del Queue[f]
    if f==r:                #this case occurs when there is only one element in the queue
        f=-1
        r=-1
    else:
        f = (f + 1) % maxsize
    return rem

def show():
    global f,r,Queue
    if f==-1 and r==-1:
        print "No elements to show"
    else:
        print "The elements in the stack are, ",Queue
        print "The position of the front end pointer is ",f
        print "The position of the rear end pointer is ",r
    
while(True):
    choice = raw_input("Please enter a choice. a) is for pushing/n b) is for popping/n c) is for showing/n d) is for exiting from the program")
    if choice=='a':
        if queue_overflow():
            print "cannot add anymore, queue is full"
        else:
            element=int(raw_input("Please enter a number"))
            insert(element)
    elif choice=='b':
        remove()
    elif choice=='c':
        show()
    elif choice=='d':
        sys.exit()
    else:
        print "please enter the correct choice"   