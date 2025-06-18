import copy
import math
import numpy as np
import matplotlib.pyplot as plt

plt.use('.deeplearning.mplstyle')

# Problem -: Given a house size in square meters, no of rooms, no of floors predict it price.
'''
Training Example
| Size (m^3) | No Of Rooms | No Of Floors| Price (Rands)|
| 150        | 3           | 3           | 12k          |
| 70         | 2           | 4           | 3k           |
| 280        | 5           | 2           | 17.8k        |
|____________|_____________|_____________|______________|
'''

# Feature Input
X_train = np.array(
    [150, 3, 3],
    [70, 2, 4],
    [280, 5, 2]
)

# Suppose to be a column array
y_train = np.array([12, 3, 17.8])

# Model [Predicts a single sample's y-hat value]
# Unvectorized version
# For x^(0) -> f_wb = w0*x0[0] + w1*x1[0] + w2*x2[0] + b
# For x^(1) -> f_wb = w0*x0[1] + w1*x1[1] + w2*x2[1] + b
# For x^(2) -> f_wb = w0*x0[2] + w1*x1[2] + w2*x2[2] + b
def unvectorized_predict(w, b, x):

    # x & w - are column vectors.
    n = len(x) # No of features
    prediction = 0

    # For each data point compute it corresponding y-hat value.
    for i in range(n):
        p_i = w[i]*x[i]
        prediction = prediction + p_i
    prediction = prediction + b
    return prediction

# Model [Predicts a single sample's y-hat value]
# Vectorized version
def vectorized_predict(w, b, x):
    return np.dot(x, w) + b

# Computes partial derivatives for a single training sample.
def compute_partial_derivates(X, y, w, b):
    m, n = X.shape # no of samples, no of features
    dj_dw = np.zeros((n,)) # Partial derivative of J with respect to wj.
    dj_db = 0 # Partial derivative of J with respect to d.

    for i in range(m):
        error = (predict(w, b, X[i]))-y[i]

        # Calculate partial derivatives for the ith sample.
        for j in range(n):
            # Add the jth partial derivatives to the sums.
            dj_dw[j] = dj_dw[j] + error*X[i,j]
        dj_db = dj_db + error

    # Divide both sums by the number of samples.
    dj_dw = (1/m)*dj_dw
    dj_db = (1/m)*dj_dw

    return dj_dw, dj_db

# Squared error cost function For Linear Regression With Multiple Variables.
def compute_cost(X, y, w, b):
    # X - A 2D array
    m = X.shape[0] # No of rows of x.
    sum = 0.0

    for i in range(m):
        f_wb_i = np.dot(X[i], w) + b
        squared_error = (f_wb_i-y[i])**2
        sum = sum + squared_error # sum update
    sum = sum/2*m
    return (np.squeeze(sum)) # What does this do?

# Gradient Descent For Linear Regression With Multiple Variable.
def gradient_descent(X, y, w_in, b_in, cost_function, partial_derivatives_function, alpha, num_of_iterations):
    """
    Performs batch gradient descent to learn parameters/theta.
    Update parameters/theta by taking num_iters gradient steps with
    with learning rate alpha.

    Args:
        X : (ndarray Shape (m, n) matrix of examples
        y : (ndarray Shape (m, )) target value of each example
        w_in : (ndarray Shape (n, )) Initial values of the parameters of the model.
        b_in : (ndarray Shape (n, )) Initial values of the parameters of the model.
        cost_function : function to compute the cost.
        partial_derivatives_function : function to compute partial derivatives
        alpha : (float) learning rate
        num_of_iterations : number of iterations
    Returns
        w : (ndarray Shape (n,)) Updated w parameters values after running gradient descent
        b : (float) Updated b parameter value after running gradient descent
    """ 

    #A array to store the cost J and w's at each iteration for graphing later.
    J_history = []
    w = copy.deepcopy(w_in)
    b = b_in

    for index in range(num_of_iterations):
        # Calculate the gradient and update the parameters
        dj_dw, dj_db = partial_derivatives_function(X, y, w, b)

        #Update parameters using w, b, alpha and the partial derivatives
        w = w - alpha*dj_dw
        b = b - alpha*dj_db

        # Save cost J as each iteration
        if index<100000: # Prevent resource exhaustion
            J_history.append(cost_function(X,y,w,b))
        
        # Print every cost at intervals 10 times or as many iterations if < 10
        if index%math.ceil(num_of_iterations/10) == 0:
            print(f'Iteration {index:4d}: Cost {J_history[-1]:8.2f}     ')
        
        return w, b, J_history, # Return final w, b and J history for graphing
        

# (x^(1), y^(1)) = ([150, 3, 3], 12k)
# (x^(2), y^(2)) = ([70, 2, 4], 3k)
# (x^(3), y^(3)) = ([280, 5, 2], 17.8k)
# m = 3

m, n = X_train.shape
w_init = np.zeros(n) 
b_init = 0

# Get the first row from our training examples/data.
x_vec = X_train[0:]
print(f'x_vec shape {x_vec.shape}, x_vec value: {x_vec}')

# Make a prediction of the first training sample with lame parameter values
f_wb_init = unvectorized_predict(w_init, b_init, x_vec)
print(f'f_wb_init[1] shape {f_wb_init.shape}, prediction {f_wb_init}')

# Predict the price for the house with following attributes.
# House Size - 400m^2, No Of Rooms - 5, No Of Floors - 1
f_wb_init = vectorized_predict(w_init, b_init, [400, 5, 1])
print(f'f_wb_init[2] shape {f_wb_init.shape}, prediction {f_wb_init}')

# Gradient descent properties
no_of_iterations = 1000
alpha = 5.0e-7
w_final, b_final, J_hist = gradient_descent(X_train, y_train, w_init, b_init, compute_cost, compute_partial_derivates, alpha,no_of_iterations)

print(f'w & b founded by gradient descent: {w_final}, {b_final:0.2f}')

for i in range(m):
    print(f'prediction: {vectorized_predict(w_final, b_final):0.2f}, target value: {y_train[i]}')

# Plot cost vs iterations
fig, (ax1, ax2) = plt.subplot(1, 2, constrained_layout=True, figsize=(12.4))
ax1.plot(J_hist)
ax2.plot(100 + np.arange(len(J_hist[100:])), J_hist[100:])
ax1.set_title("Cost vs Iteration"); ax2.set_title("Cost vs Iteration (tail)")
ax1.ylabel("Cost"); ax2.ylabel("Cost")
ax1.xlabel("Iteration Steps"); ax2.xlabel("Iteration Steps")

plt.show()






