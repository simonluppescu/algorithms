
class Stack
  def initialize
    @stack = []
  end

  def push(value)
    if @stack.empty?
      @stack.push(value)
      return
    end

    tmp_stack = []
    while !@stack.empty? && value > @stack.last
      tmp_stack.push(@stack.pop)
    end
    @stack.push(value)

    while !tmp_stack.empty?
      @stack.push(tmp_stack.pop)
    end
  end

  def pop
    @stack.pop
  end

  def print
    puts @stack.inspect
  end
end

s = Stack.new
s.push(1)
s.push(12)
s.push(3)
s.push(5)
s.push(4)
s.print
