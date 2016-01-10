import sys

heap = []
l = None
r = None
posn = None

def parent(i):
    return (i-1)/2

def left(i):
    return (2*i)+1

def right(i):
    return (2*i)+2

def maxheapify(i,sizeofheap):
    global l,r
    largest = i
    l = left(i)
    r = right(i)
    print "left and right are now ",l," and ",r," respectively"
    if l<sizeofheap:
        if heap[l]>heap[i]:
            largest = l 
            print "left is the largest : ",l
        else:
            largest = i 
            print "parent is the largest : ",largest
    if r<sizeofheap:
        if heap[r]>heap[largest]:
            largest = r
            print " right is the largest : ",r
    if largest != i:
        print "swapping the largest of the parent, left and right to the top"
        temp = heap[i]
        heap[i] = heap[largest]
        heap[largest] = temp
        print "swap completed"
        maxheapify(largest,sizeofheap)

def buildmaxheap():
    global heap
    heapposn = len(heap) - 1
    heapsize = len(heap)
    i = heapposn/2
    while i>=0:
        print "setting the heap for every parent node"
        maxheapify(i,heapsize)
        i = i - 1

def addtoheap(numobj):
    global heap
    heap.append(numobj)
    buildmaxheap()
    
def removehighestpriority():
    global posn,heap
    posn = len(heap)-1
    completed = heap[0]
    temp = heap[posn]
    heap[posn] = heap[0]
    heap[0] = temp
    del heap[posn]
    buildmaxheap()
    return completed
 
while(True):
    choice = raw_input("Please enter a choice. a) is for pushing/n b) is for getting the highest priority/n c) is for showing/n d) is for exiting from the program")
    if choice=='a':
        element=int(raw_input("Please enter a number"))
        addtoheap(element)
    elif choice=='b':
        print "The highest priority node just removed is : ",removehighestpriority()
    elif choice=='c':
        print "the heap is now : ",heap
    elif choice=='d':
        sys.exit()
    else:
        print "please enter the correct choice"   