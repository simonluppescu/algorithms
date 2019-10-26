
class StackElement
  attr_reader :min

  def initialize(value, prev_min)
    @value = value
    if prev_min
      @min = value < prev_min ? value : prev_min
    else
      @min = value
    end
  end
end

class Stack
  def initialize
    @stack = []
  end

  def min
    @stack.last&.min
  end

  def push(value)
    @stack.push(StackElement.new(value, min))
  end

  def pop
    @stack.pop
  end

  def empty?
    @stack.empty?
  end
end

s = Stack.new
s.push(10)
puts s.min
s.push(100)
s.push(20)
puts s.min
s.push(3)
s.push(30)
puts s.min
