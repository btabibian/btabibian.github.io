---
layout: python_note
title: "Lecture 5"
subtitle: "Sympy"
tags: [u'learning', u'python']
categories: [

scientific-computing,

]
date:  2015-04-15
parent: "learningPython"
img: [
Sympy.png,
]

github: https://github.com/btabibian/scientific-python-lectures/blob/master/Lecture-5-Sympy.ipynb

---
# Sympy - Symbolic algebra in Python

J.R. Johansson (robert@riken.jp) http://dml.riken.jp/~rob/

The latest version of this [IPython notebook](http://ipython.org/notebook.html) lecture is available at [http://github.com/jrjohansson/scientific-python-lectures](http://github.com/jrjohansson/scientific-python-lectures).

The other notebooks in this lecture series are indexed at [http://jrjohansson.github.com](http://jrjohansson.github.com).


{% highlight python linenos  %}
%pylab inline
{% endhighlight %}

    
    Welcome to pylab, a matplotlib-based Python environment [backend: module://IPython.kernel.zmq.pylab.backend_inline].
    For more information, type 'help(pylab)'.


## Introduction

There are two notable Computer Algebra Systems (CAS) for Python:

* [SymPy](http://sympy.org/en/index.html) - A python module that can be used in any Python program, or in an IPython session, that provides powerful CAS features. 
* [Sage](http://www.sagemath.org/) - Sage is a full-featured and very powerful CAS enviroment that aims to provide an open source system that competes with Mathematica and Maple. Sage is not a regular Python module, but rather a CAS environment that uses Python as its programming language.

Sage is in some aspects more powerful than SymPy, but both offer very comprehensive CAS functionality. The advantage of SymPy is that it is a regular Python module and integrates well with the IPython notebook. 

In this lecture we will therefore look at how to use SymPy with IPython notebooks. If you are interested in an open source CAS environment I also recommend to read more about Sage.

To get started using SymPy in a Python program or notebook, import the module `sympy`:


{% highlight python linenos  %}
from sympy import *
{% endhighlight %}

To get nice-looking $\LaTeX$ formatted output run:


{% highlight python linenos  %}
init_printing()

# or with older versions of sympy/ipython, load the IPython extension
#%load_ext sympy.interactive.ipythonprinting
# or
#%load_ext sympyprinting
{% endhighlight %}

## Symbolic variables

In SymPy we need to create symbols for the variables we want to work with. We can create a new symbol using the `Symbol` class:


{% highlight python linenos  %}
x = Symbol('x')
{% endhighlight %}


{% highlight python linenos  %}
(pi + x)**2
{% endhighlight %}




$$\left(x + \pi\right)^{2}$$




{% highlight python linenos  %}
# alternative way of defining symbols
a, b, c = symbols("a, b, c")
{% endhighlight %}


{% highlight python linenos  %}
type(a)
{% endhighlight %}




    sympy.core.symbol.Symbol



We can add assumptions to symbols when we create them:


{% highlight python linenos  %}
x = Symbol('x', real=True)
{% endhighlight %}


{% highlight python linenos  %}
x.is_imaginary
{% endhighlight %}




$$False$$




{% highlight python linenos  %}
x = Symbol('x', positive=True)
{% endhighlight %}


{% highlight python linenos  %}
x > 0
{% endhighlight %}




$$True$$



### Complex numbers

The imaginary unit is denoted `I` in Sympy. 


{% highlight python linenos  %}
1+1*I
{% endhighlight %}




$$1 + i$$




{% highlight python linenos  %}
I**2
{% endhighlight %}




$$-1$$




{% highlight python linenos  %}
(x * I + 1)**2
{% endhighlight %}




$$\left(i x + 1\right)^{2}$$



### Rational numbers

There are three different numerical types in SymPy: `Real`, `Rational`, `Integer`: 


{% highlight python linenos  %}
r1 = Rational(4,5)
r2 = Rational(5,4)
{% endhighlight %}


{% highlight python linenos  %}
r1
{% endhighlight %}




$$\frac{4}{5}$$




{% highlight python linenos  %}
r1+r2
{% endhighlight %}




$$\frac{41}{20}$$




{% highlight python linenos  %}
r1/r2
{% endhighlight %}




$$\frac{16}{25}$$



## Numerical evaluation

SymPy uses a library for artitrary precision as numerical backend, and has predefined SymPy expressions for a number of mathematical constants, such as: `pi`, `e`, `oo` for infinity.

To evaluate an expression numerically we can use the `evalf` function (or `N`). It takes an argument `n` which specifies the number of significant digits.


{% highlight python linenos  %}
pi.evalf(n=50)
{% endhighlight %}




$$3.1415926535897932384626433832795028841971693993751$$




{% highlight python linenos  %}
y = (x + pi)**2
{% endhighlight %}


{% highlight python linenos  %}
N(y, 5) # same as evalf
{% endhighlight %}




$$\left(x + 3.1416\right)^{2}$$



When we numerically evaluate algebraic expressions we often want to substitute a symbol with a numerical value. In SymPy we do that using the `subs` function:


{% highlight python linenos  %}
y.subs(x, 1.5)
{% endhighlight %}




$$\left(1.5 + \pi\right)^{2}$$




{% highlight python linenos  %}
N(y.subs(x, 1.5))
{% endhighlight %}




$$21.5443823618587$$



The `subs` function can of course also be used to substitute Symbols and expressions:


{% highlight python linenos  %}
y.subs(x, a+pi)
{% endhighlight %}




$$\left(a + 2 \pi\right)^{2}$$



We can also combine numerical evolution of expressions with NumPy arrays:


{% highlight python linenos  %}
import numpy
{% endhighlight %}


{% highlight python linenos  %}
x_vec = numpy.arange(0, 10, 0.1)
{% endhighlight %}


{% highlight python linenos  %}
y_vec = numpy.array([N(((x + pi)**2).subs(x, xx)) for xx in x_vec])
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = subplots()
ax.plot(x_vec, y_vec);
{% endhighlight %}


![png]({{site.baseurl}}//notebooks/learnpython//images/2015-04-15-lecture-5-sympy_files/2015-04-15-lecture-5-sympy_44_0.png)


However, this kind of numerical evolution can be very slow, and there is a much more efficient way to do it: Use the function `lambdify` to "compile" a Sympy expression into a function that is much more efficient to evaluate numerically:


{% highlight python linenos  %}
f = lambdify([x], (x + pi)**2, 'numpy')  # the first argument is a list of variables that
                                         # f will be a function of: in this case only x -> f(x)
{% endhighlight %}


{% highlight python linenos  %}
y_vec = f(x_vec)  # now we can directly pass a numpy array and f(x) is efficiently evaluated
{% endhighlight %}

The speedup when using "lambdified" functions instead of direct numerical evaluation can be significant, often several orders of magnitude. Even in this simple example we get a significant speed up:


{% highlight python linenos  %}
%%timeit

y_vec = numpy.array([N(((x + pi)**2).subs(x, xx)) for xx in x_vec])
{% endhighlight %}

    10 loops, best of 3: 20.4 ms per loop



{% highlight python linenos  %}
%%timeit

y_vec = f(x_vec)
{% endhighlight %}

    100000 loops, best of 3: 3.67 µs per loop


## Algebraic manipulations

One of the main uses of an CAS is to perform algebraic manipulations of expressions. For example, we might want to expand a product, factor an expression, or simply an expression. The functions for doing these basic operations in SymPy are demonstrated in this section.

### Expand and factor

The first steps in an algebraic manipulation 


{% highlight python linenos  %}
(x+1)*(x+2)*(x+3)
{% endhighlight %}




$$\left(x + 1\right) \left(x + 2\right) \left(x + 3\right)$$




{% highlight python linenos  %}
expand((x+1)*(x+2)*(x+3))
{% endhighlight %}




$$x^{3} + 6 x^{2} + 11 x + 6$$



The `expand` function takes a number of keywords arguments which we can tell the functions what kind of expansions we want to have performed. For example, to expand trigonometric expressions, use the `trig=True` keyword argument:


{% highlight python linenos  %}
sin(a+b)
{% endhighlight %}




$$\sin{\left (a + b \right )}$$




{% highlight python linenos  %}
expand(sin(a+b), trig=True)
{% endhighlight %}




$$\sin{\left (a \right )} \cos{\left (b \right )} + \sin{\left (b \right )} \cos{\left (a \right )}$$



See `help(expand)` for a detailed explanation of the various types of expansions the `expand` functions can perform.

The opposite a product expansion is of course factoring. The factor an expression in SymPy use the `factor` function: 


{% highlight python linenos  %}
factor(x**3 + 6 * x**2 + 11*x + 6)
{% endhighlight %}




$$\left(x + 1\right) \left(x + 2\right) \left(x + 3\right)$$



### Simplify

The `simplify` tries to simplify an expression into a nice looking expression, using various techniques. More specific alternatives to the `simplify` functions also exists: `trigsimp`, `powsimp`, `logcombine`, etc. 

The basic usages of these functions are as follows:


{% highlight python linenos  %}
# simplify expands a product
simplify((x+1)*(x+2)*(x+3))
{% endhighlight %}




$$\left(x + 1\right) \left(x + 2\right) \left(x + 3\right)$$




{% highlight python linenos  %}
# simplify uses trigonometric identities
simplify(sin(a)**2 + cos(a)**2)
{% endhighlight %}




$$1$$




{% highlight python linenos  %}
simplify(cos(x)/sin(x))
{% endhighlight %}




$$\frac{1}{\tan{\left (x \right )}}$$



### apart and together

To manipulate symbolic expressions of fractions, we can use the `apart` and `together` functions:


{% highlight python linenos  %}
f1 = 1/((a+1)*(a+2))
{% endhighlight %}


{% highlight python linenos  %}
f1
{% endhighlight %}




$$\frac{1}{\left(a + 1\right) \left(a + 2\right)}$$




{% highlight python linenos  %}
apart(f1)
{% endhighlight %}




$$- \frac{1}{a + 2} + \frac{1}{a + 1}$$




{% highlight python linenos  %}
f2 = 1/(a+2) + 1/(a+3)
{% endhighlight %}


{% highlight python linenos  %}
f2
{% endhighlight %}




$$\frac{1}{a + 3} + \frac{1}{a + 2}$$




{% highlight python linenos  %}
together(f2)
{% endhighlight %}




$$\frac{2 a + 5}{\left(a + 2\right) \left(a + 3\right)}$$



Simplify usually combines fractions but does not factor: 


{% highlight python linenos  %}
simplify(f2)
{% endhighlight %}




$$\frac{2 a + 5}{\left(a + 2\right) \left(a + 3\right)}$$



## Calculus

In addition to algebraic manipulations, the other main use of CAS is to do calculus, like derivatives and integrals of algebraic expressions.

### Differentiation

Differentiation is usually simple. Use the `diff` function. The first argument is the expression to take the derivative of, and the second argument is the symbol by which to take the derivative:


{% highlight python linenos  %}
y
{% endhighlight %}




$$\left(x + \pi\right)^{2}$$




{% highlight python linenos  %}
diff(y**2, x)
{% endhighlight %}




$$4 \left(x + \pi\right)^{3}$$



For higher order derivatives we can do:


{% highlight python linenos  %}
diff(y**2, x, x)
{% endhighlight %}




$$12 \left(x + \pi\right)^{2}$$




{% highlight python linenos  %}
diff(y**2, x, 2) # same as above
{% endhighlight %}




$$12 \left(x + \pi\right)^{2}$$



To calculate the derivative of a multivariate expression, we can do:


{% highlight python linenos  %}
x, y, z = symbols("x,y,z")
{% endhighlight %}


{% highlight python linenos  %}
f = sin(x*y) + cos(y*z)
{% endhighlight %}

$\frac{d^3f}{dxdy^2}$


{% highlight python linenos  %}
diff(f, x, 1, y, 2)
{% endhighlight %}




$$- x \left(x y \cos{\left (x y \right )} + 2 \sin{\left (x y \right )}\right)$$



## Integration

Integration is done in a similar fashion:


{% highlight python linenos  %}
f
{% endhighlight %}




$$\sin{\left (x y \right )} + \cos{\left (y z \right )}$$




{% highlight python linenos  %}
integrate(f, x)
{% endhighlight %}




$$x \cos{\left (y z \right )} + \begin{cases} 0 & \text{for}\: y = 0 \\- \frac{\cos{\left (x y \right )}}{y} & \text{otherwise} \end{cases}$$



By providing limits for the integration variable we can evaluate definite integrals:


{% highlight python linenos  %}
integrate(f, (x, -1, 1))
{% endhighlight %}




$$2 \cos{\left (y z \right )}$$



and also improper integrals


{% highlight python linenos  %}
integrate(exp(-x**2), (x, -oo, oo))
{% endhighlight %}




$$\sqrt{\pi}$$



Remember, `oo` is the SymPy notation for inifinity.

### Sums and products

We can evaluate sums and products using the functions: 'Sum'


{% highlight python linenos  %}
n = Symbol("n")
{% endhighlight %}


{% highlight python linenos  %}
Sum(1/n**2, (n, 1, 10))
{% endhighlight %}




$$\sum_{n=1}^{10} n^{-2}$$




{% highlight python linenos  %}
Sum(1/n**2, (n,1, 10)).evalf()
{% endhighlight %}




$$1.54976773116654$$




{% highlight python linenos  %}
Sum(1/n**2, (n, 1, oo)).evalf()
{% endhighlight %}




$$1.64493406684823$$



Products work much the same way:


{% highlight python linenos  %}
Product(n, (n, 1, 10)) # 10!
{% endhighlight %}




$$\prod_{n=1}^{10} n$$



## Limits

Limits can be evaluated using the `limit` function. For example, 


{% highlight python linenos  %}
limit(sin(x)/x, x, 0)
{% endhighlight %}




$$1$$



We can use 'limit' to check the result of derivation using the `diff` function:


{% highlight python linenos  %}
f
{% endhighlight %}




$$\sin{\left (x y \right )} + \cos{\left (y z \right )}$$




{% highlight python linenos  %}
diff(f, x)
{% endhighlight %}




$$y \cos{\left (x y \right )}$$



$\displaystyle \frac{\mathrm{d}f(x,y)}{\mathrm{d}x} = \frac{f(x+h,y)-f(x,y)}{h}$


{% highlight python linenos  %}
h = Symbol("h")
{% endhighlight %}


{% highlight python linenos  %}
limit((f.subs(x, x+h) - f)/h, h, 0)
{% endhighlight %}




$$y \cos{\left (x y \right )}$$



OK!

We can change the direction from which we approach the limiting point using the `dir` keywork argument:


{% highlight python linenos  %}
limit(1/x, x, 0, dir="+")
{% endhighlight %}




$$\infty$$




{% highlight python linenos  %}
limit(1/x, x, 0, dir="-")
{% endhighlight %}




$$-\infty$$



## Series

Series expansion is also one of the most useful features of a CAS. In SymPy we can perform a series expansion of an expression using the `series` function:


{% highlight python linenos  %}
series(exp(x), x)
{% endhighlight %}




$$1 + x + \frac{1}{2} x^{2} + \frac{1}{6} x^{3} + \frac{1}{24} x^{4} + \frac{1}{120} x^{5} + \mathcal{O}\left(x^{6}\right)$$



By default it expands the expression around $x=0$, but we can expand around any value of $x$ by explicitly include a value in the function call:


{% highlight python linenos  %}
series(exp(x), x, 1)
{% endhighlight %}




$$e + e x + \frac{1}{2} e x^{2} + \frac{1}{6} e x^{3} + \frac{1}{24} e x^{4} + \frac{1}{120} e x^{5} + \mathcal{O}\left(x^{6}\right)$$



And we can explicitly define to which order the series expansion should be carried out:


{% highlight python linenos  %}
series(exp(x), x, 1, 10)
{% endhighlight %}




$$e + e x + \frac{1}{2} e x^{2} + \frac{1}{6} e x^{3} + \frac{1}{24} e x^{4} + \frac{1}{120} e x^{5} + \frac{1}{720} e x^{6} + \frac{1}{5040} e x^{7} + \frac{1}{40320} e x^{8} + \frac{1}{362880} e x^{9} + \mathcal{O}\left(x^{10}\right)$$



The series expansion includes the order of the approximation, which is very useful for keeping track of the order of validity when we do calculations with series expansions of different order:


{% highlight python linenos  %}
s1 = cos(x).series(x, 0, 5)
s1
{% endhighlight %}




$$1 - \frac{1}{2} x^{2} + \frac{1}{24} x^{4} + \mathcal{O}\left(x^{5}\right)$$




{% highlight python linenos  %}
s2 = sin(x).series(x, 0, 2)
s2
{% endhighlight %}




$$x + \mathcal{O}\left(x^{2}\right)$$




{% highlight python linenos  %}
expand(s1 * s2)
{% endhighlight %}




$$x + \mathcal{O}\left(x^{2}\right)$$



If we want to get rid of the order information we can use the `removeO` method:


{% highlight python linenos  %}
expand(s1.removeO() * s2.removeO())
{% endhighlight %}




$$\frac{1}{24} x^{5} - \frac{1}{2} x^{3} + x$$



But note that this is not the correct expansion of $\cos(x)\sin(x)$ to $5$th order:


{% highlight python linenos  %}
(cos(x)*sin(x)).series(x, 0, 6)
{% endhighlight %}




$$x - \frac{2}{3} x^{3} + \frac{2}{15} x^{5} + \mathcal{O}\left(x^{6}\right)$$



## Linear algebra

### Matrices

Matrices are defined using the `Matrix` class:


{% highlight python linenos  %}
m11, m12, m21, m22 = symbols("m11, m12, m21, m22")
b1, b2 = symbols("b1, b2")
{% endhighlight %}


{% highlight python linenos  %}
A = Matrix([[m11, m12],[m21, m22]])
A
{% endhighlight %}




$$\left[\begin{smallmatrix}m_{11} & m_{12}\\m_{21} & m_{22}\end{smallmatrix}\right]$$




{% highlight python linenos  %}
b = Matrix([[b1], [b2]])
b
{% endhighlight %}




$$\left[\begin{smallmatrix}b_{1}\\b_{2}\end{smallmatrix}\right]$$



With `Matrix` class instances we can do the usual matrix algebra operations:


{% highlight python linenos  %}
A**2
{% endhighlight %}




$$\left[\begin{smallmatrix}m_{11}^{2} + m_{12} m_{21} & m_{11} m_{12} + m_{12} m_{22}\\m_{11} m_{21} + m_{21} m_{22} & m_{12} m_{21} + m_{22}^{2}\end{smallmatrix}\right]$$




{% highlight python linenos  %}
A * b
{% endhighlight %}




$$\left[\begin{smallmatrix}b_{1} m_{11} + b_{2} m_{12}\\b_{1} m_{21} + b_{2} m_{22}\end{smallmatrix}\right]$$



And calculate determinants and inverses, and the like:


{% highlight python linenos  %}
A.det()
{% endhighlight %}




$$m_{11} m_{22} - m_{12} m_{21}$$




{% highlight python linenos  %}
A.inv()
{% endhighlight %}




$$\left[\begin{smallmatrix}\frac{1}{m_{11}} + \frac{m_{12} m_{21}}{m_{11}^{2} \left(m_{22} - \frac{m_{12} m_{21}}{m_{11}}\right)} & - \frac{m_{12}}{m_{11} \left(m_{22} - \frac{m_{12} m_{21}}{m_{11}}\right)}\\- \frac{m_{21}}{m_{11} \left(m_{22} - \frac{m_{12} m_{21}}{m_{11}}\right)} & \frac{1}{m_{22} - \frac{m_{12} m_{21}}{m_{11}}}\end{smallmatrix}\right]$$



## Solving equations

For solving equations and systems of equations we can use the `solve` function:


{% highlight python linenos  %}
solve(x**2 - 1, x)
{% endhighlight %}




$$\begin{bmatrix}-1, & 1\end{bmatrix}$$




{% highlight python linenos  %}
solve(x**4 - x**2 - 1, x)
{% endhighlight %}




$$\begin{bmatrix}- i \sqrt{- \frac{1}{2} + \frac{1}{2} \sqrt{5}}, & i \sqrt{- \frac{1}{2} + \frac{1}{2} \sqrt{5}}, & - \sqrt{\frac{1}{2} + \frac{1}{2} \sqrt{5}}, & \sqrt{\frac{1}{2} + \frac{1}{2} \sqrt{5}}\end{bmatrix}$$



System of equations:


{% highlight python linenos  %}
solve([x + y - 1, x - y - 1], [x,y])
{% endhighlight %}




$$\begin{Bmatrix}x : 1, & y : 0\end{Bmatrix}$$



In terms of other symbolic expressions:


{% highlight python linenos  %}
solve([x + y - a, x - y - c], [x,y])
{% endhighlight %}




$$\begin{Bmatrix}x : \frac{1}{2} a + \frac{1}{2} c, & y : \frac{1}{2} a - \frac{1}{2} c\end{Bmatrix}$$



## Quantum mechanics: noncommuting variables

How about non-commuting symbols? In quantum mechanics we need to work with noncommuting operators, and SymPy has a nice support for noncommuting symbols and even a subpackage for quantum mechanics related calculations!


{% highlight python linenos  %}
from sympy.physics.quantum import *
{% endhighlight %}

## States

We can define symbol states, kets and bras:


{% highlight python linenos  %}
Ket('psi')
{% endhighlight %}




$${\left|\psi\right\rangle }$$




{% highlight python linenos  %}
Bra('psi')
{% endhighlight %}




$${\left\langle \psi\right|}$$




{% highlight python linenos  %}
u = Ket('0')
d = Ket('1')

a, b = symbols('alpha beta', complex=True)
{% endhighlight %}


{% highlight python linenos  %}
phi = a * u + sqrt(1-abs(a)**2) * d; phi
{% endhighlight %}




$$\alpha {\left|0\right\rangle } + \sqrt{- \left\lvert{\alpha}\right\rvert^{2} + 1} {\left|1\right\rangle }$$




{% highlight python linenos  %}
Dagger(phi)
{% endhighlight %}




$$\overline{\alpha} {\left\langle 0\right|} + \overline{\sqrt{- \left\lvert{\alpha}\right\rvert^{2} + 1}} {\left\langle 1\right|}$$




{% highlight python linenos  %}
Dagger(phi) * d
{% endhighlight %}




$$\left(\overline{\alpha} {\left\langle 0\right|} + \overline{\sqrt{- \left\lvert{\alpha}\right\rvert^{2} + 1}} {\left\langle 1\right|}\right) {\left|1\right\rangle }$$



Use `qapply` to distribute a mutiplication:


{% highlight python linenos  %}
qapply(Dagger(phi) * d)
{% endhighlight %}




$$\overline{\alpha} \left\langle 0 \right. {\left|1\right\rangle } + \overline{\sqrt{- \left\lvert{\alpha}\right\rvert^{2} + 1}} \left\langle 1 \right. {\left|1\right\rangle }$$




{% highlight python linenos  %}
qapply(Dagger(phi) * u)
{% endhighlight %}




$$\overline{\alpha} \left\langle 0 \right. {\left|0\right\rangle } + \overline{\sqrt{- \left\lvert{\alpha}\right\rvert^{2} + 1}} \left\langle 1 \right. {\left|0\right\rangle }$$



### Operators


{% highlight python linenos  %}
A = Operator('A')
B = Operator('B')
{% endhighlight %}

Check if they are commuting!


{% highlight python linenos  %}
A * B == B * A
{% endhighlight %}




$$False$$




{% highlight python linenos  %}
expand((A+B)**3)
{% endhighlight %}




$$A B A + A \left(B\right)^{2} + \left(A\right)^{2} B + \left(A\right)^{3} + B A B + B \left(A\right)^{2} + \left(B\right)^{2} A + \left(B\right)^{3}$$




{% highlight python linenos  %}
c = Commutator(A,B)
c
{% endhighlight %}




$$\left[A,B\right]$$



We can use the `doit` method to evaluate the commutator:


{% highlight python linenos  %}
c.doit()
{% endhighlight %}




$$A B - B A$$



We can mix quantum operators with C-numbers:


{% highlight python linenos  %}
c = Commutator(a * A, b * B)
c
{% endhighlight %}




$$\alpha \beta \left[A,B\right]$$



To expand the commutator, use the `expand` method with the `commutator=True` keyword argument:


{% highlight python linenos  %}
c = Commutator(A+B, A*B)
c.expand(commutator=True)
{% endhighlight %}




$$- \left[A,B\right] B + A \left[A,B\right]$$




{% highlight python linenos  %}
Dagger(Commutator(A, B))
{% endhighlight %}




$$- \left[A^{\dagger},B^{\dagger}\right]$$




{% highlight python linenos  %}
ac = AntiCommutator(A,B)
{% endhighlight %}


{% highlight python linenos  %}
ac.doit()
{% endhighlight %}




$$A B + B A$$



#### Example: Quadrature commutator

Let's look at the commutator of the electromagnetic field quadatures $x$ and $p$. We can write the quadrature operators in terms of the creation and annihilation operators as:

$\displaystyle x = (a + a^\dagger)/\sqrt{2}$

$\displaystyle p = -i(a - a^\dagger)/\sqrt{2}$



{% highlight python linenos  %}
X = (A + Dagger(A))/sqrt(2)
X
{% endhighlight %}




$$\frac{1}{2} \sqrt{2} \left(A^{\dagger} + A\right)$$




{% highlight python linenos  %}
P = -I * (A - Dagger(A))/sqrt(2)
P
{% endhighlight %}




$$- \frac{1}{2} \sqrt{2} i \left(- A^{\dagger} + A\right)$$



Let's expand the commutator $[x,p]$


{% highlight python linenos  %}
Commutator(X, P).expand(commutator=True).expand(commutator=True)
{% endhighlight %}




$$- i \left[A^{\dagger},A\right]$$



Here we see directly that the well known commutation relation for the quadratures

$[x,p]=i$

is a directly related to

$[A, A^\dagger]=1$ 

(which SymPy does not know about, and does not simplify).

For more details on the quantum module in SymPy, see:

* http://docs.sympy.org/0.7.2/modules/physics/quantum/index.html
* http://nbviewer.ipython.org/urls/raw.github.com/ipython/ipython/master/docs/examples/notebooks/sympy_quantum_computing.ipynb

## Further reading

* http://sympy.org/en/index.html - The SymPy projects web page.
* https://github.com/sympy/sympy - The source code of SymPy.
* http://live.sympy.org - Online version of SymPy for testing and demonstrations.

## Versions


{% highlight python linenos  %}
%reload_ext version_information

%version_information numpy, sympy
{% endhighlight %}




<table><tr><th>Software</th><th>Version</th></tr><tr><td>Python</td><td>3.3.2+ (default, Feb 28 2014, 00:52:16) [GCC 4.8.1]</td></tr><tr><td>IPython</td><td>2.2.0</td></tr><tr><td>OS</td><td>posix [linux]</td></tr><tr><td>numpy</td><td>1.8.2</td></tr><tr><td>sympy</td><td>0.7.5</td></tr><tr><td colspan='2'>Tue Aug 26 22:57:37 2014 JST</td></tr></table>


