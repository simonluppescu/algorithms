
require 'set'
class Querier

  def initialize(queries)
    @queries = queries

    @values_to_counts = Hash.new(0)
    @counts_to_values = Hash.new {|h, k| h[k] = Set.new}
    @result = []
  end

  def process
    @queries.each do |query|
      command = query[0]
      value = query[1]
      case command
      when 1
        add(value)
      when 2
        remove(value)
      when 3
        check(value)
      end
    end

    @result
  end

  private

  def add(value)
    prev_count = @values_to_counts[value]
    @counts_to_values[prev_count].delete(value)

    @values_to_counts[value] += 1

    @counts_to_values[prev_count + 1].add(value)
  end

  def remove(value)
    return if @values_to_counts[value] == 0

    prev_count = @values_to_counts[value]
    @counts_to_values[prev_count].delete(value)

    @values_to_counts[value] -= 1

    @counts_to_values[prev_count - 1].add(value)
  end

  def check(count)
    if @counts_to_values[count].size > 0
      @result << 1
    else
      @result << 0
    end
  end
end

input = <<-HI
8
1 5
1 6
3 1
1 10
1 10
1 6
2 5
3 2
HI

hi = input.split("\n")
hi = hi.slice(1, hi.size).map {|d| d.split(' ').map(&:to_i)}

puts Querier.new(hi).process
