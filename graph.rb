class GraphNode
  attr_reader :adjacents

  def initialize(value)
    @value = value
    @adjacents = []
  end

  def add_adjacent(value_or_node)
    if value_or_node.is_a?(GraphNode)
      to_add = value_or_node
    else
      to_add = GraphNode.new(value_or_node)
    end

    @adjacents << to_add

    to_add
  end

  def print
    puts "GraphNode: #{@value}"
  end
end

