import math

class Script:

    def __init__(self, code, var_names):
        self.var_list = var_names
        self.code = code


    def run_script(self, raw_input):
       
        # Converts string of inputs into integers, also prevents bad code execution
        raw_vars = raw_input.split(',')
        raw_values = [float(var) for var in raw_vars]
        var_dict = {}

        # Generates var_dict for eval function (AKA locals)
        for i, name in enumerate(self.var_list):
            var_dict[name] = raw_values[i]

        var_dict.update({'math' : math})

        print(var_dict)
        result = eval(self.code, var_dict)
        
        return result