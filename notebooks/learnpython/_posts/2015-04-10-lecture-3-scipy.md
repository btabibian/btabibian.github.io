---
layout: python_note
title: "Lecture 3"
subtitle: "Scipy"
tags: [u'learning', u'python']
categories: [

scientific-computing,

]
date:  2015-04-10
parent: "learningPython"
img: [
scipy.png,
]

github: https://github.com/btabibian/scientific-python-lectures

---
# SciPy - Library of scientific algorithms for Python

J.R. Johansson (robert@riken.jp) http://dml.riken.jp/~rob/

The latest version of this [IPython notebook](http://ipython.org/notebook.html) lecture is available at [http://github.com/jrjohansson/scientific-python-lectures](http://github.com/jrjohansson/scientific-python-lectures).

The other notebooks in this lecture series are indexed at [http://jrjohansson.github.com](http://jrjohansson.github.com).


{% highlight python linenos  %}
# what is this line all about? Answer in lecture 4
%pylab inline
from IPython.display import Image
{% endhighlight %}

    
    Welcome to pylab, a matplotlib-based Python environment [backend: module://IPython.zmq.pylab.backend_inline].
    For more information, type 'help(pylab)'.


## Introduction

The SciPy framework builds on top of the low-level NumPy framework for multidimensional arrays, and provides a large number of higher-level scientific algorithms. Some of the topics that SciPy covers are:

* Special functions ([scipy.special](http://docs.scipy.org/doc/scipy/reference/special.html))
* Integration ([scipy.integrate](http://docs.scipy.org/doc/scipy/reference/integrate.html))
* Optimization ([scipy.optimize](http://docs.scipy.org/doc/scipy/reference/optimize.html))
* Interpolation ([scipy.interpolate](http://docs.scipy.org/doc/scipy/reference/interpolate.html))
* Fourier Transforms ([scipy.fftpack](http://docs.scipy.org/doc/scipy/reference/fftpack.html))
* Signal Processing ([scipy.signal](http://docs.scipy.org/doc/scipy/reference/signal.html))
* Linear Algebra ([scipy.linalg](http://docs.scipy.org/doc/scipy/reference/linalg.html))
* Sparse Eigenvalue Problems ([scipy.sparse](http://docs.scipy.org/doc/scipy/reference/sparse.html))
* Statistics ([scipy.stats](http://docs.scipy.org/doc/scipy/reference/stats.html))
* Multi-dimensional image processing ([scipy.ndimage](http://docs.scipy.org/doc/scipy/reference/ndimage.html))
* File IO ([scipy.io](http://docs.scipy.org/doc/scipy/reference/io.html))

Each of these submodules provides a number of functions and classes that can be used to solve problems in their respective topics.

In this lecture we will look at how to use some of these subpackages.

To access the SciPy package in a Python program, we start by importing everything from the `scipy` module.


{% highlight python linenos  %}
from scipy import *
{% endhighlight %}

If we only need to use part of the SciPy framework we can selectively include only those modules we are interested in. For example, to include the linear algebra package under the name `la`, we can do:


{% highlight python linenos  %}
import scipy.linalg as la
{% endhighlight %}

## Special functions

A large number of mathematical special functions are important for many computional physics problems. SciPy provides implementations of a very extensive set of special functions. For details, see the list of functions in the reference documention at http://docs.scipy.org/doc/scipy/reference/special.html#module-scipy.special. 

To demonstrate the typical usage of special functions we will look in more detail at the Bessel functions:


{% highlight python linenos  %}
#
# The scipy.special module includes a large number of Bessel-functions
# Here we will use the functions jn and yn, which are the Bessel functions 
# of the first and second kind and real-valued order. We also include the 
# function jn_zeros and yn_zeros that gives the zeroes of the functions jn
# and yn.
#
from scipy.special import jn, yn, jn_zeros, yn_zeros
{% endhighlight %}


{% highlight python linenos  %}
n = 0    # order
x = 0.0

# Bessel function of first kind
print "J_%d(%f) = %f" % (n, x, jn(n, x))

x = 1.0
# Bessel function of second kind
print "Y_%d(%f) = %f" % (n, x, yn(n, x))
{% endhighlight %}

    J_0(0.000000) = 1.000000
    Y_0(1.000000) = 0.088257



{% highlight python linenos  %}
x = linspace(0, 10, 100)

fig, ax = subplots()
for n in range(4):
    ax.plot(x, jn(n, x), label=r"$J_%d(x)$" % n)
ax.legend();
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_12_0.png)



{% highlight python linenos  %}
# zeros of Bessel functions
n = 0 # order
m = 4 # number of roots to compute
jn_zeros(n, m)
{% endhighlight %}




    array([  2.40482556,   5.52007811,   8.65372791,  11.79153444])



## Integration

### Numerical integration: quadrature

Numerical evaluation of a function of the type

$\displaystyle \int_a^b f(x) dx$

is called *numerical quadrature*, or simply *quadature*. SciPy provides a series of functions for different kind of quadrature, for example the `quad`, `dblquad` and `tplquad` for single, double and triple integrals, respectively.




{% highlight python linenos  %}
from scipy.integrate import quad, dblquad, tplquad
{% endhighlight %}

The `quad` function takes a large number of optional arguments, which can be used to fine-tune the behaviour of the function (try `help(quad)` for details).

The basic usage is as follows:


{% highlight python linenos  %}
# define a simple function for the integrand
def f(x):
    return x
{% endhighlight %}


{% highlight python linenos  %}
x_lower = 0 # the lower limit of x
x_upper = 1 # the upper limit of x

val, abserr = quad(f, x_lower, x_upper)

print "integral value =", val, ", absolute error =", abserr 
{% endhighlight %}

    integral value = 0.5 , absolute error = 5.55111512313e-15


If we need to pass extra arguments to integrand function we can use the `args` keyword argument:


{% highlight python linenos  %}
def integrand(x, n):
    """
    Bessel function of first kind and order n. 
    """
    return jn(n, x)


x_lower = 0  # the lower limit of x
x_upper = 10 # the upper limit of x

val, abserr = quad(integrand, x_lower, x_upper, args=(3,))

print val, abserr 
{% endhighlight %}

    0.736675137081 9.38925687719e-13


For simple functions we can use a lambda function (name-less function) instead of explicitly defining a function for the integrand:


{% highlight python linenos  %}
val, abserr = quad(lambda x: exp(-x ** 2), -Inf, Inf)

print "numerical  =", val, abserr

analytical = sqrt(pi)
print "analytical =", analytical
{% endhighlight %}

    numerical  = 1.77245385091 1.42026367809e-08
    analytical = 1.77245385091


> As show in the example above, we can also use 'Inf' or '-Inf' as integral limits.

Higher-dimensional integration works in the same way:


{% highlight python linenos  %}
def integrand(x, y):
    return exp(-x**2-y**2)

x_lower = 0  
x_upper = 10
y_lower = 0
y_upper = 10

val, abserr = dblquad(integrand, x_lower, x_upper, lambda x : y_lower, lambda x: y_upper)

print val, abserr 
{% endhighlight %}

    0.785398163397 1.63822994214e-13


> Note how we had to pass lambda functions for the limits for the y integration, since these in general can be functions of x.

## Ordinary differential equations (ODEs)

SciPy provides two different ways to solve ODEs: An API based on the function `odeint`, and object-oriented API based on the class `ode`. Usually `odeint` is easier to get started with, but the `ode` class offers some finer level of control.

Here we will use the `odeint` functions. For more information about the class `ode`, try `help(ode)`. It does pretty much the same thing as `odeint`, but in an object-oriented fashion.

To use `odeint`, first import it from the `scipy.integrate` module


{% highlight python linenos  %}
from scipy.integrate import odeint, ode
{% endhighlight %}

A system of ODEs are usually formulated on standard form before it is attacked numerically. The standard form is:

$y' = f(y, t)$

where 

$y = [y_1(t), y_2(t), ..., y_n(t)]$ 

and $f$ is some function that gives the derivatives of the function $y_i(t)$. To solve an ODE we need to know the function $f$ and an initial condition, $y(0)$.

Note that higher-order ODEs can always be written in this form by introducing new variables for the intermediate derivatives.

Once we have defined the Python function `f` and array `y_0` (that is $f$ and $y(0)$ in the mathematical formulation), we can use the `odeint` function as:

    y_t = odeint(f, y_0, t)

where `t` is and array with time-coordinates for which to solve the ODE problem. `y_t` is an array with one row for each point in time in `t`, where each column corresponds to a solution `y_i(t)` at that point in time. 

We will see how we can implement `f` and `y_0` in Python code in the examples below.

#### Example: double pendulum

Let's consider a physical example: The double compound pendulum, described in some detail here: http://en.wikipedia.org/wiki/Double_pendulum


{% highlight python linenos  %}
Image(url='http://upload.wikimedia.org/wikipedia/commons/c/c9/Double-compound-pendulum-dimensioned.svg')
{% endhighlight %}




<img src="http://upload.wikimedia.org/wikipedia/commons/c/c9/Double-compound-pendulum-dimensioned.svg" />



The equations of motion of the pendulum are given on the wiki page:

${\dot \theta_1} = \frac{6}{m\ell^2} \frac{ 2 p_{\theta_1} - 3 \cos(\theta_1-\theta_2) p_{\theta_2}}{16 - 9 \cos^2(\theta_1-\theta_2)}$

${\dot \theta_2} = \frac{6}{m\ell^2} \frac{ 8 p_{\theta_2} - 3 \cos(\theta_1-\theta_2) p_{\theta_1}}{16 - 9 \cos^2(\theta_1-\theta_2)}.$

${\dot p_{\theta_1}} = -\frac{1}{2} m \ell^2 \left [ {\dot \theta_1} {\dot \theta_2} \sin (\theta_1-\theta_2) + 3 \frac{g}{\ell} \sin \theta_1 \right ]$

${\dot p_{\theta_2}} = -\frac{1}{2} m \ell^2 \left [ -{\dot \theta_1} {\dot \theta_2} \sin (\theta_1-\theta_2) +  \frac{g}{\ell} \sin \theta_2 \right]$

To make the Python code simpler to follow, let's introduce new variable names and the vector notation: $x = [\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}]$

${\dot x_1} = \frac{6}{m\ell^2} \frac{ 2 x_3 - 3 \cos(x_1-x_2) x_4}{16 - 9 \cos^2(x_1-x_2)}$

${\dot x_2} = \frac{6}{m\ell^2} \frac{ 8 x_4 - 3 \cos(x_1-x_2) x_3}{16 - 9 \cos^2(x_1-x_2)}$

${\dot x_3} = -\frac{1}{2} m \ell^2 \left [ {\dot x_1} {\dot x_2} \sin (x_1-x_2) + 3 \frac{g}{\ell} \sin x_1 \right ]$

${\dot x_4} = -\frac{1}{2} m \ell^2 \left [ -{\dot x_1} {\dot x_2} \sin (x_1-x_2) +  \frac{g}{\ell} \sin x_2 \right]$


{% highlight python linenos  %}
g = 9.82
L = 0.5
m = 0.1

def dx(x, t):
    """
    The right-hand side of the pendulum ODE
    """
    x1, x2, x3, x4 = x[0], x[1], x[2], x[3]
    
    dx1 = 6.0/(m*L**2) * (2 * x3 - 3 * cos(x1-x2) * x4)/(16 - 9 * cos(x1-x2)**2)
    dx2 = 6.0/(m*L**2) * (8 * x4 - 3 * cos(x1-x2) * x3)/(16 - 9 * cos(x1-x2)**2)
    dx3 = -0.5 * m * L**2 * ( dx1 * dx2 * sin(x1-x2) + 3 * (g/L) * sin(x1))
    dx4 = -0.5 * m * L**2 * (-dx1 * dx2 * sin(x1-x2) + (g/L) * sin(x2))
    
    return [dx1, dx2, dx3, dx4]
{% endhighlight %}


{% highlight python linenos  %}
# choose an initial state
x0 = [pi/4, pi/2, 0, 0]
{% endhighlight %}


{% highlight python linenos  %}
# time coodinate to solve the ODE for: from 0 to 10 seconds
t = linspace(0, 10, 250)
{% endhighlight %}


{% highlight python linenos  %}
# solve the ODE problem
x = odeint(dx, x0, t)
{% endhighlight %}


{% highlight python linenos  %}
# plot the angles as a function of time

fig, axes = subplots(1,2, figsize=(12,4))
axes[0].plot(t, x[:, 0], 'r', label="theta1")
axes[0].plot(t, x[:, 1], 'b', label="theta2")


x1 = + L * sin(x[:, 0])
y1 = - L * cos(x[:, 0])

x2 = x1 + L * sin(x[:, 1])
y2 = y1 - L * cos(x[:, 1])
    
axes[1].plot(x1, y1, 'r', label="pendulum1")
axes[1].plot(x2, y2, 'b', label="pendulum2")
axes[1].set_ylim([-1, 0])
axes[1].set_xlim([1, -1]);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_42_0.png)


Simple annimation of the pendulum motion. We will see how to make better animation in Lecture 4.


{% highlight python linenos  %}
from IPython.display import clear_output
import time
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = subplots(figsize=(4,4))

for t_idx, tt in enumerate(t[:200]):

    x1 = + L * sin(x[t_idx, 0])
    y1 = - L * cos(x[t_idx, 0])

    x2 = x1 + L * sin(x[t_idx, 1])
    y2 = y1 - L * cos(x[t_idx, 1])
    
    ax.cla()    
    ax.plot([0, x1], [0, y1], 'r.-')
    ax.plot([x1, x2], [y1, y2], 'b.-')
    ax.set_ylim([-1.5, 0.5])
    ax.set_xlim([1, -1])

    display(fig)
    clear_output()
    
    time.sleep(0.1)
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_45_0.png)


#### Example: Damped harmonic oscillator

ODE problems are important in computational physics, so we will look at one more example: the damped harmonic oscillation. This problem is well described on the wiki page: http://en.wikipedia.org/wiki/Damping

The equation of motion for the damped oscillator is:

$\displaystyle \frac{\mathrm{d}^2x}{\mathrm{d}t^2} + 2\zeta\omega_0\frac{\mathrm{d}x}{\mathrm{d}t} + \omega^2_0 x = 0$

where $x$ is the position of the oscillator, $\omega_0$ is the frequency, and $\zeta$ is the damping ratio. To write this second-order ODE on standard form we introduce $p = \frac{\mathrm{d}x}{\mathrm{d}t}$:

$\displaystyle \frac{\mathrm{d}p}{\mathrm{d}t} = - 2\zeta\omega_0 p - \omega^2_0 x$

$\displaystyle \frac{\mathrm{d}x}{\mathrm{d}t} = p$

In the implementation of this example we will add extra arguments to the RHS function for the ODE, rather than using global variables as we did in the previous example. As a consequence of the extra arguments to the RHS, we need to pass an keyword argument `args` to the `odeint` function:


{% highlight python linenos  %}
def dy(y, t, zeta, w0):
    """
    The right-hand side of the damped oscillator ODE
    """
    x, p = y[0], y[1]
    
    dx = p
    dp = -2 * zeta * w0 * p - w0**2 * x

    return [dx, dp]
{% endhighlight %}


{% highlight python linenos  %}
# initial state: 
y0 = [1.0, 0.0]
{% endhighlight %}


{% highlight python linenos  %}
# time coodinate to solve the ODE for
t = linspace(0, 10, 1000)
w0 = 2*pi*1.0
{% endhighlight %}


{% highlight python linenos  %}
# solve the ODE problem for three different values of the damping ratio

y1 = odeint(dy, y0, t, args=(0.0, w0)) # undamped
y2 = odeint(dy, y0, t, args=(0.2, w0)) # under damped
y3 = odeint(dy, y0, t, args=(1.0, w0)) # critial damping
y4 = odeint(dy, y0, t, args=(5.0, w0)) # over damped
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = subplots()
ax.plot(t, y1[:,0], 'k', label="undamped", linewidth=0.25)
ax.plot(t, y2[:,0], 'r', label="under damped")
ax.plot(t, y3[:,0], 'b', label=r"critical damping")
ax.plot(t, y4[:,0], 'g', label="over damped")
ax.legend();
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_52_0.png)


## Fourier transform

Fourier transforms are one of the universal tools in computational physics, which appear over and over again in different contexts. SciPy provides functions for accessing the classic [FFTPACK](http://www.netlib.org/fftpack/) library from NetLib, which is an efficient and well tested FFT library written in FORTRAN. The SciPy API has a few additional convenience functions, but overall the API is closely related to the original FORTRAN library.

To use the `fftpack` module in a python program, include it using:


{% highlight python linenos  %}
from scipy.fftpack import *
{% endhighlight %}

To demonstrate how to do a fast Fourier transform with SciPy, let's look at the FFT of the solution to the damped oscillator from the previous section:


{% highlight python linenos  %}
N = len(t)
dt = t[1]-t[0]

# calculate the fast fourier transform
# y2 is the solution to the under-damped oscillator from the previous section
F = fft(y2[:,0]) 

# calculate the frequencies for the components in F
w = fftfreq(N, dt)
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = subplots(figsize=(9,3))
ax.plot(w, abs(F));
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_58_0.png)


Since the signal is real, the spectrum is symmetric. We therefore only need to plot the part that corresponds to the postive frequencies. To extract that part of the `w` and `F` we can use some of the indexing tricks for NumPy arrays that we saw in Lecture 2:


{% highlight python linenos  %}
indices = where(w > 0) # select only indices for elements that corresponds to positive frequencies
w_pos = w[indices]
F_pos = F[indices]
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = subplots(figsize=(9,3))
ax.plot(w_pos, abs(F_pos))
ax.set_xlim(0, 5);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_61_0.png)


As expected, we now see a peak in the spectrum that is centered around 1, which is the frequency we used in the damped oscillator example.

## Linear algebra

The linear algebra module contains a lot of matrix related functions, including linear equation solving, eigenvalue solvers, matrix functions (for example matrix-exponentiation), a number of different decompositions (SVD, LU, cholesky), etc. 

Detailed documetation is available at: http://docs.scipy.org/doc/scipy/reference/linalg.html

Here we will look at how to use some of these functions:



### Linear equation systems

Linear equation systems on the matrix form

$A x = b$

where $A$ is a matrix and $x,b$ are vectors can be solved like:


{% highlight python linenos  %}
A = array([[1,2,3], [4,5,6], [7,8,9]])
b = array([1,2,3])
{% endhighlight %}


{% highlight python linenos  %}
x = solve(A, b)

x
{% endhighlight %}




    array([-0.33333333,  0.66666667,  0.        ])




{% highlight python linenos  %}
# check
dot(A, x) - b
{% endhighlight %}




    array([ -1.11022302e-16,   0.00000000e+00,   0.00000000e+00])



We can also do the same with

$A X = B$

where $A, B, X$ are matrices:


{% highlight python linenos  %}
A = rand(3,3)
B = rand(3,3)
{% endhighlight %}


{% highlight python linenos  %}
X = solve(A, B)
{% endhighlight %}


{% highlight python linenos  %}
X
{% endhighlight %}




    array([[ 2.28587973,  5.88845235,  1.6750663 ],
           [-4.88205838, -5.26531274, -1.37990347],
           [ 1.75135926, -2.05969998, -0.09859636]])




{% highlight python linenos  %}
# check
norm(dot(A, X) - B)
{% endhighlight %}




    6.2803698347351007e-16



### Eigenvalues and eigenvectors

The eigenvalue problem for a matrix $A$:

$\displaystyle A v_n = \lambda_n v_n$

where $v_n$ is the $n$th eigenvector and $\lambda_n$ is the $n$th eigenvalue.

To calculate eigenvalues of a matrix, use the `eigvals` and for calculating both eigenvalues and eigenvectors, use the function `eig`:


{% highlight python linenos  %}
evals = eigvals(A)
{% endhighlight %}


{% highlight python linenos  %}
evals
{% endhighlight %}




    array([ 1.06633891+0.j        , -0.12420467+0.10106325j,
           -0.12420467-0.10106325j])




{% highlight python linenos  %}
evals, evecs = eig(A)
{% endhighlight %}


{% highlight python linenos  %}
evals
{% endhighlight %}




    array([ 1.06633891+0.j        , -0.12420467+0.10106325j,
           -0.12420467-0.10106325j])




{% highlight python linenos  %}
evecs
{% endhighlight %}




    array([[ 0.89677688+0.j        , -0.30219843-0.30724366j,
            -0.30219843+0.30724366j],
           [ 0.35446145+0.j        ,  0.79483507+0.j        ,  0.79483507+0.j        ],
           [ 0.26485526+0.j        , -0.20767208+0.37334563j,
            -0.20767208-0.37334563j]])



The eigenvectors corresponding to the $n$th eigenvalue (stored in `evals[n]`) is the $n$th *column* in `evecs`, i.e., `evecs[:,n]`. To verify this, let's try mutiplying eigenvectors with the matrix and compare to the product of the eigenvector and the eigenvalue:


{% highlight python linenos  %}
n = 1

norm(dot(A, evecs[:,n]) - evals[n] * evecs[:,n])
{% endhighlight %}




    1.3964254612015911e-16



There are also more specialized eigensolvers, like the `eigh` for Hermitian matrices. 

### Matrix operations


{% highlight python linenos  %}
# the matrix inverse
inv(A)
{% endhighlight %}




    array([[-1.38585633,  1.36837431,  6.03633364],
           [ 3.80855289, -4.76960426, -5.2571037 ],
           [ 0.0689213 ,  2.4652602 , -2.5948838 ]])




{% highlight python linenos  %}
# determinant
det(A)
{% endhighlight %}




    0.027341548212627968




{% highlight python linenos  %}
# norms of various orders
norm(A, ord=2), norm(A, ord=Inf)
{% endhighlight %}




    (1.1657807164173386, 1.7872032588446576)



### Sparse matrices

Sparse matrices are often useful in numerical simulations dealing with large systems, if the problem can be described in matrix form where the matrices or vectors mostly contains zeros. Scipy has a good support for sparse matrices, with basic linear algebra operations (such as equation solving, eigenvalue calculations, etc).

There are many possible strategies for storing sparse matrices in an efficient way. Some of the most common are the so-called coordinate form (COO), list of list (LIL) form,  and compressed-sparse column CSC (and row, CSR). Each format has some advantanges and disadvantages. Most computational algorithms (equation solving, matrix-matrix multiplication, etc) can be efficiently implemented using CSR or CSC formats, but they are not so intuitive and not so easy to initialize. So often a sparse matrix is initially created in COO or LIL format (where we can efficiently add elements to the sparse matrix data), and then converted to CSC or CSR before used in real calcalations.

For more information about these sparse formats, see e.g. http://en.wikipedia.org/wiki/Sparse_matrix

When we create a sparse matrix we have to choose which format it should be stored in. For example, 


{% highlight python linenos  %}
from scipy.sparse import *
{% endhighlight %}


{% highlight python linenos  %}
# dense matrix
M = array([[1,0,0,0], [0,3,0,0], [0,1,1,0], [1,0,0,1]]); M
{% endhighlight %}




    array([[1, 0, 0, 0],
           [0, 3, 0, 0],
           [0, 1, 1, 0],
           [1, 0, 0, 1]])




{% highlight python linenos  %}
# convert from dense to sparse
A = csr_matrix(M); A
{% endhighlight %}




    <4x4 sparse matrix of type '<type 'numpy.int64'>'
    	with 6 stored elements in Compressed Sparse Row format>




{% highlight python linenos  %}
# convert from sparse to dense
A.todense()
{% endhighlight %}




    matrix([[1, 0, 0, 0],
            [0, 3, 0, 0],
            [0, 1, 1, 0],
            [1, 0, 0, 1]])



More efficient way to create sparse matrices: create an empty matrix and populate with using matrix indexing (avoids creating a potentially large dense matrix)


{% highlight python linenos  %}
A = lil_matrix((4,4)) # empty 4x4 sparse matrix
A[0,0] = 1
A[1,1] = 3
A[2,2] = A[2,1] = 1
A[3,3] = A[3,0] = 1
A
{% endhighlight %}




    <4x4 sparse matrix of type '<type 'numpy.float64'>'
    	with 6 stored elements in LInked List format>




{% highlight python linenos  %}
A.todense()
{% endhighlight %}




    matrix([[ 1.,  0.,  0.,  0.],
            [ 0.,  3.,  0.,  0.],
            [ 0.,  1.,  1.,  0.],
            [ 1.,  0.,  0.,  1.]])



Converting between different sparse matrix formats:


{% highlight python linenos  %}
A
{% endhighlight %}




    <4x4 sparse matrix of type '<type 'numpy.float64'>'
    	with 6 stored elements in LInked List format>




{% highlight python linenos  %}
A = csr_matrix(A); A
{% endhighlight %}




    <4x4 sparse matrix of type '<type 'numpy.float64'>'
    	with 6 stored elements in Compressed Sparse Row format>




{% highlight python linenos  %}
A = csc_matrix(A); A
{% endhighlight %}




    <4x4 sparse matrix of type '<type 'numpy.float64'>'
    	with 6 stored elements in Compressed Sparse Column format>



We can compute with sparse matrices like with dense matrices:


{% highlight python linenos  %}
A.todense()
{% endhighlight %}




    matrix([[ 1.,  0.,  0.,  0.],
            [ 0.,  3.,  0.,  0.],
            [ 0.,  1.,  1.,  0.],
            [ 1.,  0.,  0.,  1.]])




{% highlight python linenos  %}
(A * A).todense()
{% endhighlight %}




    matrix([[ 1.,  0.,  0.,  0.],
            [ 0.,  9.,  0.,  0.],
            [ 0.,  4.,  1.,  0.],
            [ 2.,  0.,  0.,  1.]])




{% highlight python linenos  %}
dot(A, A).todense()
{% endhighlight %}




    matrix([[ 1.,  0.,  0.,  0.],
            [ 0.,  9.,  0.,  0.],
            [ 0.,  4.,  1.,  0.],
            [ 2.,  0.,  0.,  1.]])




{% highlight python linenos  %}
v = array([1,2,3,4])[:,newaxis]; v
{% endhighlight %}




    array([[1],
           [2],
           [3],
           [4]])




{% highlight python linenos  %}
# sparse matrix - dense vector multiplication
A * v
{% endhighlight %}




    array([[ 1.],
           [ 6.],
           [ 5.],
           [ 5.]])




{% highlight python linenos  %}
# same result with dense matrix - dense vector multiplcation
A.todense() * v
{% endhighlight %}




    matrix([[ 1.],
            [ 6.],
            [ 5.],
            [ 5.]])



## Optimization

Optimization (finding minima or maxima of a function) is a large field in mathematics, and optimization of complicated functions or in many variables can be rather involved. Here we will only look at a few very simple cases. For a more detailed introduction to optimization with SciPy see: http://scipy-lectures.github.com/advanced/mathematical_optimization/index.html

To use the optimization module in scipy first include the `optimize` module:


{% highlight python linenos  %}
from scipy import optimize
{% endhighlight %}

### Finding a minima

Let's first look at how to find the minima of a simple function of a single variable:


{% highlight python linenos  %}
def f(x):
    return 4*x**3 + (x-2)**2 + x**4
{% endhighlight %}


{% highlight python linenos  %}
fig, ax  = subplots()
x = linspace(-5, 3, 100)
ax.plot(x, f(x));
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_115_0.png)


We can use the `fmin_bfgs` function to find the minima of a function:


{% highlight python linenos  %}
x_min = optimize.fmin_bfgs(f, -2)
x_min 
{% endhighlight %}

    Optimization terminated successfully.
             Current function value: -3.506641
             Iterations: 6
             Function evaluations: 30
             Gradient evaluations: 10





    array([-2.67298167])




{% highlight python linenos  %}
optimize.fmin_bfgs(f, 0.5) 
{% endhighlight %}

    Optimization terminated successfully.
             Current function value: 2.804988
             Iterations: 3
             Function evaluations: 15
             Gradient evaluations: 5





    array([ 0.46961745])



We can also use the `brent` or `fminbound` functions. They have a bit different syntax and use different algorithms. 


{% highlight python linenos  %}
optimize.brent(f)
{% endhighlight %}




    0.46961743402759754




{% highlight python linenos  %}
optimize.fminbound(f, -4, 2)
{% endhighlight %}




    -2.6729822917513886



### Finding a solution to a function

To find the root for a function of the form $f(x) = 0$ we can use the `fsolve` function. It requires an initial guess: 


{% highlight python linenos  %}
omega_c = 3.0
def f(omega):
    # a transcendental equation: resonance frequencies of a low-Q SQUID terminated microwave resonator
    return tan(2*pi*omega) - omega_c/omega
{% endhighlight %}


{% highlight python linenos  %}
fig, ax  = subplots(figsize=(10,4))
x = linspace(0, 3, 1000)
y = f(x)
mask = where(abs(y) > 50)
x[mask] = y[mask] = NaN # get rid of vertical line when the function flip sign
ax.plot(x, y)
ax.plot([0, 3], [0, 0], 'k')
ax.set_ylim(-5,5);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_125_0.png)



{% highlight python linenos  %}
optimize.fsolve(f, 0.1)
{% endhighlight %}




    array([ 0.23743014])




{% highlight python linenos  %}
optimize.fsolve(f, 0.6)
{% endhighlight %}




    array([ 0.71286972])




{% highlight python linenos  %}
optimize.fsolve(f, 1.1)
{% endhighlight %}




    array([ 1.18990285])



## Interpolation

Interpolation is simple and convenient in scipy: The `interp1d` function, when given arrays describing X and Y data, returns and object that behaves like a function that can be called for an arbitrary value of x (in the range covered by X), and it returns the corresponding interpolated y value:


{% highlight python linenos  %}
from scipy.interpolate import *
{% endhighlight %}


{% highlight python linenos  %}
def f(x):
    return sin(x)
{% endhighlight %}


{% highlight python linenos  %}
n = arange(0, 10)  
x = linspace(0, 9, 100)

y_meas = f(n) + 0.1 * randn(len(n)) # simulate measurement with noise
y_real = f(x)

linear_interpolation = interp1d(n, y_meas)
y_interp1 = linear_interpolation(x)

cubic_interpolation = interp1d(n, y_meas, kind='cubic')
y_interp2 = cubic_interpolation(x)
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = subplots(figsize=(10,4))
ax.plot(n, y_meas, 'bs', label='noisy data')
ax.plot(x, y_real, 'k', lw=2, label='true function')
ax.plot(x, y_interp1, 'r', label='linear interp')
ax.plot(x, y_interp2, 'g', label='cubic interp')
ax.legend(loc=3);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_134_0.png)


## Statistics

The `scipy.stats` module contains a large number of statistical distributions, statistical functions and tests. For a complete documentation of its features, see http://docs.scipy.org/doc/scipy/reference/stats.html.

There is also a very powerful python package for statistical modelling called statsmodels. See http://statsmodels.sourceforge.net for more details.


{% highlight python linenos  %}
from scipy import stats
{% endhighlight %}


{% highlight python linenos  %}
# create a (discreet) random variable with poissionian distribution

X = stats.poisson(3.5) # photon distribution for a coherent state with n=3.5 photons
{% endhighlight %}


{% highlight python linenos  %}
n = arange(0,15)

fig, axes = subplots(3,1, sharex=True)

# plot the probability mass function (PMF)
axes[0].step(n, X.pmf(n))

# plot the commulative distribution function (CDF)
axes[1].step(n, X.cdf(n))

# plot histogram of 1000 random realizations of the stochastic variable X
axes[2].hist(X.rvs(size=1000));
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_139_0.png)



{% highlight python linenos  %}
# create a (continous) random variable with normal distribution
Y = stats.norm()
{% endhighlight %}


{% highlight python linenos  %}
x = linspace(-5,5,100)

fig, axes = subplots(3,1, sharex=True)

# plot the probability distribution function (PDF)
axes[0].plot(x, Y.pdf(x))

# plot the commulative distributin function (CDF)
axes[1].plot(x, Y.cdf(x));

# plot histogram of 1000 random realizations of the stochastic variable Y
axes[2].hist(Y.rvs(size=1000), bins=50);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython/images/2015-04-10-lecture-3-scipy_files/2015-04-10-lecture-3-scipy_141_0.png)


Statistics:


{% highlight python linenos  %}
X.mean(), X.std(), X.var() # poission distribution
{% endhighlight %}




    (3.5, 1.8708286933869707, 3.5)




{% highlight python linenos  %}
Y.mean(), Y.std(), Y.var() # normal distribution
{% endhighlight %}




    (0.0, 1.0, 1.0)



### Statistical tests

Test if two sets of (independent) random data comes from the same distribution:


{% highlight python linenos  %}
t_statistic, p_value = stats.ttest_ind(X.rvs(size=1000), X.rvs(size=1000))

print "t-statistic =", t_statistic
print "p-value =", p_value
{% endhighlight %}

    t-statistic = -0.244622880865
    p-value = 0.806773564698


> Since the p value is very large we cannot reject the hypothesis that the two sets of random data have *different* means.

To test if the mean of a single sample of data has mean 0.1 (the true mean is 0.0):


{% highlight python linenos  %}
stats.ttest_1samp(Y.rvs(size=1000), 0.1)
{% endhighlight %}




    (-4.4661322772225356, 8.8726783620609218e-06)



Low p-value means that we can reject the hypothesis that the mean of Y is 0.1.


{% highlight python linenos  %}
Y.mean()
{% endhighlight %}




    0.0




{% highlight python linenos  %}
stats.ttest_1samp(Y.rvs(size=1000), Y.mean())
{% endhighlight %}




    (0.51679431628006112, 0.60541413382728715)



## Further reading

* http://www.scipy.org - The official web page for the SciPy project.
* http://docs.scipy.org/doc/scipy/reference/tutorial/index.html - A tutorial on how to get started using SciPy. 
* https://github.com/scipy/scipy/ - The SciPy source code. 

## Versions


{% highlight python linenos  %}
%reload_ext version_information

%version_information numpy, scipy
{% endhighlight %}




<table><tr><th>Software</th><th>Version</th></tr><tr><td>Python</td><td>3.3.2+ (default, Feb 28 2014, 00:52:16) [GCC 4.8.1]</td></tr><tr><td>IPython</td><td>2.2.0</td></tr><tr><td>OS</td><td>posix [linux]</td></tr><tr><td>numpy</td><td>1.8.2</td></tr><tr><td>scipy</td><td>0.14.0</td></tr><tr><td colspan='2'>Tue Aug 26 22:45:19 2014 JST</td></tr></table>


