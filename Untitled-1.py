#%%
import numpy as np 
import matplotlib.pyplot as plt
import math
# %%
plt.scatter(
    x = [math.pi/2*value/50 for value in range(0,50)],
    y = np.sin([math.pi*2*value/50 for value in range(0,50)]),
    label='sin graph'
)
plt.legend()
plt.title('sin graph')
plt.xlabel('x')
plt.ylabel('y')

# %%
import matplotlib.pyplot as plt
import math

def looping(my_func, interval, limit):
    '''
    Looping of graph
    '''
    x = 0.0
    x_hist = []
    y_hist = []

    x = [interval * i for i in range(math.floor(limit/interval))]
    y = [my_func(data) for data in x]

    plt.plot(x,y,c='r', label='sine graph')
    
    return plt

looping(math.sin, 0.05, 4 * math.pi)
plt.legend()

# %%
