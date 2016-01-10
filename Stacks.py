import sys

stack = []
top = -1

def push_element(object):
    global stack
    global top
    top = top + 1
    stack.append(object)

def pop_element():
    global stack
    global top
    result = stack[top]
    del stack[top]
    top = top - 1
    return result
    
def stack_underflow():
    global top
    if top==-1:
        return True
    else:
        return False
    
def stack_overflow():
    global top
    if top==sys.maxint:
        return True
    else:
        return False
    
def pushele():
    if stack_overflow():
        print "Stack Overflow, cannot add more objects"
        return
    else:
        object = raw_input("Please enter a number:")
        topass = int(object)
        push_element(topass)
    
def popele():
    if stack_underflow():
        print "Stack Underflow, cannot delete more elements"
        return
    else:
        print "The popped element is ",pop_element()

def show():
    global stack
    global top
    if top==-1:
        print "No elements to show"
        print "The pointer of the stack is now pointing to ",top
    else:
        print "The elements in the stack are, ",stack
        print "The pointer of the stack is now pointing to ",top

def peek():
    if top==-1:
        return None
    else:
        return stack[top]
        
while(True):
    choice = raw_input("Please enter a choice. a) is for pushing/n b) is for popping/n c) is for showing/n d) is for exiting from the program")
    if choice=='a':
        pushele()
    elif choice=='b':
        popele()
    elif choice=='c':
        show()
    elif choice=='d':
        sys.exit()
    else:
        print "please enter the correct choice"
        
    
