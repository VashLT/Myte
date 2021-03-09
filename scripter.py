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

        print(local_dict)
        result = eval(self.code, local_dict)
        print(result)