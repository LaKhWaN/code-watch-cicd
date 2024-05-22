# sum.py

import sys

def sum_two_numbers(num1, num2):
    return num1 + num2 + 2

if __name__ == "__main__":
    # Read input
    input_data = sys.stdin.read()
    num1, num2 = map(float, input_data.strip().split())
    
    # Calculate sum
    result = sum_two_numbers(num1, num2)
    
    # Print result
    print(result)
