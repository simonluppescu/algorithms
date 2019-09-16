
class MaxHeap

  attr_reader :heap

  def initialize(arr = nil)
    @heap = Array(arr)
  end

  def add(value)
    @heap << value
    new_value_index = @heap.size - 1
    parent_index = get_parent_index(new_value_index)

    while parent_index && @heap[parent_index] < @heap[new_value_index]
      swap(parent_index, new_value_index)
      new_value_index = parent_index

      parent_index = get_parent_index(new_value_index)
    end
  end

  def remove(index)
    last_index = @heap.size - 1

    if index == last_index
      @heap.delete_at(last_index)
    else
      swap(index, last_index)
      @heap.delete_at(last_index)

      curr_index = index
      left_index = get_left_child_index(curr_index)
      right_index = get_right_child_index(curr_index)
      while !leaf_node?(curr_index) && !in_correct_position?(curr_index)
        swap_index = index_to_swap(left_index, right_index)
        swap(curr_index, swap_index)
        curr_index = swap_index

        left_index = get_left_child_index(curr_index)
        right_index = get_right_child_index(curr_index)
      end
    end
  end

  def empty?
    @heap.empty?
  end

  private

  def index_to_swap(left_index, right_index)
    return left_index if @heap[right_index].nil?
    return right_index if @heap[left_index].nil?

    @heap[left_index] >= @heap[right_index] ? left_index : right_index
  end

  def in_correct_position?(index)
    in_correct_left_position?(index) && in_correct_right_position?(index)
  end

  def in_correct_left_position?(index)
    left_index = get_left_child_index(index)
    @heap[left_index].nil? || @heap[index] >= @heap[left_index]
  end

  def in_correct_right_position?(index)
    right_index = get_right_child_index(index)
    @heap[right_index].nil? || @heap[index] >= @heap[right_index]
  end

  def leaf_node?(index)
    @heap[get_left_child_index(index)].nil? && @heap[get_right_child_index(index)].nil?
  end

  def swap(index, index2)
    tmp = @heap[index]
    @heap[index] = @heap[index2]
    @heap[index2] = tmp
  end

  def get_left_child_index(index)
    2 * index + 1
  end

  def get_right_child_index(index)
    2 * (index + 1)
    # 2 * index + 2
  end

  def get_parent_index(index)
    return nil if index == 0

    ((index - 1) / 2.0).floor
  end

end


hi = MaxHeap.new([10, 7, 6])
hi.add(8)
hi.add(3)
hi.add(12)
hi.add(11)
hi.add(5)
puts hi.inspect

while !hi.empty?
  puts hi.heap[0]
  hi.remove(0)
end
