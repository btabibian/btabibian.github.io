---
layout: python_note
title: "Lecture 2"
subtitle: "Numpy"
tags: [u'learning', u'python']
categories: [

scientific-computing,

]
date:  2015-04-15
parent: "learningPython"
img: [
numpy.jpeg,
]

github: https://github.com/btabibian/scientific-python-lectures/blob/master/Lecture-2-Numpy.ipynb

---
# Numpy -  multidimensional data arrays

J.R. Johansson (robert@riken.jp) http://dml.riken.jp/~rob/

The latest version of this [IPython notebook](http://ipython.org/notebook.html) lecture is available at [http://github.com/jrjohansson/scientific-python-lectures](http://github.com/jrjohansson/scientific-python-lectures).

The other notebooks in this lecture series are indexed at [http://jrjohansson.github.com](http://jrjohansson.github.com).


{% highlight python linenos  %}
# what is this line all about?!? Answer in lecture 4
%pylab inline
{% endhighlight %}

    Populating the interactive namespace from numpy and matplotlib


## Introduction

The `numpy` package (module) is used in almost all numerical computation using Python. It is a package that provide high-performance vector, matrix and higher-dimensional data structures for Python. It is implemented in C and Fortran so when calculations are vectorized (formulated with vectors and matrices), performance is very good. 

To use `numpy` need to import the module it using of example:


{% highlight python linenos  %}
from numpy import *
{% endhighlight %}

In the `numpy` package the terminology used for vectors, matrices and higher-dimensional data sets is *array*. 



## Creating `numpy` arrays

There are a number of ways to initialize new numpy arrays, for example from

* a Python list or tuples
* using functions that are dedicated to generating numpy arrays, such as `arange`, `linspace`, etc.
* reading data from files

### From lists

For example, to create new vector and matrix arrays from Python lists we can use the `numpy.array` function.


{% highlight python linenos  %}
# a vector: the argument to the array function is a Python list
v = array([1,2,3,4])

v
{% endhighlight %}




    array([1, 2, 3, 4])




{% highlight python linenos  %}
# a matrix: the argument to the array function is a nested Python list
M = array([[1, 2], [3, 4]])

M
{% endhighlight %}




    array([[1, 2],
           [3, 4]])



The `v` and `M` objects are both of the type `ndarray` that the `numpy` module provides.


{% highlight python linenos  %}
type(v), type(M)
{% endhighlight %}




    (numpy.ndarray, numpy.ndarray)



The difference between the `v` and `M` arrays is only their shapes. We can get information about the shape of an array by using the `ndarray.shape` property.


{% highlight python linenos  %}
v.shape
{% endhighlight %}




    (4,)




{% highlight python linenos  %}
M.shape
{% endhighlight %}




    (2, 2)



The number of elements in the array is available through the `ndarray.size` property:


{% highlight python linenos  %}
M.size
{% endhighlight %}




    4



Equivalently, we could use the function `numpy.shape` and `numpy.size`


{% highlight python linenos  %}
shape(M)
{% endhighlight %}




    (2, 2)




{% highlight python linenos  %}
size(M)
{% endhighlight %}




    4



So far the `numpy.ndarray` looks awefully much like a Python list (or nested list). Why not simply use Python lists for computations instead of creating a new array type? 

There are several reasons:

* Python lists are very general. They can contain any kind of object. They are dynamically typed. They do not support mathematical functions such as matrix and dot multiplications, etc. Implementating such functions for Python lists would not be very efficient because of the dynamic typing.
* Numpy arrays are **statically typed** and **homogeneous**. The type of the elements is determined when array is created.
* Numpy arrays are memory efficient.
* Because of the static typing, fast implementation of mathematical functions such as multiplication and addition of `numpy` arrays can be implemented in a compiled language (C and Fortran is used).

Using the `dtype` (data type) property of an `ndarray`, we can see what type the data of an array has:


{% highlight python linenos  %}
M.dtype
{% endhighlight %}




    dtype('int64')



We get an error if we try to assign a value of the wrong type to an element in a numpy array:


{% highlight python linenos  %}
M[0,0] = "hello"
{% endhighlight %}


    ---------------------------------------------------------------------------

    ValueError                                Traceback (most recent call last)

    <ipython-input-12-a09d72434238> in <module>()
    ----> 1 M[0,0] = "hello"
    

    ValueError: invalid literal for long() with base 10: 'hello'


If we want, we can explicitly define the type of the array data when we create it, using the `dtype` keyword argument: 


{% highlight python linenos  %}
M = array([[1, 2], [3, 4]], dtype=complex)

M
{% endhighlight %}




    array([[ 1.+0.j,  2.+0.j],
           [ 3.+0.j,  4.+0.j]])



Common type that can be used with `dtype` are: `int`, `float`, `complex`, `bool`, `object`, etc.

We can also explicitly define the bit size of the data types, for example: `int64`, `int16`, `float128`, `complex128`.

### Using array-generating functions

For larger arrays it is impractical to initialize the data manually, using explicit python lists. Instead we can use one of the many functions in `numpy` that generates arrays of different forms. Some of the more common are:

#### arange


{% highlight python linenos  %}
# create a range

x = arange(0, 10, 1) # arguments: start, stop, step

x
{% endhighlight %}




    array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])




{% highlight python linenos  %}
x = arange(-1, 1, 0.1)

x
{% endhighlight %}




    array([ -1.00000000e+00,  -9.00000000e-01,  -8.00000000e-01,
            -7.00000000e-01,  -6.00000000e-01,  -5.00000000e-01,
            -4.00000000e-01,  -3.00000000e-01,  -2.00000000e-01,
            -1.00000000e-01,  -2.22044605e-16,   1.00000000e-01,
             2.00000000e-01,   3.00000000e-01,   4.00000000e-01,
             5.00000000e-01,   6.00000000e-01,   7.00000000e-01,
             8.00000000e-01,   9.00000000e-01])



#### linspace and logspace


{% highlight python linenos  %}
# using linspace, both end points ARE included
linspace(0, 10, 25)
{% endhighlight %}




    array([  0.        ,   0.41666667,   0.83333333,   1.25      ,
             1.66666667,   2.08333333,   2.5       ,   2.91666667,
             3.33333333,   3.75      ,   4.16666667,   4.58333333,
             5.        ,   5.41666667,   5.83333333,   6.25      ,
             6.66666667,   7.08333333,   7.5       ,   7.91666667,
             8.33333333,   8.75      ,   9.16666667,   9.58333333,  10.        ])




{% highlight python linenos  %}
logspace(0, 10, 10, base=e)
{% endhighlight %}




    array([  1.00000000e+00,   3.03773178e+00,   9.22781435e+00,
             2.80316249e+01,   8.51525577e+01,   2.58670631e+02,
             7.85771994e+02,   2.38696456e+03,   7.25095809e+03,
             2.20264658e+04])



#### mgrid


{% highlight python linenos  %}
x, y = mgrid[0:5, 0:5] # similar to meshgrid in MATLAB
{% endhighlight %}


{% highlight python linenos  %}
x
{% endhighlight %}




    array([[0, 0, 0, 0, 0],
           [1, 1, 1, 1, 1],
           [2, 2, 2, 2, 2],
           [3, 3, 3, 3, 3],
           [4, 4, 4, 4, 4]])




{% highlight python linenos  %}
y
{% endhighlight %}




    array([[0, 1, 2, 3, 4],
           [0, 1, 2, 3, 4],
           [0, 1, 2, 3, 4],
           [0, 1, 2, 3, 4],
           [0, 1, 2, 3, 4]])



#### random data


{% highlight python linenos  %}
from numpy import random
{% endhighlight %}


{% highlight python linenos  %}
# uniform random numbers in [0,1]
random.rand(5,5)
{% endhighlight %}




    array([[ 0.20067261,  0.31903074,  0.50413339,  0.17916857,  0.80098158],
           [ 0.4605664 ,  0.0889817 ,  0.89913197,  0.65326837,  0.95042471],
           [ 0.50638764,  0.93865793,  0.27431355,  0.12660373,  0.2375227 ],
           [ 0.11655293,  0.21264332,  0.1865033 ,  0.58306332,  0.75787615],
           [ 0.39529707,  0.58368816,  0.86195759,  0.48969116,  0.70358949]])




{% highlight python linenos  %}
# standard normal distributed random numbers
random.randn(5,5)
{% endhighlight %}




    array([[-0.38628886, -0.25183044, -0.75108899, -0.24938967,  0.04214111],
           [ 2.58066361, -1.0318666 ,  0.06503565,  0.09726207,  1.63467302],
           [ 0.43746396, -1.6740317 ,  0.70424676,  0.48901995, -0.7179185 ],
           [ 0.6081299 ,  0.15481145,  0.78895533,  0.60471688, -1.05199935],
           [ 0.49851063,  0.71784166, -1.18752626,  1.03286227,  0.57774408]])



#### diag


{% highlight python linenos  %}
# a diagonal matrix
diag([1,2,3])
{% endhighlight %}




    array([[1, 0, 0],
           [0, 2, 0],
           [0, 0, 3]])




{% highlight python linenos  %}
# diagonal with offset from the main diagonal
diag([1,2,3], k=1) 
{% endhighlight %}




    array([[0, 1, 0, 0],
           [0, 0, 2, 0],
           [0, 0, 0, 3],
           [0, 0, 0, 0]])



#### zeros and ones


{% highlight python linenos  %}
zeros((3,3))
{% endhighlight %}




    array([[ 0.,  0.,  0.],
           [ 0.,  0.,  0.],
           [ 0.,  0.,  0.]])




{% highlight python linenos  %}
ones((3,3))
{% endhighlight %}




    array([[ 1.,  1.,  1.],
           [ 1.,  1.,  1.],
           [ 1.,  1.,  1.]])



## File I/O

### Comma-separated values (CSV)

A very common file format for data files are the comma-separated values (CSV), or related format such as TSV (tab-separated values). To read data from such file into Numpy arrays we can use the `numpy.genfromtxt` function. For example, 


{% highlight python linenos  %}
!head stockholm_td_adj.dat
{% endhighlight %}

    1800  1  1    -6.1    -6.1    -6.1 1
    1800  1  2   -15.4   -15.4   -15.4 1
    1800  1  3   -15.0   -15.0   -15.0 1
    1800  1  4   -19.3   -19.3   -19.3 1
    1800  1  5   -16.8   -16.8   -16.8 1
    1800  1  6   -11.4   -11.4   -11.4 1
    1800  1  7    -7.6    -7.6    -7.6 1
    1800  1  8    -7.1    -7.1    -7.1 1
    1800  1  9   -10.1   -10.1   -10.1 1
    1800  1 10    -9.5    -9.5    -9.5 1



{% highlight python linenos  %}
data = genfromtxt('stockholm_td_adj.dat')
{% endhighlight %}


{% highlight python linenos  %}
data.shape
{% endhighlight %}




    (77431, 7)




{% highlight python linenos  %}
fig, ax = subplots(figsize=(14,4))
ax.plot(data[:,0]+data[:,1]/12.0+data[:,2]/365, data[:,5])
ax.axis('tight')
ax.set_title('tempeatures in Stockholm')
ax.set_xlabel('year')
ax.set_ylabel('temperature (C)');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-2-numpy_files/2015-04-15-lecture-2-numpy_58_0.png)


Using `numpy.savetxt` we can store a Numpy array to a file in CSV format:


{% highlight python linenos  %}
M = rand(3,3)

M
{% endhighlight %}




    array([[ 0.33005805,  0.83865056,  0.57961497],
           [ 0.25206785,  0.8369909 ,  0.8509039 ],
           [ 0.82622818,  0.08387398,  0.73442222]])




{% highlight python linenos  %}
savetxt("random-matrix.csv", M)
{% endhighlight %}


{% highlight python linenos  %}
!cat random-matrix.csv
{% endhighlight %}

    3.300580456122463868e-01 8.386505645635993211e-01 5.796149703411075382e-01
    2.520678545950313376e-01 8.369908984836819110e-01 8.509038976540077570e-01
    8.262281797172411624e-01 8.387398055365946625e-02 7.344222208274131525e-01



{% highlight python linenos  %}
savetxt("random-matrix.csv", M, fmt='%.5f') # fmt specifies the format

!cat random-matrix.csv
{% endhighlight %}

    0.33006 0.83865 0.57961
    0.25207 0.83699 0.85090
    0.82623 0.08387 0.73442


### Numpy's native file format

Useful when storing and reading back numpy array data. Use the functions `numpy.save` and `numpy.load`:


{% highlight python linenos  %}
save("random-matrix.npy", M)

!file random-matrix.npy
{% endhighlight %}

    random-matrix.npy: data



{% highlight python linenos  %}
load("random-matrix.npy")
{% endhighlight %}




    array([[ 0.33005805,  0.83865056,  0.57961497],
           [ 0.25206785,  0.8369909 ,  0.8509039 ],
           [ 0.82622818,  0.08387398,  0.73442222]])



## More properties of the numpy arrays


{% highlight python linenos  %}
M.itemsize # bytes per element
{% endhighlight %}




    8




{% highlight python linenos  %}
M.nbytes # number of bytes
{% endhighlight %}




    72




{% highlight python linenos  %}
M.ndim # number of dimensions
{% endhighlight %}




    2



## Manipulating arrays

### Indexing

We can index elements in an array using the square bracket and indices:


{% highlight python linenos  %}
# v is a vector, and has only one dimension, taking one index
v[0]
{% endhighlight %}




    1




{% highlight python linenos  %}
# M is a matrix, or a 2 dimensional array, taking two indices 
M[1,1]
{% endhighlight %}




    0.83699089848368191



If we omit an index of a multidimensional array it returns the whole row (or, in general, a N-1 dimensional array) 


{% highlight python linenos  %}
M
{% endhighlight %}




    array([[ 0.33005805,  0.83865056,  0.57961497],
           [ 0.25206785,  0.8369909 ,  0.8509039 ],
           [ 0.82622818,  0.08387398,  0.73442222]])




{% highlight python linenos  %}
M[1]
{% endhighlight %}




    array([ 0.25206785,  0.8369909 ,  0.8509039 ])



The same thing can be achieved with using `:` instead of an index: 


{% highlight python linenos  %}
M[1,:] # row 1
{% endhighlight %}




    array([ 0.25206785,  0.8369909 ,  0.8509039 ])




{% highlight python linenos  %}
M[:,1] # column 1
{% endhighlight %}




    array([ 0.83865056,  0.8369909 ,  0.08387398])



We can assign new values to elements in an array using indexing:


{% highlight python linenos  %}
M[0,0] = 1
{% endhighlight %}


{% highlight python linenos  %}
M
{% endhighlight %}




    array([[ 1.        ,  0.83865056,  0.57961497],
           [ 0.25206785,  0.8369909 ,  0.8509039 ],
           [ 0.82622818,  0.08387398,  0.73442222]])




{% highlight python linenos  %}
# also works for rows and columns
M[1,:] = 0
M[:,2] = -1
{% endhighlight %}


{% highlight python linenos  %}
M
{% endhighlight %}




    array([[ 1.        ,  0.83865056, -1.        ],
           [ 0.        ,  0.        , -1.        ],
           [ 0.82622818,  0.08387398, -1.        ]])



### Index slicing

Index slicing is the technical name for the syntax `M[lower:upper:step]` to extract part of an array:


{% highlight python linenos  %}
A = array([1,2,3,4,5])
A
{% endhighlight %}




    array([1, 2, 3, 4, 5])




{% highlight python linenos  %}
A[1:3]
{% endhighlight %}




    array([2, 3])



Array slices are *mutable*: if they are assigned a new value the original array from which the slice was extracted is modified:


{% highlight python linenos  %}
A[1:3] = [-2,-3]

A
{% endhighlight %}




    array([ 1, -2, -3,  4,  5])



We can omit any of the three parameters in `M[lower:upper:step]`:


{% highlight python linenos  %}
A[::] # lower, upper, step all take the default values
{% endhighlight %}




    array([ 1, -2, -3,  4,  5])




{% highlight python linenos  %}
A[::2] # step is 2, lower and upper defaults to the beginning and end of the array
{% endhighlight %}




    array([ 1, -3,  5])




{% highlight python linenos  %}
A[:3] # first three elements
{% endhighlight %}




    array([ 1, -2, -3])




{% highlight python linenos  %}
A[3:] # elements from index 3
{% endhighlight %}




    array([4, 5])



Negative indices counts from the end of the array (positive index from the begining):


{% highlight python linenos  %}
A = array([1,2,3,4,5])
{% endhighlight %}


{% highlight python linenos  %}
A[-1] # the last element in the array
{% endhighlight %}




    5




{% highlight python linenos  %}
A[-3:] # the last three elements
{% endhighlight %}




    array([3, 4, 5])



Index slicing works exactly the same way for multidimensional arrays:


{% highlight python linenos  %}
A = array([[n+m*10 for n in range(5)] for m in range(5)])

A
{% endhighlight %}




    array([[ 0,  1,  2,  3,  4],
           [10, 11, 12, 13, 14],
           [20, 21, 22, 23, 24],
           [30, 31, 32, 33, 34],
           [40, 41, 42, 43, 44]])




{% highlight python linenos  %}
# a block from the original array
A[1:4, 1:4]
{% endhighlight %}




    array([[11, 12, 13],
           [21, 22, 23],
           [31, 32, 33]])




{% highlight python linenos  %}
# strides
A[::2, ::2]
{% endhighlight %}




    array([[ 0,  2,  4],
           [20, 22, 24],
           [40, 42, 44]])



### Fancy indexing

Fancy indexing is the name for when an array or list is used in-place of an index: 


{% highlight python linenos  %}
row_indices = [1, 2, 3]
A[row_indices]
{% endhighlight %}




    array([[10, 11, 12, 13, 14],
           [20, 21, 22, 23, 24],
           [30, 31, 32, 33, 34]])




{% highlight python linenos  %}
col_indices = [1, 2, -1] # remember, index -1 means the last element
A[row_indices, col_indices]
{% endhighlight %}




    array([11, 22, 34])



We can also index masks: If the index mask is an Numpy array of with data type `bool`, then an element is selected (True) or not (False) depending on the value of the index mask at the position each element: 


{% highlight python linenos  %}
B = array([n for n in range(5)])
B
{% endhighlight %}




    array([0, 1, 2, 3, 4])




{% highlight python linenos  %}
row_mask = array([True, False, True, False, False])
B[row_mask]
{% endhighlight %}




    array([0, 2])




{% highlight python linenos  %}
# same thing
row_mask = array([1,0,1,0,0], dtype=bool)
B[row_mask]
{% endhighlight %}




    array([0, 2])



This feature is very useful to conditionally select elements from an array, using for example comparison operators:


{% highlight python linenos  %}
x = arange(0, 10, 0.5)
x
{% endhighlight %}




    array([ 0. ,  0.5,  1. ,  1.5,  2. ,  2.5,  3. ,  3.5,  4. ,  4.5,  5. ,
            5.5,  6. ,  6.5,  7. ,  7.5,  8. ,  8.5,  9. ,  9.5])




{% highlight python linenos  %}
mask = (5 < x) * (x < 7.5)

mask
{% endhighlight %}




    array([False, False, False, False, False, False, False, False, False,
           False, False,  True,  True,  True,  True, False, False, False,
           False, False], dtype=bool)




{% highlight python linenos  %}
x[mask]
{% endhighlight %}




    array([ 5.5,  6. ,  6.5,  7. ])



## Performance

Before going any further let's have a look at how Numpy compares to pure Python lists in terms of performance.

To do this we implement a few examples and compare the execution speed.


{% highlight python linenos  %}
import datetime
from timeit import Timer
Nelements = 10000
Ntimeits = 10000

x = arange(Nelements)
y = range(Nelements)

t_numpy = Timer("x.sum()", "from __main__ import x")
t_list = Timer("sum(y)", "from __main__ import y")
print "numpy: %.3e seconds" % (t_numpy.timeit(Ntimeits)/Ntimeits,)
print "list:  %.3e seconds" % (t_list.timeit(Ntimeits)/Ntimeits,)
{% endhighlight %}

    numpy: 5.634e-06 seconds
    list:  4.472e-05 seconds


## Functions for extracting data from arrays and creating arrays

### where

The index mask can be converted to position index using the `where` function


{% highlight python linenos  %}
indices = where(mask)

indices
{% endhighlight %}




    (array([11, 12, 13, 14]),)




{% highlight python linenos  %}
x[indices] # this indexing is equivalent to the fancy indexing x[mask]
{% endhighlight %}




    array([11, 12, 13, 14])



### diag

With the diag function we can also extract the diagonal and subdiagonals of an array:


{% highlight python linenos  %}
diag(A)
{% endhighlight %}




    array([ 0, 11, 22, 33, 44])




{% highlight python linenos  %}
diag(A, -1)
{% endhighlight %}




    array([10, 21, 32, 43])



### take

The `take` function is similar to fancy indexing described above:


{% highlight python linenos  %}
v2 = arange(-3,3)
v2
{% endhighlight %}




    array([-3, -2, -1,  0,  1,  2])




{% highlight python linenos  %}
row_indices = [1, 3, 5]
v2[row_indices] # fancy indexing
{% endhighlight %}




    array([-2,  0,  2])




{% highlight python linenos  %}
v2.take(row_indices)
{% endhighlight %}




    array([-2,  0,  2])



But `take` also works on lists and other objects:


{% highlight python linenos  %}
take([-3, -2, -1,  0,  1,  2], row_indices)
{% endhighlight %}




    array([-2,  0,  2])



### choose

Constructs and array by picking elements form several arrays:


{% highlight python linenos  %}
which = [1, 0, 1, 0]
choices = [[-2,-2,-2,-2], [5,5,5,5]]

choose(which, choices)
{% endhighlight %}




    array([ 5, -2,  5, -2])



## Linear algebra

Vectorizing code is the key to writing efficient numerical calculation with Python/Numpy. That means that as much as possible of a program should be formulated in terms of matrix and vector operations, like matrix-matrix multiplication.

### Scalar-array operations

We can use the usual arithmetic operators to multiply, add, subtract, and divide arrays with scalar numbers.


{% highlight python linenos  %}
v1 = arange(0, 5)
{% endhighlight %}


{% highlight python linenos  %}
v1 * 2
{% endhighlight %}




    array([0, 2, 4, 6, 8])




{% highlight python linenos  %}
v1 + 2
{% endhighlight %}




    array([2, 3, 4, 5, 6])




{% highlight python linenos  %}
A * 2, A + 2
{% endhighlight %}




    (array([[ 0,  2,  4,  6,  8],
            [20, 22, 24, 26, 28],
            [40, 42, 44, 46, 48],
            [60, 62, 64, 66, 68],
            [80, 82, 84, 86, 88]]), array([[ 2,  3,  4,  5,  6],
            [12, 13, 14, 15, 16],
            [22, 23, 24, 25, 26],
            [32, 33, 34, 35, 36],
            [42, 43, 44, 45, 46]]))



### Element-wise array-array operations

When we add, subtract, multiply and divide arrays with each other, the default behaviour is **element-wise** operations:


{% highlight python linenos  %}
A * A # element-wise multiplication
{% endhighlight %}




    array([[   0,    1,    4,    9,   16],
           [ 100,  121,  144,  169,  196],
           [ 400,  441,  484,  529,  576],
           [ 900,  961, 1024, 1089, 1156],
           [1600, 1681, 1764, 1849, 1936]])




{% highlight python linenos  %}
v1 * v1
{% endhighlight %}




    array([ 0,  1,  4,  9, 16])



If we multiply arrays with compatible shapes, we get an element-wise multiplication of each row:


{% highlight python linenos  %}
A.shape, v1.shape
{% endhighlight %}




    ((5, 5), (5,))




{% highlight python linenos  %}
A * v1
{% endhighlight %}




    array([[  0,   1,   4,   9,  16],
           [  0,  11,  24,  39,  56],
           [  0,  21,  44,  69,  96],
           [  0,  31,  64,  99, 136],
           [  0,  41,  84, 129, 176]])



### Matrix algebra

What about matrix mutiplication? There are two ways. We can either use the `dot` function, which applies a matrix-matrix, matrix-vector, or inner vector multiplication to its two arguments: 


{% highlight python linenos  %}
dot(A, A)
{% endhighlight %}




    array([[ 300,  310,  320,  330,  340],
           [1300, 1360, 1420, 1480, 1540],
           [2300, 2410, 2520, 2630, 2740],
           [3300, 3460, 3620, 3780, 3940],
           [4300, 4510, 4720, 4930, 5140]])




{% highlight python linenos  %}
dot(A, v1)
{% endhighlight %}




    array([ 30, 130, 230, 330, 430])




{% highlight python linenos  %}
dot(v1, v1)
{% endhighlight %}




    30



Alternatively, we can cast the array objects to the type `matrix`. This changes the behavior of the standard arithmetic operators `+, -, *` to use matrix algebra.


{% highlight python linenos  %}
M = matrix(A)
v = matrix(v1).T # make it a column vector
{% endhighlight %}


{% highlight python linenos  %}
v
{% endhighlight %}




    matrix([[0],
            [1],
            [2],
            [3],
            [4]])




{% highlight python linenos  %}
M * M
{% endhighlight %}




    matrix([[ 300,  310,  320,  330,  340],
            [1300, 1360, 1420, 1480, 1540],
            [2300, 2410, 2520, 2630, 2740],
            [3300, 3460, 3620, 3780, 3940],
            [4300, 4510, 4720, 4930, 5140]])




{% highlight python linenos  %}
M * v
{% endhighlight %}




    matrix([[ 30],
            [130],
            [230],
            [330],
            [430]])




{% highlight python linenos  %}
# inner product
v.T * v
{% endhighlight %}




    matrix([[30]])




{% highlight python linenos  %}
# with matrix objects, standard matrix algebra applies
v + M*v
{% endhighlight %}




    matrix([[ 30],
            [131],
            [232],
            [333],
            [434]])



If we try to add, subtract or multiply objects with incomplatible shapes we get an error:


{% highlight python linenos  %}
v = matrix([1,2,3,4,5,6]).T
{% endhighlight %}


{% highlight python linenos  %}
shape(M), shape(v)
{% endhighlight %}




    ((5, 5), (6, 1))




{% highlight python linenos  %}
M * v
{% endhighlight %}


    ---------------------------------------------------------------------------

    ValueError                                Traceback (most recent call last)

    <ipython-input-101-995fb48ad0cc> in <module>()
    ----> 1 M * v
    

    /is/ei/btabibian/anaconda/lib/python2.7/site-packages/numpy/matrixlib/defmatrix.pyc in __mul__(self, other)
        339         if isinstance(other, (N.ndarray, list, tuple)) :
        340             # This promotes 1-D vectors to row vectors
    --> 341             return N.dot(self, asmatrix(other))
        342         if isscalar(other) or not hasattr(other, '__rmul__') :
        343             return N.dot(self, other)


    ValueError: shapes (5,5) and (6,1) not aligned: 5 (dim 1) != 6 (dim 0)


See also the related functions: `inner`, `outer`, `cross`, `kron`, `tensordot`. Try for example `help(kron)`.

### Array/Matrix transformations

Above we have used the `.T` to transpose the matrix object `v`. We could also have used the `transpose` function to accomplish the same thing. 

Other mathematical functions that transforms matrix objects are:


{% highlight python linenos  %}
C = matrix([[1j, 2j], [3j, 4j]])
C
{% endhighlight %}




    matrix([[ 0.+1.j,  0.+2.j],
            [ 0.+3.j,  0.+4.j]])




{% highlight python linenos  %}
conjugate(C)
{% endhighlight %}




    matrix([[ 0.-1.j,  0.-2.j],
            [ 0.-3.j,  0.-4.j]])



Hermitian conjugate: transpose + conjugate


{% highlight python linenos  %}
C.H
{% endhighlight %}




    matrix([[ 0.-1.j,  0.-3.j],
            [ 0.-2.j,  0.-4.j]])



We can extract the real and imaginary parts of complex-valued arrays using `real` and `imag`:


{% highlight python linenos  %}
real(C) # same as: C.real
{% endhighlight %}




    matrix([[ 0.,  0.],
            [ 0.,  0.]])




{% highlight python linenos  %}
imag(C) # same as: C.imag
{% endhighlight %}




    matrix([[ 1.,  2.],
            [ 3.,  4.]])



Or the complex argument and absolute value


{% highlight python linenos  %}
angle(C+1) # heads up MATLAB Users, angle is used instead of arg
{% endhighlight %}




    array([[ 0.78539816,  1.10714872],
           [ 1.24904577,  1.32581766]])




{% highlight python linenos  %}
abs(C)
{% endhighlight %}




    matrix([[ 1.,  2.],
            [ 3.,  4.]])



### Matrix computations

#### Inverse


{% highlight python linenos  %}
inv(C) # equivalent to C.I 
{% endhighlight %}




    matrix([[ 0.+2.j ,  0.-1.j ],
            [ 0.-1.5j,  0.+0.5j]])




{% highlight python linenos  %}
C.I * C
{% endhighlight %}




    matrix([[  1.00000000e+00+0.j,   4.44089210e-16+0.j],
            [  0.00000000e+00+0.j,   1.00000000e+00+0.j]])



#### Determinant


{% highlight python linenos  %}
det(C)
{% endhighlight %}




    (2.0000000000000004+0j)




{% highlight python linenos  %}
det(C.I)
{% endhighlight %}




    (0.50000000000000011+0j)



### Data processing

Often it is useful to store datasets in Numpy arrays. Numpy provides a number of functions to calculate statistics of datasets in arrays. 

For example, let's calculate some properties data from the Stockholm temperature dataset used above.


{% highlight python linenos  %}
# reminder, the tempeature dataset is stored in the data variable:
shape(data)
{% endhighlight %}




    (77431, 7)



#### mean


{% highlight python linenos  %}
# the temperature data is in column 3
mean(data[:,3])
{% endhighlight %}




    6.1971096847515854



The daily mean temperature in Stockholm over the last 200 year so has been about 6.2 C.

#### standard deviations and variance


{% highlight python linenos  %}
std(data[:,3]), var(data[:,3])
{% endhighlight %}




    (8.2822716213405734, 68.596023209663414)



#### min and max


{% highlight python linenos  %}
# lowest daily average temperature
data[:,3].min()
{% endhighlight %}




    -25.800000000000001




{% highlight python linenos  %}
# highest daily average temperature
data[:,3].max()
{% endhighlight %}




    28.300000000000001



#### sum, prod, and trace


{% highlight python linenos  %}
d = arange(0, 10)
d
{% endhighlight %}




    array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])




{% highlight python linenos  %}
# sum up all elements
sum(d)
{% endhighlight %}




    45




{% highlight python linenos  %}
# product of all elements
prod(d+1)
{% endhighlight %}




    3628800




{% highlight python linenos  %}
# cummulative sum
cumsum(d)
{% endhighlight %}




    array([ 0,  1,  3,  6, 10, 15, 21, 28, 36, 45])




{% highlight python linenos  %}
# cummulative product
cumprod(d+1)
{% endhighlight %}




    array([      1,       2,       6,      24,     120,     720,    5040,
             40320,  362880, 3628800])




{% highlight python linenos  %}
# same as: diag(A).sum()
trace(A)
{% endhighlight %}




    110



### Computations on subsets of arrays

We can compute with subsets of the data in an array using indexing, fancy indexing, and the other methods of extracting data from an array (described above).

For example, let's go back to the temperature dataset:


{% highlight python linenos  %}
!head -n 3 stockholm_td_adj.dat
{% endhighlight %}

    1800  1  1    -6.1    -6.1    -6.1 1
    1800  1  2   -15.4   -15.4   -15.4 1
    1800  1  3   -15.0   -15.0   -15.0 1


The dataformat is: year, month, day, daily average temperature, low, high, location.

If we are interested in the average temperature only in a particular month, say February, then we can create a index mask and use the select out only the data for that month using:


{% highlight python linenos  %}
unique(data[:,1]) # the month column takes values from 1 to 12
{% endhighlight %}




    array([  1.,   2.,   3.,   4.,   5.,   6.,   7.,   8.,   9.,  10.,  11.,
            12.])




{% highlight python linenos  %}
mask_feb = data[:,1] == 2
{% endhighlight %}


{% highlight python linenos  %}
# the temperature data is in column 3
mean(data[mask_feb,3])
{% endhighlight %}




    -3.2121095707365961



With these tools we have very powerful data processing capabilities at our disposal. For example, to extract the average monthly average temperatures for each month of the year only takes a few lines of code: 


{% highlight python linenos  %}
months = arange(1,13)
monthly_mean = [mean(data[data[:,1] == month, 3]) for month in months]

fig, ax = subplots()
ax.bar(months, monthly_mean)
ax.set_xlabel("Month")
ax.set_ylabel("Monthly avg. temp.");
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-2-numpy_files/2015-04-15-lecture-2-numpy_218_0.png)


### Calculations with higher-dimensional data

When functions such as `min`, `max`, etc., is applied to a multidimensional arrays, it is sometimes useful to apply the calculation to the entire array, and sometimes only on a row or column basis. Using the `axis` argument we can specify how these functions should behave: 


{% highlight python linenos  %}
m = rand(3,3)
m
{% endhighlight %}




    array([[ 0.43485521,  0.04517144,  0.15983549],
           [ 0.06160665,  0.01117206,  0.95997496],
           [ 0.60084606,  0.62310207,  0.673428  ]])




{% highlight python linenos  %}
# global max
m.max()
{% endhighlight %}




    0.9599749615722134




{% highlight python linenos  %}
# max in each column
m.max(axis=0)
{% endhighlight %}




    array([ 0.60084606,  0.62310207,  0.95997496])




{% highlight python linenos  %}
# max in each row
m.max(axis=1)
{% endhighlight %}




    array([ 0.43485521,  0.95997496,  0.673428  ])



> Many other functions and methods in the `array` and `matrix` classes accept the same (optional) `axis` keyword argument.

## Reshaping, resizing and stacking arrays

The shape of an Numpy array can be modified without copying the underlaying data, which makes it a fast operation even for large arrays.


{% highlight python linenos  %}
A
{% endhighlight %}




    array([[ 0,  1,  2,  3,  4],
           [10, 11, 12, 13, 14],
           [20, 21, 22, 23, 24],
           [30, 31, 32, 33, 34],
           [40, 41, 42, 43, 44]])




{% highlight python linenos  %}
n, m = A.shape
{% endhighlight %}


{% highlight python linenos  %}
B = A.reshape((1,n*m))
B
{% endhighlight %}




    array([[ 0,  1,  2,  3,  4, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 30, 31,
            32, 33, 34, 40, 41, 42, 43, 44]])




{% highlight python linenos  %}
B[0,0:5] = 5 # modify the array

B
{% endhighlight %}




    array([[ 5,  5,  5,  5,  5, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 30, 31,
            32, 33, 34, 40, 41, 42, 43, 44]])




{% highlight python linenos  %}
A # and the original variable is also changed. B is only a different view of the same data
{% endhighlight %}




    array([[ 5,  5,  5,  5,  5],
           [10, 11, 12, 13, 14],
           [20, 21, 22, 23, 24],
           [30, 31, 32, 33, 34],
           [40, 41, 42, 43, 44]])



We can also use the function `flatten` to make a higher-dimensional array into a vector. But this function create a copy of the data.


{% highlight python linenos  %}
B = A.flatten()

B
{% endhighlight %}




    array([ 5,  5,  5,  5,  5, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 30, 31,
           32, 33, 34, 40, 41, 42, 43, 44])




{% highlight python linenos  %}
B[0:5] = 10

B
{% endhighlight %}




    array([10, 10, 10, 10, 10, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 30, 31,
           32, 33, 34, 40, 41, 42, 43, 44])




{% highlight python linenos  %}
A # now A has not changed, because B's data is a copy of A's, not refering to the same data
{% endhighlight %}




    array([[ 5,  5,  5,  5,  5],
           [10, 11, 12, 13, 14],
           [20, 21, 22, 23, 24],
           [30, 31, 32, 33, 34],
           [40, 41, 42, 43, 44]])



## Adding a new dimension: newaxis

With `newaxis`, we can insert new dimensions in an array, for example converting a vector to a column or row matrix:


{% highlight python linenos  %}
v = array([1,2,3])
{% endhighlight %}


{% highlight python linenos  %}
shape(v)
{% endhighlight %}




    (3,)




{% highlight python linenos  %}
# make a column matrix of the vector v
v[:, newaxis]
{% endhighlight %}




    array([[1],
           [2],
           [3]])




{% highlight python linenos  %}
# column matrix
v[:,newaxis].shape
{% endhighlight %}




    (3, 1)




{% highlight python linenos  %}
# row matrix
v[newaxis,:].shape
{% endhighlight %}




    (1, 3)



## Stacking and repeating arrays

Using function `repeat`, `tile`, `vstack`, `hstack`, and `concatenate` we can create larger vectors and matrices from smaller ones:

### tile and repeat


{% highlight python linenos  %}
a = array([[1, 2], [3, 4]])
{% endhighlight %}


{% highlight python linenos  %}
# repeat each element 3 times
repeat(a, 3)
{% endhighlight %}




    array([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4])




{% highlight python linenos  %}
# tile the matrix 3 times 
tile(a, 3)
{% endhighlight %}




    array([[1, 2, 1, 2, 1, 2],
           [3, 4, 3, 4, 3, 4]])



### concatenate


{% highlight python linenos  %}
b = array([[5, 6]])
{% endhighlight %}


{% highlight python linenos  %}
concatenate((a, b), axis=0)
{% endhighlight %}




    array([[1, 2],
           [3, 4],
           [5, 6]])




{% highlight python linenos  %}
concatenate((a, b.T), axis=1)
{% endhighlight %}




    array([[1, 2, 5],
           [3, 4, 6]])



### hstack and vstack


{% highlight python linenos  %}
vstack((a,b))
{% endhighlight %}




    array([[1, 2],
           [3, 4],
           [5, 6]])




{% highlight python linenos  %}
hstack((a,b.T))
{% endhighlight %}




    array([[1, 2, 5],
           [3, 4, 6]])



## Copy and "deep copy"

To achieve high performance, assignments in Python usually do not copy the underlaying objects. This is important for example when objects are passed between functions, to avoid an excessive amount of memory copying when it is not necessary (techincal term: pass by reference). 


{% highlight python linenos  %}
A = array([[1, 2], [3, 4]])

A
{% endhighlight %}




    array([[1, 2],
           [3, 4]])




{% highlight python linenos  %}
# now B is referring to the same array data as A 
B = A 
{% endhighlight %}


{% highlight python linenos  %}
# changing B affects A
B[0,0] = 10

B
{% endhighlight %}




    array([[10,  2],
           [ 3,  4]])




{% highlight python linenos  %}
A
{% endhighlight %}




    array([[10,  2],
           [ 3,  4]])



If we want to avoid this behavior, so that when we get a new completely independent object `B` copied from `A`, then we need to do a so-called "deep copy" using the function `copy`:


{% highlight python linenos  %}
B = copy(A)
{% endhighlight %}


{% highlight python linenos  %}
# now, if we modify B, A is not affected
B[0,0] = -5

B
{% endhighlight %}




    array([[-5,  2],
           [ 3,  4]])




{% highlight python linenos  %}
A
{% endhighlight %}




    array([[10,  2],
           [ 3,  4]])



## Iterating over array elements

Generally, we want to avoid iterating over the elements of arrays whenever we can (at all costs). The reason is that in a interpreted language like Python (or MATLAB), iterations are really slow compared to vectorized operations. 

However, sometimes iterations are unavoidable. For such cases, the Python `for` loop is the most convenient way to iterate over an array:


{% highlight python linenos  %}
v = array([1,2,3,4])

for element in v:
    print(element)
{% endhighlight %}

    1
    2
    3
    4



{% highlight python linenos  %}
M = array([[1,2], [3,4]])

for row in M:
    print("row", row)
    
    for element in row:
        print(element)
{% endhighlight %}

    ('row', array([1, 2]))
    1
    2
    ('row', array([3, 4]))
    3
    4


When we need to iterate over each element of an array and modify its elements, it is convenient to use the `enumerate` function to obtain both the element and its index in the `for` loop: 


{% highlight python linenos  %}
for row_idx, row in enumerate(M):
    print("row_idx", row_idx, "row", row)
    
    for col_idx, element in enumerate(row):
        print("col_idx", col_idx, "element", element)
       
        # update the matrix M: square each element
        M[row_idx, col_idx] = element ** 2
{% endhighlight %}

    ('row_idx', 0, 'row', array([1, 2]))
    ('col_idx', 0, 'element', 1)
    ('col_idx', 1, 'element', 2)
    ('row_idx', 1, 'row', array([3, 4]))
    ('col_idx', 0, 'element', 3)
    ('col_idx', 1, 'element', 4)



{% highlight python linenos  %}
# each element in M is now squared
M
{% endhighlight %}




    array([[ 1,  4],
           [ 9, 16]])



## Vectorizing functions

As mentioned several times by now, to get good performance we should try to avoid looping over elements in our vectors and matrices, and instead use vectorized algorithms. The first step in converting a scalar algorithm to a vectorized algorithm is to make sure that the functions we write work with vector inputs.


{% highlight python linenos  %}
def Theta(x):
    """
    Scalar implemenation of the Heaviside step function.
    """
    if x >= 0:
        return 1
    else:
        return 0
{% endhighlight %}


{% highlight python linenos  %}
Theta(array([-3,-2,-1,0,1,2,3]))
{% endhighlight %}


    ---------------------------------------------------------------------------

    ValueError                                Traceback (most recent call last)

    <ipython-input-166-6658efdd2f22> in <module>()
    ----> 1 Theta(array([-3,-2,-1,0,1,2,3]))
    

    <ipython-input-165-9a0cb13d93d4> in Theta(x)
          3     Scalar implemenation of the Heaviside step function.
          4     """
    ----> 5     if x >= 0:
          6         return 1
          7     else:


    ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()


OK, that didn't work because we didn't write the `Theta` function so that it can handle with vector input... 

To get a vectorized version of Theta we can use the Numpy function `vectorize`. In many cases it can automatically vectorize a function:


{% highlight python linenos  %}
Theta_vec = vectorize(Theta)
{% endhighlight %}


{% highlight python linenos  %}
Theta_vec(array([-3,-2,-1,0,1,2,3]))
{% endhighlight %}




    array([0, 0, 0, 1, 1, 1, 1])



We can also implement the function to accept vector input from the beginning (requires more effort but might give better performance):


{% highlight python linenos  %}
def Theta(x):
    """
    Vector-aware implemenation of the Heaviside step function.
    """
    return 1 * (x >= 0)
{% endhighlight %}


{% highlight python linenos  %}
Theta(array([-3,-2,-1,0,1,2,3]))
{% endhighlight %}




    array([0, 0, 0, 1, 1, 1, 1])




{% highlight python linenos  %}
# still works for scalars as well
Theta(-1.2), Theta(2.6)
{% endhighlight %}




    (0, 1)



## Using arrays in conditions

When using arrays in conditions in for example `if` statements and other boolean expressions, one need to use one of `any` or `all`, which requires that any or all elements in the array evalutes to `True`:


{% highlight python linenos  %}
M
{% endhighlight %}




    array([[ 1,  4],
           [ 9, 16]])




{% highlight python linenos  %}
if (M > 5).any():
    print("at least one element in M is larger than 5")
else:
    print("no element in M is larger than 5")
{% endhighlight %}

    at least one element in M is larger than 5



{% highlight python linenos  %}
if (M > 5).all():
    print("all elements in M are larger than 5")
else:
    print("all elements in M are not larger than 5")
{% endhighlight %}

    all elements in M are not larger than 5


## Type casting

Since Numpy arrays are *statically typed*, the type of an array does not change once created. But we can explicitly cast an array of some type to another using the `astype` functions (see also the similar `asarray` function). This always create a new array of new type:


{% highlight python linenos  %}
M.dtype
{% endhighlight %}




    dtype('int64')




{% highlight python linenos  %}
M2 = M.astype(float)

M2
{% endhighlight %}




    array([[  1.,   4.],
           [  9.,  16.]])




{% highlight python linenos  %}
M2.dtype
{% endhighlight %}




    dtype('float64')




{% highlight python linenos  %}
M3 = M.astype(bool)

M3
{% endhighlight %}




    array([[ True,  True],
           [ True,  True]], dtype=bool)



## Further reading

* http://numpy.scipy.org
* http://scipy.org/Tentative_NumPy_Tutorial
* http://scipy.org/NumPy_for_Matlab_Users - A Numpy guide for MATLAB users.

## Versions


{% highlight python linenos  %}
%reload_ext version_information

%version_information numpy
{% endhighlight %}




<table><tr><th>Software</th><th>Version</th></tr><tr><td>Python</td><td>2.7.8 64bit [GCC 4.4.7 20120313 (Red Hat 4.4.7-1)]</td></tr><tr><td>IPython</td><td>3.0.0</td></tr><tr><td>OS</td><td>Linux 3.13.0 45 generic x86_64 with debian jessie sid</td></tr><tr><td>numpy</td><td>1.9.1</td></tr><tr><td colspan='2'>Tue Apr 14 12:19:45 2015 CEST</td></tr></table>


