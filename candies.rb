
class Poop

  def initialize(arr)
    @children = arr

    @candies = []
  end

  def process
    count = 0
    prev_child = nil
    @children.each_with_index do |child, index|
      if prev_child.nil? || child > prev_child
        count += 1
        prev_child = child
      else
        if count > 1
          fill_candies(count, index)
        end

        count = 1
        prev_child = child
      end
    end

    count = 0
    prev_child = nil
    (0...@children.size).reverse_each do |index|
      child = @children[index]

      if prev_child.nil? || child > prev_child
        count += 1
        prev_child = child
      else
        if count > 2
          reverse_fill_candies(count, index + 1)
        end

        count = 1
        prev_child = child
      end
    end

    @candies
    # @candies.reduce(:+)
  end

  def fill_candies(count, index)
    num_candies = 1
    ((index - count)...index).each do |i|
      @candies[i] = num_candies
      num_candies += 1
    end
  end

  def reverse_fill_candies(count, index)
    num_candies = count - 1
    ((index + 1)...(index + count)).each do |i|
      @candies[i] = num_candies
      num_candies -= 1
    end
  end

end


hi = %w(
1
2
2)
hi = hi.map(&:to_i)

puts Poop.new(hi).process.inspect
