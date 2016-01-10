heap = []
l = None
r = None

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
        
while(True):
    inp = raw_input("enter a number you wish to add to the heap:")
    heap.append(int(inp))
    choice = raw_input("Wish to add more ? (y/n)")
    if choice == 'y':
        continue
    elif choice == 'n':
        break
    else:
        print "Please enter either y for yes or n for a no"
             
buildmaxheap()
print "max heap is, ",heap