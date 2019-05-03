require_relative 'graph'
require_relative 'queue'

def bfs
  graph = create_graph

  q = MyQueue.new
  q.push(graph)

  while q.present?
    node = q.pop
    node.print

    node.adjacents.each do |adj|
      q.push(adj)
    end
  end
end

def create_graph
  g = GraphNode.new("h")
  h = g.add_adjacent("e").add_adjacent("l")
  h.add_adjacent("p")
  h.add_adjacent("l").add_adjacent("o")
  g.add_adjacent("i")
  g.add_adjacent("a").add_adjacent("t")

  g
end

bfs
