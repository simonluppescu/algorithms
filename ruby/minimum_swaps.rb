
class Swapper

  def initialize(arr)
    @arr_size = arr.size
    @arr = [-1] + arr
    @already_seen = {0 => true}
    @starting_index = 0

    @count = 0
  end

  def get_num_swaps
    while true
      curr_index = get_starting_index
      break if curr_index > @arr_size

      while @already_seen[curr_index].nil?
        if @arr[curr_index] != curr_index
          @already_seen[curr_index] = true

          curr_index = @arr[curr_index]

          @count += 1 if @already_seen[curr_index].nil?
        else
          @already_seen[curr_index] = true
        end
      end
    end

    @count
  end

  def get_starting_index
    while @already_seen[@starting_index] && @starting_index <= @arr_size
      @starting_index += 1
    end

    @starting_index
  end

end


puts Swapper.new([3, 2, 5, 4, 1]).get_num_swaps

