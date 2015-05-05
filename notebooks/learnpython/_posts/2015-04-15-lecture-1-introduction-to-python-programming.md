---
layout: python_note
title: "Lecture 1"
subtitle: "Python"
tags: [u'learning', u'python']
categories: [

scientific-computing,

]
date:  2015-04-15
parent: "learningPython"
img: [
python_logo.png,
]

github: https://github.com/btabibian/scientific-python-lectures/blob/master/Lecture-1-Introduction-to-Python-Programming.ipynb

---
# Introduction to Python programming

Behzad Tabibian (btabibian@tuebingen.mpg.de) [http://btabibian.github.io](http://btabibian@github.io)

J.R. Johansson (robert@riken.jp) [http://dml.riken.jp/~rob/](http://dml.riken.jp/~rob/)

The latest version of this [IPython notebook](http://ipython.org/notebook.html) lecture is available at [http://github.com/btabibian/scientific-python-lectures](http://github.com/btabibian/scientific-python-lectures).

The other notebooks in this lecture series are indexed at [http://btabibian.github.io/notebooks/learnpython/](http://btabibian.github.io/notebooks/learnpython/).

## Python program files

* Python code is usually stored in text files with the file ending "`.py`":

        myprogram.py

* Every line in a Python program file is assumed to be a Python statement, or part thereof. 

    * The only exception is comment lines, which start with the character `#` (optionally preceded by an arbitrary number of white-space characters, i.e., tabs or spaces). Comment lines are usually ignored by the Python interpreter.


* To run our Python program from the command line we use:

        $ python myprogram.py

* On UNIX systems it is common to define the path to the interpreter on the first line of the program (note that this is a comment line as far as the Python interpreter is concerned):

        #!/usr/bin/env python

  If we do, and if we additionally set the file script to be executable, we can run the program like this:

        $ myprogram.py

### Example:


{% highlight python linenos  %}
ls scripts/hello-world*.py
{% endhighlight %}

    [0m[93mscripts/hello-world-in-swedish.py[0m  [93mscripts/hello-world.py[0m



{% highlight python linenos  %}
cat scripts/hello-world.py
{% endhighlight %}

    #!/usr/bin/env python
    
    print("Hello world!")



{% highlight python linenos  %}
!python scripts/hello-world.py
{% endhighlight %}

    Hello world!


### Character encoding

The standard character encoding is ASCII, but we can use any other encoding, for example UTF-8. To specify that UTF-8 is used we include the special line

    # -*- coding: UTF-8 -*-

at the top of the file.


{% highlight python linenos  %}
cat scripts/hello-world-in-swedish.py
{% endhighlight %}

    #!/usr/bin/env python
    # -*- coding: UTF-8 -*-
    
    print("Hej världen!")



{% highlight python linenos  %}
!python scripts/hello-world-in-swedish.py
{% endhighlight %}

    Hej världen!


Other than these two *optional* lines in the beginning of a Python code file, no additional code is required for initializing a program. 

## IPython notebooks

This file - an IPython notebook -  does not follow the standard pattern with Python code in a text file. Instead, an IPython notebook is stored as a file in the [JSON](http://en.wikipedia.org/wiki/JSON) format. The advantage is that we can mix formatted text, Python code and code output. It requires the IPython notebook server to run it though, and therefore isn't a stand-alone Python program as described above. Other than that, there is no difference between the Python code that goes into a program file or an IPython notebook.

## Modules

Most of the functionality in Python is provided by *modules*. The Python Standard Library is a large collection of modules that provides *cross-platform* implementations of common facilities such as access to the operating system, file I/O, string management, network communication, and much more.

### References

 * The Python Language Reference: http://docs.python.org/2/reference/index.html
 * The Python Standard Library: http://docs.python.org/2/library/

To use a module in a Python program it first has to be imported. A module can be imported using the `import` statement. For example, to import the module `math`, which contains many standard mathematical functions, we can do:


{% highlight python linenos  %}
import math
{% endhighlight %}

This includes the whole module and makes it available for use later in the program. For example, we can do:


{% highlight python linenos  %}
import math

x = math.cos(2 * math.pi)

print(x)
{% endhighlight %}

    1.0


Alternatively, we can chose to import all symbols (functions and variables) in a module to the current namespace (so that we don't need to use the prefix "`math.`" every time we use something from the `math` module:


{% highlight python linenos  %}
from math import *

x = cos(2 * pi)

print(x)
{% endhighlight %}

    1.0


This pattern can be very convenient, but in large programs that include many modules it is often a good idea to keep the symbols from each module in their own namespaces, by using the `import math` pattern. This would elminate potentially confusing problems with name space collisions.

As a third alternative, we can chose to import only a few selected symbols from a module by explicitly listing which ones we want to import instead of using the wildcard character `*`:


{% highlight python linenos  %}
from math import cos, pi

x = cos(2 * pi)

print(x)
{% endhighlight %}

    1.0


Finally, one standard practice in the scientific community using Python is to shorten namespaces. This usually works my specifiying two characters or three characters *nicknames*.


{% highlight python linenos  %}
import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
{% endhighlight %}

> In many code examples you may find on Internet, the author is using these de facto standard nicknames.

### Looking at what a module contains, and its documentation

Once a module is imported, we can list the symbols it provides using the `dir` function:


{% highlight python linenos  %}
import math

print(dir(math))
{% endhighlight %}

    ['__doc__', '__file__', '__name__', '__package__', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'hypot', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'modf', 'pi', 'pow', 'radians', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc']


And using the function `help` we can get a description of each function (almost .. not all functions have docstrings, as they are technically called, but the vast majority of functions are documented this way). 


{% highlight python linenos  %}
help(math.log)
{% endhighlight %}

    Help on built-in function log in module math:
    
    log(...)
        log(x[, base])
        
        Return the logarithm of x to the given base.
        If the base not specified, returns the natural logarithm (base e) of x.
    



{% highlight python linenos  %}
log(10)
{% endhighlight %}




    2.302585092994046




{% highlight python linenos  %}
log(10, 2)
{% endhighlight %}




    3.3219280948873626



We can also use the `help` function directly on modules: Try

    help(math) 

Some very useful modules form the Python standard library are `os`, `sys`, `math`, `shutil`, `re`, `subprocess`, `multiprocessing`, `threading`. 

A complete lists of standard modules for Python 2 and Python 3 are available at http://docs.python.org/2/library/ and http://docs.python.org/3/library/, respectively.

## Variables and types

### Symbol names 

Variable names in Python can contain alphanumerical characters `a-z`, `A-Z`, `0-9` and some special characters such as `_`. Normal variable names must start with a letter. 

By convension, variable names start with a lower-case letter, and Class names start with a capital letter. 

In addition, there are a number of Python keywords that cannot be used as variable names. These keywords are:

    and, as, assert, break, class, continue, def, del, elif, else, except, 
    exec, finally, for, from, global, if, import, in, is, lambda, not, or,
    pass, print, raise, return, try, while, with, yield

Note: Be aware of the keyword `lambda`, which could easily be a natural variable name in a scientific program. But being a keyword, it cannot be used as a variable name.

### Assignment



The assignment operator in Python is `=`. Python is a dynamically typed language, so we do not need to specify the type of a variable when we create one.

Assigning a value to a new variable creates the variable:


{% highlight python linenos  %}
# variable assignments
x = 1.0
my_variable = 12.2
{% endhighlight %}

Although not explicitly specified, a variable do have a type associated with it. The type is derived form the value it was assigned.


{% highlight python linenos  %}
type(x)
{% endhighlight %}




    float



If we assign a new value to a variable, its type can change.


{% highlight python linenos  %}
x = 1
{% endhighlight %}


{% highlight python linenos  %}
type(x)
{% endhighlight %}




    int



If we try to use a variable that has not yet been defined we get an `NameError`:


{% highlight python linenos  %}
print(y)
{% endhighlight %}


    ---------------------------------------------------------------------------

    NameError                                 Traceback (most recent call last)

    <ipython-input-19-36b2093251cd> in <module>()
    ----> 1 print(y)
    

    NameError: name 'y' is not defined


### Fundamental types


{% highlight python linenos  %}
# integers
x = 1
type(x)
{% endhighlight %}




    int




{% highlight python linenos  %}
# float
x = 1.0
type(x)
{% endhighlight %}




    float




{% highlight python linenos  %}
# boolean
b1 = True
b2 = False

type(b1)
{% endhighlight %}




    bool




{% highlight python linenos  %}
# complex numbers: note the use of `j` to specify the imaginary part
x = 1.0 - 1.0j
type(x)
{% endhighlight %}




    complex




{% highlight python linenos  %}
print(x)
{% endhighlight %}

    (1-1j)



{% highlight python linenos  %}
print(x.real, x.imag)
{% endhighlight %}

    (1.0, -1.0)


### Type utility functions


The module `types` contains a number of type name definitions that can be used to test if variables are of certain types:


{% highlight python linenos  %}
import types

# print all types defined in the `types` module
print(dir(types))
{% endhighlight %}

    ['BooleanType', 'BufferType', 'BuiltinFunctionType', 'BuiltinMethodType', 'ClassType', 'CodeType', 'ComplexType', 'DictProxyType', 'DictType', 'DictionaryType', 'EllipsisType', 'FileType', 'FloatType', 'FrameType', 'FunctionType', 'GeneratorType', 'GetSetDescriptorType', 'InstanceType', 'IntType', 'LambdaType', 'ListType', 'LongType', 'MemberDescriptorType', 'MethodType', 'ModuleType', 'NoneType', 'NotImplementedType', 'ObjectType', 'SliceType', 'StringType', 'StringTypes', 'TracebackType', 'TupleType', 'TypeType', 'UnboundMethodType', 'UnicodeType', 'XRangeType', '__builtins__', '__doc__', '__file__', '__name__', '__package__']



{% highlight python linenos  %}
x = 1.0

# check if the variable x is a float
type(x) is float
{% endhighlight %}




    True




{% highlight python linenos  %}
# check if the variable x is an int
type(x) is int
{% endhighlight %}




    False



We can also use the `isinstance` method for testing types of variables:


{% highlight python linenos  %}
isinstance(x, float)
{% endhighlight %}




    True



### Type casting


{% highlight python linenos  %}
x = 1.5

print(x, type(x))
{% endhighlight %}

    (1.5, <type 'float'>)



{% highlight python linenos  %}
x = int(x)

print(x, type(x))
{% endhighlight %}

    (1, <type 'int'>)



{% highlight python linenos  %}
z = complex(x)

print(z, type(z))
{% endhighlight %}

    ((1+0j), <type 'complex'>)



{% highlight python linenos  %}
x = float(z)
{% endhighlight %}


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    <ipython-input-33-e719cc7b3e96> in <module>()
    ----> 1 x = float(z)
    

    TypeError: can't convert complex to float


Complex variables cannot be cast to floats or integers. We need to use `z.real` or `z.imag` to extract the part of the complex number we want:


{% highlight python linenos  %}
y = bool(z.real)

print(z.real, " -> ", y, type(y))

y = bool(z.imag)

print(z.imag, " -> ", y, type(y))
{% endhighlight %}

    (1.0, ' -> ', True, <type 'bool'>)
    (0.0, ' -> ', False, <type 'bool'>)


## Operators and comparisons

Most operators and comparisons in Python work as one would expect:

* Arithmetic operators `+`, `-`, `*`, `/`, `//` (integer division), '**' power



{% highlight python linenos  %}
1 + 2, 1 - 2, 1 * 2, 1 / 2
{% endhighlight %}




    (3, -1, 2, 0)




{% highlight python linenos  %}
1.0 + 2.0, 1.0 - 2.0, 1.0 * 2.0, 1.0 / 2.0
{% endhighlight %}




    (3.0, -1.0, 2.0, 0.5)




{% highlight python linenos  %}
# Integer division of float numbers
3.0 // 2.0
{% endhighlight %}




    1.0




{% highlight python linenos  %}
# Note! The power operators in python isn't ^, but **
2 ** 2
{% endhighlight %}




    4



* The boolean operators are spelled out as words `and`, `not`, `or`. 


{% highlight python linenos  %}
True and False
{% endhighlight %}




    False




{% highlight python linenos  %}
not False
{% endhighlight %}




    True




{% highlight python linenos  %}
True or False
{% endhighlight %}




    True



* Comparison operators `>`, `<`, `>=` (greater or equal), `<=` (less or equal), `==` equality, `is` identical.


{% highlight python linenos  %}
2 > 1, 2 < 1
{% endhighlight %}




    (True, False)




{% highlight python linenos  %}
2 > 2, 2 < 2
{% endhighlight %}




    (False, False)




{% highlight python linenos  %}
2 >= 2, 2 <= 2
{% endhighlight %}




    (True, True)




{% highlight python linenos  %}
# equality
[1,2] == [1,2]
{% endhighlight %}




    True




{% highlight python linenos  %}
# objects identical?
l1 = l2 = [1,2]

l1 is l2
{% endhighlight %}




    True



## Compound types: Strings, List and dictionaries

### Strings

Strings are the variable type that is used for storing text messages. 


{% highlight python linenos  %}
s = "Hello world"
type(s)
{% endhighlight %}




    str




{% highlight python linenos  %}
# length of the string: the number of characters
len(s)
{% endhighlight %}




    11




{% highlight python linenos  %}
# replace a substring in a string with somethign else
s2 = s.replace("world", "test")
print(s2)
{% endhighlight %}

    Hello test


We can index a character in a string using `[]`:


{% highlight python linenos  %}
s[0]
{% endhighlight %}




    'H'



> **Heads up MATLAB users:** Indexing start at 0!

We can extract a part of a string using the syntax `[start:stop]`, which extracts characters between index `start` and `stop`:


{% highlight python linenos  %}
s[0:5]
{% endhighlight %}




    'Hello'



If we omit either (or both) of `start` or `stop` from `[start:stop]`, the default is the beginning and the end of the string, respectively:


{% highlight python linenos  %}
s[:5]
{% endhighlight %}




    'Hello'




{% highlight python linenos  %}
s[6:]
{% endhighlight %}




    'world'




{% highlight python linenos  %}
s[:]
{% endhighlight %}




    'Hello world'



We can also define the step size using the syntax `[start:end:step]` (the default value for `step` is 1, as we saw above):


{% highlight python linenos  %}
s[::1]
{% endhighlight %}




    'Hello world'




{% highlight python linenos  %}
s[::2]
{% endhighlight %}




    'Hlowrd'



This technique is called *slicing*. Read more about the syntax here: http://docs.python.org/release/2.7.3/library/functions.html?highlight=slice#slice

Python has a very rich set of functions for text processing. See for example http://docs.python.org/2/library/string.html for more information.

#### String formatting examples


{% highlight python linenos  %}
print("str1", "str2", "str3")  # The print statement concatenates strings with a space
{% endhighlight %}

    ('str1', 'str2', 'str3')



{% highlight python linenos  %}
print("str1", 1.0, False, -1j)  # The print statements converts all arguments to strings
{% endhighlight %}

    ('str1', 1.0, False, -1j)



{% highlight python linenos  %}
print("str1" + "str2" + "str3") # strings added with + are concatenated without space
{% endhighlight %}

    str1str2str3



{% highlight python linenos  %}
print("value = %f" % 1.0)       # we can use C-style string formatting
{% endhighlight %}

    value = 1.000000



{% highlight python linenos  %}
# this formatting creates a string
s2 = "value1 = %.2f. value2 = %d" % (3.1415, 1.5)

print(s2)
{% endhighlight %}

    value1 = 3.14. value2 = 1



{% highlight python linenos  %}
# alternative, more intuitive way of formatting a string 
s3 = 'value1 = {0}, value2 = {1}'.format(3.1415, 1.5)

print(s3)
{% endhighlight %}

    value1 = 3.1415, value2 = 1.5


### List

Lists are very similar to strings, except that each element can be of any type.

The syntax for creating lists in Python is `[...]`:


{% highlight python linenos  %}
l = [1,2,3,4]

print(type(l))
print(l)
{% endhighlight %}

    <type 'list'>
    [1, 2, 3, 4]


We can use the same slicing techniques to manipulate lists as we could use on strings:


{% highlight python linenos  %}
print(l)

print(l[1:3])

print(l[::2])
{% endhighlight %}

    [1, 2, 3, 4]
    [2, 3]
    [1, 3]


**Heads up MATLAB users:** Indexing starts at 0!


{% highlight python linenos  %}
l[0]
{% endhighlight %}




    1



Elements in a list do not all have to be of the same type:


{% highlight python linenos  %}
l = [1, 'a', 1.0, 1-1j]

print(l)
{% endhighlight %}

    [1, 'a', 1.0, (1-1j)]


Python lists can be inhomogeneous and arbitrarily nested:


{% highlight python linenos  %}
nested_list = [1, [2, [3, [4, [5]]]]]

nested_list
{% endhighlight %}




    [1, [2, [3, [4, [5]]]]]



Lists play a very important role in Python, and are for example used in loops and other flow control structures (discussed below). There are number of convenient functions for generating lists of various types, for example the `range` function:


{% highlight python linenos  %}
start = 10
stop = 30
step = 2

range(start, stop, step)
{% endhighlight %}




    [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]




{% highlight python linenos  %}
# in python 3 range generates an interator, which can be converted to a list using 'list(...)'.
# It has no effect in python 2
list(range(start, stop, step))
{% endhighlight %}




    [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]




{% highlight python linenos  %}
list(range(-10, 10))
{% endhighlight %}




    [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]




{% highlight python linenos  %}
s
{% endhighlight %}




    'Hello world'




{% highlight python linenos  %}
# convert a string to a list by type casting:
s2 = list(s)

s2
{% endhighlight %}




    ['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']




{% highlight python linenos  %}
# sorting lists
s2.sort()

print(s2)
{% endhighlight %}

    [' ', 'H', 'd', 'e', 'l', 'l', 'l', 'o', 'o', 'r', 'w']


#### Adding, inserting, modifying, and removing elements from lists


{% highlight python linenos  %}
# create a new empty list
l = []

# add an elements using `append`
l.append("A")
l.append("d")
l.append("d")

print(l)
{% endhighlight %}

    ['A', 'd', 'd']


We can modify lists by assigning new values to elements in the list. In technical jargon, lists are *mutable*.


{% highlight python linenos  %}
l[1] = "p"
l[2] = "p"

print(l)
{% endhighlight %}

    ['A', 'p', 'p']



{% highlight python linenos  %}
l[1:3] = ["d", "d"]

print(l)
{% endhighlight %}

    ['A', 'd', 'd']


Insert an element at an specific index using `insert`


{% highlight python linenos  %}
l.insert(0, "i")
l.insert(1, "n")
l.insert(2, "s")
l.insert(3, "e")
l.insert(4, "r")
l.insert(5, "t")

print(l)
{% endhighlight %}

    ['i', 'n', 's', 'e', 'r', 't', 'A', 'd', 'd']


Remove first element with specific value using 'remove'


{% highlight python linenos  %}
l.remove("A")

print(l)
{% endhighlight %}

    ['i', 'n', 's', 'e', 'r', 't', 'd', 'd']


Remove an element at a specific location using `del`:


{% highlight python linenos  %}
del l[7]
del l[6]

print(l)
{% endhighlight %}

    ['i', 'n', 's', 'e', 'r', 't']


See `help(list)` for more details, or read the online documentation 

### Tuples

Tuples are like lists, except that they cannot be modified once created, that is they are *immutable*. 

In Python, tuples are created using the syntax `(..., ..., ...)`, or even `..., ...`:


{% highlight python linenos  %}
point = (10, 20)

print(point, type(point))
{% endhighlight %}

    ((10, 20), <type 'tuple'>)



{% highlight python linenos  %}
point = 10, 20

print(point, type(point))
{% endhighlight %}

    ((10, 20), <type 'tuple'>)


We can unpack a tuple by assigning it to a comma-separated list of variables:


{% highlight python linenos  %}
x, y = point

print("x =", x)
print("y =", y)
{% endhighlight %}

    ('x =', 10)
    ('y =', 20)


If we try to assign a new value to an element in a tuple we get an error:


{% highlight python linenos  %}
point[0] = 20
{% endhighlight %}


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    <ipython-input-83-ac1c641a5dca> in <module>()
    ----> 1 point[0] = 20
    

    TypeError: 'tuple' object does not support item assignment


### Dictionaries

Dictionaries are also like lists, except that each element is a key-value pair. The syntax for dictionaries is `{key1 : value1, ...}`:


{% highlight python linenos  %}
params = {"parameter1" : 1.0,
          "parameter2" : 2.0,
          "parameter3" : 3.0,}

print(type(params))
print(params)
{% endhighlight %}

    <type 'dict'>
    {'parameter1': 1.0, 'parameter3': 3.0, 'parameter2': 2.0}



{% highlight python linenos  %}
print("parameter1 = " + str(params["parameter1"]))
print("parameter2 = " + str(params["parameter2"]))
print("parameter3 = " + str(params["parameter3"]))
{% endhighlight %}

    parameter1 = 1.0
    parameter2 = 2.0
    parameter3 = 3.0



{% highlight python linenos  %}
params["parameter1"] = "A"
params["parameter2"] = "B"

# add a new entry
params["parameter4"] = "D"

print("parameter1 = " + str(params["parameter1"]))
print("parameter2 = " + str(params["parameter2"]))
print("parameter3 = " + str(params["parameter3"]))
print("parameter4 = " + str(params["parameter4"]))
{% endhighlight %}

    parameter1 = A
    parameter2 = B
    parameter3 = 3.0
    parameter4 = D


## Control Flow

### Conditional statements: if, elif, else

The Python syntax for conditional execution of code use the keywords `if`, `elif` (else if), `else`:


{% highlight python linenos  %}
statement1 = False
statement2 = False

if statement1:
    print("statement1 is True")
    
elif statement2:
    print("statement2 is True")
    
else:
    print("statement1 and statement2 are False")
{% endhighlight %}

    statement1 and statement2 are False


For the first time, here we encounted a peculiar and unusual aspect of the Python programming language: Program blocks are defined by their indentation level. 

Compare to the equivalent C code:

    if (statement1)
    {
        printf("statement1 is True\n");
    }
    else if (statement2)
    {
        printf("statement2 is True\n");
    }
    else
    {
        printf("statement1 and statement2 are False\n");
    }

In C blocks are defined by the enclosing curly brakets `{` and `}`. And the level of indentation (white space before the code statements) does not matter (completely optional). 

But in Python, the extent of a code block is defined by the indentation level (usually a tab or say four white spaces). This means that we have to be careful to indent our code correctly, or else we will get syntax errors. 

#### Examples:


{% highlight python linenos  %}
statement1 = statement2 = True

if statement1:
    if statement2:
        print("both statement1 and statement2 are True")
{% endhighlight %}

    both statement1 and statement2 are True



{% highlight python linenos  %}
# Bad indentation!
if statement1:
    if statement2:
    print("both statement1 and statement2 are True")  # this line is not properly indented
{% endhighlight %}


      File "<ipython-input-90-78979cdecf37>", line 4
        print("both statement1 and statement2 are True")  # this line is not properly indented
            ^
    IndentationError: expected an indented block




{% highlight python linenos  %}
statement1 = False 

if statement1:
    print("printed if statement1 is True")
    
    print("still inside the if block")
{% endhighlight %}


{% highlight python linenos  %}
if statement1:
    print("printed if statement1 is True")
    
print("now outside the if block")
{% endhighlight %}

    now outside the if block


## Loops

In Python, loops can be programmed in a number of different ways. The most common is the `for` loop, which is used together with iterable objects, such as lists. The basic syntax is:

### **`for` loops**:


{% highlight python linenos  %}
for x in [1,2,3]:
    print(x)
{% endhighlight %}

    1
    2
    3


The `for` loop iterates over the elements of the supplied list, and executes the containing block once for each element. Any kind of list can be used in the `for` loop. For example:


{% highlight python linenos  %}
for x in range(4): # by default range start at 0
    print(x)
{% endhighlight %}

    0
    1
    2
    3


Note: `range(4)` does not include 4 !


{% highlight python linenos  %}
for x in range(-3,3):
    print(x)
{% endhighlight %}

    -3
    -2
    -1
    0
    1
    2



{% highlight python linenos  %}
for word in ["scientific", "computing", "with", "python"]:
    print(word)
{% endhighlight %}

    scientific
    computing
    with
    python


To iterate over key-value pairs of a dictionary:


{% highlight python linenos  %}
for key, value in params.items():
    print(key + " = " + str(value))
{% endhighlight %}

    parameter4 = D
    parameter1 = A
    parameter3 = 3.0
    parameter2 = B


Sometimes it is useful to have access to the indices of the values when iterating over a list. We can use the `enumerate` function for this:


{% highlight python linenos  %}
for idx, x in enumerate(range(-3,3)):
    print(idx, x)
{% endhighlight %}

    (0, -3)
    (1, -2)
    (2, -1)
    (3, 0)
    (4, 1)
    (5, 2)


### List comprehensions: Creating lists using `for` loops:

A convenient and compact way to initialize lists:


{% highlight python linenos  %}
l1 = [x**2 for x in range(0,5)]

print(l1)
{% endhighlight %}

    [0, 1, 4, 9, 16]


### `while` loops:


{% highlight python linenos  %}
i = 0

while i < 5:
    print(i)
    
    i = i + 1
    
print("done")
{% endhighlight %}

    0
    1
    2
    3
    4
    done


Note that the `print("done")` statement is not part of the `while` loop body because of the difference in indentation.

## Functions

A function in Python is defined using the keyword `def`, followed by a function name, a signature within parentheses `()`, and a colon `:`. The following code, with one additional level of indentation, is the function body.


{% highlight python linenos  %}
def func0():   
    print("test")
{% endhighlight %}


{% highlight python linenos  %}
func0()
{% endhighlight %}

    test


Optionally, but highly recommended, we can define a so called "docstring", which is a description of the functions purpose and behaivor. The docstring should follow directly after the function definition, before the code in the function body.


{% highlight python linenos  %}
def func1(s):
    """
    Print a string 's' and tell how many characters it has    
    """
    
    print(s + " has " + str(len(s)) + " characters")
{% endhighlight %}


{% highlight python linenos  %}
help(func1)
{% endhighlight %}

    Help on function func1 in module __main__:
    
    func1(s)
        Print a string 's' and tell how many characters it has
    



{% highlight python linenos  %}
func1("test")
{% endhighlight %}

    test has 4 characters


Functions that returns a value use the `return` keyword:


{% highlight python linenos  %}
def square(x):
    """
    Return the square of x.
    """
    return x ** 2
{% endhighlight %}


{% highlight python linenos  %}
square(4)
{% endhighlight %}




    16



We can return multiple values from a function using tuples (see above):


{% highlight python linenos  %}
def powers(x):
    """
    Return a few powers of x.
    """
    return x ** 2, x ** 3, x ** 4
{% endhighlight %}


{% highlight python linenos  %}
powers(3)
{% endhighlight %}




    (9, 27, 81)




{% highlight python linenos  %}
x2, x3, x4 = powers(3)

print(x3)
{% endhighlight %}

    27


### Default argument and keyword arguments

In a definition of a function, we can give default values to the arguments the function takes:


{% highlight python linenos  %}
def myfunc(x, p=2, debug=False):
    if debug:
        print("evaluating myfunc for x = " + str(x) + " using exponent p = " + str(p))
    return x**p
{% endhighlight %}

If we don't provide a value of the `debug` argument when calling the the function `myfunc` it defaults to the value provided in the function definition:


{% highlight python linenos  %}
myfunc(5)
{% endhighlight %}




    25




{% highlight python linenos  %}
myfunc(5, debug=True)
{% endhighlight %}

    evaluating myfunc for x = 5 using exponent p = 2





    25



If we explicitly list the name of the arguments in the function calls, they do not need to come in the same order as in the function definition. This is called *keyword* arguments, and is often very useful in functions that takes a lot of optional arguments.


{% highlight python linenos  %}
myfunc(p=3, debug=True, x=7)
{% endhighlight %}

    evaluating myfunc for x = 7 using exponent p = 3





    343



### Unnamed functions (lambda function)

In Python we can also create unnamed functions, using the `lambda` keyword:


{% highlight python linenos  %}
f1 = lambda x: x**2
    
# is equivalent to 

def f2(x):
    return x**2
{% endhighlight %}


{% highlight python linenos  %}
f1(2), f2(2)
{% endhighlight %}




    (4, 4)



This technique is useful for example when we want to pass a simple function as an argument to another function, like this:


{% highlight python linenos  %}
# map is a built-in python function
map(lambda x: x**2, range(-3,4))
{% endhighlight %}




    [9, 4, 1, 0, 1, 4, 9]




{% highlight python linenos  %}
# in python 3 we can use `list(...)` to convert the iterator to an explicit list
list(map(lambda x: x**2, range(-3,4)))
{% endhighlight %}




    [9, 4, 1, 0, 1, 4, 9]



## Classes

Classes are the key features of object-oriented programming. A class is a structure for representing an object and the operations that can be performed on the object. 

In Python a class can contain *attributes* (variables) and *methods* (functions).

A class is defined almost like a function, but using the `class` keyword, and the class definition usually contains a number of class method definitions (a function in a class).

* Each class method should have an argument `self` as it first argument. This object is a self-reference.

* Some class method names have special meaning, for example:

    * `__init__`: The name of the method that is invoked when the object is first created.
    * `__str__` : A method that is invoked when a simple string representation of the class is needed, as for example when printed.
    * There are many more, see http://docs.python.org/2/reference/datamodel.html#special-method-names


{% highlight python linenos  %}
class Point:
    """
    Simple class for representing a point in a Cartesian coordinate system.
    """
    
    def __init__(self, x, y):
        """
        Create a new Point at x, y.
        """
        self.x = x
        self.y = y
        
    def translate(self, dx, dy):
        """
        Translate the point by dx and dy in the x and y direction.
        """
        self.x += dx
        self.y += dy
        
    def __str__(self):
        return("Point at [%f, %f]" % (self.x, self.y))
{% endhighlight %}

To create a new instance of a class:


{% highlight python linenos  %}
p1 = Point(0, 0) # this will invoke the __init__ method in the Point class

print(p1)         # this will invoke the __str__ method
{% endhighlight %}

    Point at [0.000000, 0.000000]


To invoke a class method in the class instance `p`:


{% highlight python linenos  %}
p2 = Point(1, 1)

p1.translate(0.25, 1.5)

print(p1)
print(p2)
{% endhighlight %}

    Point at [0.250000, 1.500000]
    Point at [1.000000, 1.000000]


Note that calling class methods can modifiy the state of that particular class instance, but does not effect other class instances or any global variables.

That is one of the nice things about object-oriented design: code such as functions and related variables are grouped in separate and independent entities. 

## Modules

One of the most important concepts in good programming is to reuse code and avoid repetitions.

The idea is to write functions and classes with a well-defined purpose and scope, and reuse these instead of repeating similar code in different part of a program (modular programming). The result is usually that readability and maintainability of a program is greatly improved. What this means in practice is that our programs have fewer bugs, are easier to extend and debug/troubleshoot. 

Python supports modular programming at different levels. Functions and classes are examples of tools for low-level modular programming. Python modules are a higher-level modular programming construct, where we can collect related variables, functions and classes in a module. A python module is defined in a python file (with file-ending `.py`), and it can be made accessible to other Python modules and programs using the `import` statement. 

Consider the following example: the file `mymodule.py` contains simple example implementations of a variable, function and a class:


{% highlight python linenos  %}
%%file mymodule.py
"""
Example of a python module. Contains a variable called my_variable,
a function called my_function, and a class called MyClass.
"""

my_variable = 0

def my_function():
    """
    Example function
    """
    return my_variable
    
class MyClass:
    """
    Example class.
    """

    def __init__(self):
        self.variable = my_variable
        
    def set_variable(self, new_value):
        """
        Set self.variable to a new value
        """
        self.variable = new_value
        
    def get_variable(self):
        return self.variable
{% endhighlight %}

    Writing mymodule.py


We can import the module `mymodule` into our Python program using `import`:


{% highlight python linenos  %}
import mymodule
{% endhighlight %}

Use `help(module)` to get a summary of what the module provides:


{% highlight python linenos  %}
help(mymodule)
{% endhighlight %}

    Help on module mymodule:
    
    NAME
        mymodule
    
    FILE
        /is/ei/btabibian/Documents/scientific-python-lectures/mymodule.py
    
    DESCRIPTION
        Example of a python module. Contains a variable called my_variable,
        a function called my_function, and a class called MyClass.
    
    CLASSES
        MyClass
        
        class MyClass
         |  Example class.
         |  
         |  Methods defined here:
         |  
         |  __init__(self)
         |  
         |  get_variable(self)
         |  
         |  set_variable(self, new_value)
         |      Set self.variable to a new value
    
    FUNCTIONS
        my_function()
            Example function
    
    DATA
        my_variable = 0
    
    



{% highlight python linenos  %}
mymodule.my_variable
{% endhighlight %}




    0




{% highlight python linenos  %}
mymodule.my_function() 
{% endhighlight %}




    0




{% highlight python linenos  %}
my_class = mymodule.MyClass() 
my_class.set_variable(10)
my_class.get_variable()
{% endhighlight %}




    10



If we make changes to the code in `mymodule.py`, we need to reload it using `reload`:


{% highlight python linenos  %}
reload(mymodule)  # works only in python 2
{% endhighlight %}




    <module 'mymodule' from 'mymodule.pyc'>



## Exceptions

In Python errors are managed with a special language construct called "Exceptions". When errors occur exceptions can be raised, which interrupts the normal program flow and fallback to somewhere else in the code where the closest try-except statement is defined.

To generate an exception we can use the `raise` statement, which takes an argument that must be an instance of the class `BaseException` or a class derived from it. 


{% highlight python linenos  %}
raise Exception("description of the error")
{% endhighlight %}


    ---------------------------------------------------------------------------

    Exception                                 Traceback (most recent call last)

    <ipython-input-129-8f47ba831d5a> in <module>()
    ----> 1 raise Exception("description of the error")
    

    Exception: description of the error


A typical use of exceptions is to abort functions when some error condition occurs, for example:

    def my_function(arguments):
    
        if not verify(arguments):
            raise Exception("Invalid arguments")
        
        # rest of the code goes here

To gracefully catch errors that are generated by functions and class methods, or by the Python interpreter itself, use the `try` and  `except` statements:

    try:
        # normal code goes here
    except:
        # code for error handling goes here
        # this code is not executed unless the code
        # above generated an error

For example:


{% highlight python linenos  %}
try:
    print("test")
    # generate an error: the variable test is not defined
    print(test)
except:
    print("Caught an exception")
{% endhighlight %}

    test
    Caught an exception


To get information about the error, we can access the `Exception` class instance that describes the exception by using for example:

    except Exception as e:


{% highlight python linenos  %}
try:
    print("test")
    # generate an error: the variable test is not defined
    print(test)
except Exception as e:
    print("Caught an exception:" + str(e))
{% endhighlight %}

    test
    Caught an exception:name 'test' is not defined


## Further reading

* http://www.python.org - The official web page of the Python programming language.
* http://www.python.org/dev/peps/pep-0008 - Style guide for Python programming. Highly recommended. 
* http://www.greenteapress.com/thinkpython/ - A free book on Python programming.
* [Python Essential Reference](http://www.amazon.com/Python-Essential-Reference-4th-Edition/dp/0672329786) - A good reference book on Python programming.

## Versions


{% highlight python linenos  %}
%load_ext version_information

%version_information
{% endhighlight %}




<table><tr><th>Software</th><th>Version</th></tr><tr><td>Python</td><td>2.7.8 64bit [GCC 4.4.7 20120313 (Red Hat 4.4.7-1)]</td></tr><tr><td>IPython</td><td>3.0.0</td></tr><tr><td>OS</td><td>Linux 3.13.0 45 generic x86_64 with debian jessie sid</td></tr><tr><td colspan='2'>Mon Apr 13 12:00:31 2015 CEST</td></tr></table>


