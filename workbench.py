from scripter import Script


# test = Script(['a', 'b'], 'math.exp(a)')
# test.run_script('1, 2')

long_script = 'sum([a**n / math.factorial(n) for n in range(int(b))])'

test = Script(['a', 'b'], long_script)
result = test.run_script('2, 10')
print(result)

# import math
# a = 2
# b = 10

# print(sum([a**n / math.factorial(n) for n in range(b)]))