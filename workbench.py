import math

class Script:

    def __init__(self, var_names, code):

        self.var_dict = {}

        for i, name in enumerate(var_names):
            self.var_dict[name] = i
        
        self.code = code

    def run_script(self, raw_input):

        # Limit input length to ensure 
        dict_length = len(self.var_dict)
        
        # Converts string of inputs into integers, also prevents bad code execution
        raw_vars = raw_input.split(',')
        raw_values = [float(var) for var in raw_vars]

        for i, name in enumerate(self.var_dict):
            self.var_dict[name] = raw_values[i]

        local_dict = dict(self.var_dict)
        local_dict.update({'math' : math})

        # print(local_dict)
        result = eval(self.code, local_dict)
        
        return result


# test = Script(['a', 'b'], 'math.exp(a)')
# test.run_script('1, 2')

long_script = 'sum([x**i / math.factorial(i) for i in range(int(n))])'

test = Script(['x', 'n'], long_script)
result = test.run_script('2, 10')
print(result)

# import math
# a = 2
# b = 10

# print(sum([a**n / math.factorial(n) for n in range(b)]))

# print(eval(str(eval('1 + 1'))))