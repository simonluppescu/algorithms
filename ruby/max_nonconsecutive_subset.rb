class Solver
  def initialize(array)
    @array = array
    @memos = Hash.new(0)
  end

  def solve
    return [@array[0], @array[1]].max if @array.size == 2
    return @array[0] if @array.size == 1

    curr_max = [@array[0], @array[1]].max
    @memos[0] = @array[0]
    @memos[1] = curr_max

    (2...@array.size).each do |i|
      curr_max = [@array[i], @array[i] + @memos[i - 2], curr_max].max

      @memos[i] = curr_max
    end

    curr_max
  end
end

hi = Solver.new([1, -4, -5, 6, -93, -2, 9, -13])
puts hi.solve
