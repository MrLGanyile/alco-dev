import numpy as np
import matplotlib.pyplot as plt

plt.use('.deeplearning.mplstyle')

# Problem -: Given a rock's density predict it age.
'''
Training Example
| Density (kg.m^3) | Age (years in thousands) |
| 300              | 250                      |
| 250              | 280                      |
| 500              | 350                      |
|__________________|__________________________|
'''

# For x^(0) -> f_wb = w*x[0] + b
# For x^(1) -> f_wb = w*x[1] + b
# For x^(2) -> f_wb = w*x[2] + b
# Model
def calculate_model_output(w, b, x):
    m = x.shape  # What does shape do?
    f_wb = np.zeros(m)

    # For each data point compute it corresponding y-hat value.
    for i in range(len(x)):
        f_wb[i] = w*x[i] + b

    return f_wb

# Squared error cost function For Linear Regression With One Variable.
def compute_cost(x, y, w, b):
    m = len(x)
    sum = 0

    for i in range(m):
        f_wb = w*x[i] + b # y-hat
        squared_error = (f_wb-y[i])**2
        sum = sum + squared_error # sum update
    return sum/2*m # equation output

# Gradient Descent For Linear Regression With One Variable.
def compute_gradient_descent(x, y, w, b):
    m = len(x)
    dj_dw = 0 # Partial derivative of J with respect to w.
    dj_db = 0 # Partial derivative of J with respect to d.

    for i in range(m):
        # Calculate prediction for the ith sample.
        f_wb_i = w*x[i] + b
        # Calculate partial derivatives for the ith sample.
        dj_dw_i = (f_wb_i - y[i])*x[i]
        dj_db_i = (f_wb_i - y[i])

        # Add the ith sample's partial derivatives to the sums.
        dj_dw = dj_dw + dj_dw_i
        dj_db = dj_db + dj_db_i

    # Divide both sums by the number of samples.
    dj_dw = (1/m)*dj_dw
    dj_db = (1/m)*dj_dw

    return dj_dw, dj_db

# (x^(1), y^(1)) = (300, 250k)
# (x^(2), y^(2)) = (250, 280k)
# (x^(3), y^(3)) = (500, 350k)
# m = 3

# Feature Input
x_train = np.array([300, 250, 500])

# Target Output
y_train = np.array([250, 280, 350])

# The size of the input featurs.
m = len(x_train)

# Remember indexes are zero based.
i = 0
x_i = x_train[i] 
y_i = y_train[i]

# Display first data point.
print(f"(x^({i}), y^({i})) = ({x_i}, {y_i})")

i = 1
x_i = x_train[i] 
y_i = y_train[i]

# Display second data point.
print(f"(x^({i}), y^({i})) = ({x_i}, {y_i})")

i = 2
x_i = x_train[i] 
y_i = y_train[i]

# Display third data point.
print(f"(x^({i}), y^({i})) = ({x_i}, {y_i})")

# Plot these three data points using scatter() function in matplot
# Note : Original/Given Data Points
plt.scatter(x_train, y_train, marker="x", c="r")

# Set title
plt.title("Rocks Age")

# Set y-axis label
plt.ylabel("Age (years in thousands)")

#Set x-axis label
plt.xlabel("Density (kg/m^3)")

# Display Data
plt.show()

# It time to compute f_wb = wX + b
# Let start with w = 20 & b = -150 (True value of b is 150k)
# Note : In Jupyter there going to be suggested values for both parameters.
w = 20
b = -150
print(f"w: {w} b: {b}")


# Compute our model/hypothesis
hypothesis = calculate_model_output(w, b, x_train)

# Plot our predicted data points
plt.plot(x_train, hypothesis, c="b", label="Hypothesis")

# Set title
plt.title("Rocks' Age")
# Plot the training set values.
plt.plot(x_train, y_train, marker="*", c="r", label="Actual Values")

# Set the y-axis of a diagram containing both the training set values & the predicted ones.
plt.ylabel("Age (years in thousands)")

# Set the x-axis of a diagram containing both the training set values & the predicted ones.
plt.xlabel("Density (kg/m^3)")

plt.legend() # What does lagend do?
plt.show() 

# Clearly the values of w & b do not result in a line that properly fits the data. So,
# the goal is to find the best possible values of our parameters (w & b) that will find
# us the best fit. Let hypothetically say w ended up being 15 and b being -120. Now that
# we have a model we can use it to predict any rock's age based on a given density.
w = 15
b = -120

input_density = 150
predicted_age = w*input_density + b

print(f"The predicted rock's age is {predicted_age}")





