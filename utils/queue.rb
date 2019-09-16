class MyQueue
  def initialize
    @queue = []
  end

  def push(value)
    @queue.push(value)
  end

  def pop
    @queue.delete_at(0)
  end

  def peek
    @queue.first
  end

  def present?
    !@queue.empty?
  end
end
