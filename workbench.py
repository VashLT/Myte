from scripter import Script


# test = Script(['a', 'b'], 'math.exp(a)')
# test.run_script('1, 2')

long_script = 'sum([a**n / math.factorial(n) for n in range(int(b))])'

test = Script(['a', 'b'], long_script)
test.run_script('2, 10')

import math
# a = 2
# b = 10

# print(sum([a**n / math.factorial(n) for n in range(b)]))