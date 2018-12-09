
class Packer

  def initialize(values, weights)
    @values = values
    @weights = weights

    raise 'dumb' if @values.size != @weights.size

    @memos = {}
  end

  def knapsack(capacity)
    pack_bag(@values.size - 1, capacity)
  end

  private

  def pack_bag(index, capacity)
    return 0 if index < 0 || capacity == 0

    if value_memoized?(index, capacity)
      puts "Value for index #{index} and capacity #{capacity } is stored"
      return @memos[index][capacity]
    else
      puts "Calling for index #{index}, Capacity left #{capacity}"
    end

    if @weights[index] > capacity
      result = pack_bag(index - 1, capacity)
    else
      added_value = pack_bag(index - 1, capacity - @weights[index]) + @values[index]
      not_added_value = pack_bag(index - 1, capacity)
      result = [added_value, not_added_value].max
    end

    memoize_value(index, capacity, result)

    result
  end

  def memoize_value(index, capacity, result)
    @memos[index] ||= {}
    @memos[index][capacity] = result
  end

  def value_memoized?(index, capacity)
    @memos[index] && @memos[index][capacity]
  end

end

p = Packer.new([1,2,3,2,5,6,3,2,1,2,3,1,2], [1,2,3,4,6,3,4,2,4,2,4,2,1])
puts p.knapsack(10)

# W V
# 1 3
# 2 2
# 3 2
