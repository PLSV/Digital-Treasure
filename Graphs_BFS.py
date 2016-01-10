graph = []
nodes = None
visited = {}
visit_order = []
queue = []
    
def BFS(node):
    for i in range(0,nodes):
        if graph[node][i]==1 and visited[i]==0:
            queue.append(i)
            visited[i] = 1
    print "queue is now, ",queue
    while len(queue)!=0:
        next = queue.pop(0)
        visit_order.append(next)
        BFS(next)
                   
nodes = int(raw_input("please enter the no of nodes"))

for i in range(0,nodes):
    graph.append([])
    print "setting connections for the node ",i
    for j in range(0,nodes):
        connector = int(raw_input("Please Develop the graph structure"))
        graph[i].append(connector)

for k in range(0,nodes):
    visited[k] = 0
    
for k in range(0,nodes):
    if visited[k]==0:
        visited[k]=1
        visit_order.append(k)
        BFS(k)
        
print visit_order