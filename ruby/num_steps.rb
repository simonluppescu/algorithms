
class StepCounter
  STEP_VALUES = [1, 2, 3]

  def initialize
    @memos = {}
  end

  def step(distance)
    return 2 if distance == 2
    return 1 if distance == 1 || distance == 0
    return 0 if distance < 0

    if value_memoized?(distance)
      return @memos[distance]
    end

    result = 0
    STEP_VALUES.each do |step_value|
      result += step(distance - step_value)
    end
    memoize_value(distance, result)

    result
  end

  private

  def memoize_value(distance, result)
    @memos[distance] = result
    puts "Storing value #{distance}"
  end

  def value_memoized?(distance)
    if @memos[distance]
      puts "GETTING VALUE #{distance} which is #{@memos[distance]} -------"
      true
    else
      puts "Don't have value #{distance}"
      false
    end
  end

end

sc = StepCounter.new
puts sc.step(10)

# 3 2
# 3 1 1
# 2 3
# 2 2 1
# 2 1 2
# 2 1 1 1
# 1 3 1
# 1 2 2
# 1 2 1 1
# 1 1 3
# 1 1 2 1
# 1 1 1 2
# 1 1 1 1 1
