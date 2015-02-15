---
layout: python_note
title: "01-Simplex Method"
tags: [ipython, convex, blog]
categories: [optimization_hw]
date:  2014-12-11
parent: [/optimization,Optimization]
img: [
2014-12-11-01-simplex-method_files/2014-12-11-01-simplex-method_4_0.png,
2014-12-11-01-simplex-method_files/2014-12-11-01-simplex-method_39_0.png,
2014-12-11-01-simplex-method_files/2014-12-11-01-simplex-method_66_0.png,
2014-12-11-01-simplex-method_files/2014-12-11-01-simplex-method_22_0.png,
]
---
**In [2]:**

{%highlight python%}
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from IPython.display import display
#import mlabwrap
#mlab=mlabwrap.init('/Applications/MATLAB_R2013a.app/bin/matlab')
{%endhighlight%}

# Introduction to Linear Programming

#### Question 1 - A

$$\begin{align}
\text{Max } P(x; y) = 5x + 2y\\
\text{Subject to}:\\
x + y \geq 2\\
2x + y \geq 4\\
x; y \geq 0\\
\end{align}$$

**In [112]:**

{% highlight python linenos  %}
x=np.arange(0,10)
c_1=-1*x+2
c_2=-2*x+4
f=lambda b:(-2.5*x+b)
plt.plot(c_1,'r',linewidth=3)
plt.plot(c_2,'b',linewidth=3)
feasible=np.array([[0,4],[0,5],[5,5],[5,0],[2,0]])
plt.gca().add_patch(plt.Polygon(feasible,color='gray'))
map(lambda b:plt.plot(f(b),'-.k'),xrange(0,9))
plt.text(2,0.2,'(10)',fontsize=12)
plt.text(0.1,4,'(8)',fontsize=12)
plt.xlim(0,3)
_=plt.ylim(0,5)
{% endhighlight %}


![png]({{ site.baseurl}}/images/2014-12-11-01-simplex-method_files/2014-12-11-01-simplex-method_4_0.png)


It is clear from the plot that the Maximization problem is unbounded and the
solution to minimization problem is (0,4)

Matlab Linear Programming solution, which corresponds to infinity:

<!--break-->

**In [12]:**

{% highlight python linenos  %}
f=np.array([-5,-2])
W=np.array([[-1,-1],[-2,-1],[-1,0],[0,-1]])
B=np.array([-2,-4,0,0])
mlab.linprog(f,W,B)
{% endhighlight %}




    array([  5.99065774e+21,   2.62912198e+05])



#### Question 1 - B

$$\begin{align}
\text{Min } P(x; y) = 5x + 2y\\
\text{Subject to}:\\
x + y \geq 2\\
2x + y \geq 4\\
x; y \geq 0\\
\end{align}$$

Matlab Linear Programming solution:

**In [8]:**

{% highlight python linenos  %}
f=np.array([5,2])
W=np.array([[-1,-1],[-2,-1],[-1,0],[0,-1]])
B=np.array([-2,-4,0,0])
mlab.linprog(f,W,B)
{% endhighlight %}




    array([  2.29759394e-08,   3.99999995e+00])



Which we solve by using the dual problem:

**In [41]:**

{% highlight python linenos  %}
A=np.array([[1,1,2],[2,1,4],[5,2,1]])
print 'A=\n',A
print 'A\'=\n',A.T
{% endhighlight %}

    A=
    [[1 1 2]
     [2 1 4]
     [5 2 1]]
    A'=
    [[1 2 5]
     [1 1 2]
     [2 4 1]]


Which corresponds to following problem:
$$\begin{align}
\text{Max } P(x; y) = 2x + 4y\\
\text{Subject to}:\\
x + 2y \leq 5\\
x + y \leq 2\\
x; y \geq 0\\
\end{align}$$

Writing down the augumented matrix:

**In [53]:**

{% highlight python linenos  %}
A=np.array([[1,2,1,0,0,5],[1,1,0,1,0,2],[-2,-4,0,0,1,0]])
pd.DataFrame(A,index=['s_1','s_2','P'],columns=['x','y','s_1','s_2','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td> 1</td>
      <td> 2</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 5</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 1</td>
      <td> 1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 2</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-2</td>
      <td>-4</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 6 columns</p>
</div>



Which has following basic solution:
$$\begin{align}
x=&0\\
y=&0\\
P=&0\\
s_1=&5\\
s_2=&2\\
\end{align}$$

choosing column $y$ as pivot column and row $s_2$ as pivot row we do the pivot
operation:

**In [54]:**

{% highlight python linenos  %}
A[0,:]=A[0,:]-2*A[1,:]
A[2,:]=A[2,:]+4*A[1,:]
pd.DataFrame(A,index=['s_1','y','P'],columns=['x','y','s_1','s_2','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td>-1</td>
      <td> 0</td>
      <td> 1</td>
      <td>-2</td>
      <td> 0</td>
      <td> 1</td>
    </tr>
    <tr>
      <th>y</th>
      <td> 1</td>
      <td> 1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 2</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 2</td>
      <td> 0</td>
      <td> 0</td>
      <td> 4</td>
      <td> 1</td>
      <td> 8</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 6 columns</p>
</div>



This is matrix provides us with the solution:
$$\begin{align}
x=s_1&=0\\
y=s_2&=4\\
\end{align}$$

#### Question 2


$$\begin{align}
\text{Max } P(x; y) = 20x + 10y\\
\text{Subject to}:\\
x + y \geq 2\\
x + y \leq 8\\
2x + y \leq 10\\
x; y \geq 0\\
\end{align}$$

**In [16]:**

{% highlight python linenos  %}
x=np.arange(0,11)
c_1=-1*x+2
c_2=-1*x+8
c_3=-2*x+10
f=lambda b:(-2*x+b/10.0)
plt.plot(c_1,'r',linewidth=3)
plt.plot(c_2,'b',linewidth=3)
plt.plot(c_3,'g',linewidth=3)
feasible=np.array([[0,2],[0,8],[2,6],[5,0],[2,0]])
plt.gca().add_patch(plt.Polygon(feasible,color='gray'))
map(lambda b:plt.plot(f(b),'-.k'),xrange(0,110,10))
plt.text(0,2.2,'(20)',fontsize=12)
plt.text(0,8,'(80)',fontsize=12)
plt.text(2,6,'(100)',fontsize=12,weight='bold')
plt.text(5,0.2,'(100)',fontsize=12,weight='bold')
plt.text(2,0.2,'(40)',fontsize=12)
plt.xlim(0,10)
_=plt.ylim(0,10)
{% endhighlight %}


![png]({{ site.baseurl}}/images/2014-12-11-01-simplex-method_files/2014-12-11-01-simplex-method_22_0.png)


Matlab Linear Programming solution:

**In [17]:**

{% highlight python linenos  %}
f=np.array([-20,-10])
W=np.array([[-1,-1],[1,1],[2,1],[-1,0],[0,-1]])
B=np.array([-2,8,10,0,0])
#mlab.linprog(f,W,B)
{% endhighlight %}

**In [18]:**

{% highlight python linenos  %}
A=np.array([[1,1,-1,0,0,0,2],[1,1,0,1,0,0,8],[2,1,0,0,1,0,10],[20,10,0,0,0,1,0]])
pd.DataFrame(A,index=['s_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td>  1</td>
      <td>  1</td>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td>  2</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>  1</td>
      <td>  1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>  8</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td>  2</td>
      <td>  1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 10</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 20</td>
      <td> 10</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>  0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



$$\begin{align}
x=&0\\
y=&0\\
P=&0\\
s_1=&-2\\
s_2=&8\\
s_3=&10
\end{align}$$

**In [32]:**

{% highlight python linenos  %}
M=1000
A=np.array([[1,1,-1,0,0,1,0,2],[1,1,0,1,0,0,0,8],[2,1,0,0,1,0,0,10],[-20,-10,0,0,0,M,1,0]])
pd.DataFrame(A,index=['s_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td>  1</td>
      <td>  1</td>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td>    1</td>
      <td> 0</td>
      <td>  2</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>  1</td>
      <td>  1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td>    0</td>
      <td> 0</td>
      <td>  8</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td>  2</td>
      <td>  1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>    0</td>
      <td> 0</td>
      <td> 10</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-20</td>
      <td>-10</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1000</td>
      <td> 1</td>
      <td>  0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [33]:**

{% highlight python linenos  %}
A[3,:]+=-M*A[0,:]
pd.DataFrame(A,index=['a_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a_1</th>
      <td>    1</td>
      <td>    1</td>
      <td>   -1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td>    2</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>    1</td>
      <td>    1</td>
      <td>    0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td>    8</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td>    2</td>
      <td>    1</td>
      <td>    0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>   10</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-1020</td>
      <td>-1010</td>
      <td> 1000</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>-2000</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



$$
\begin{align}
x=&0\\
y=&0\\
P=&0\\
s_1=&0\\
s_2=&8\\
s_3=&10\\
a_1=&2\\
\end{align}$$

Here we write a simple function to do the pivot operation:

**In [25]:**

{% highlight python linenos  %}
def do_row(A,R,C):
    def check(r):
        if r!=R:
            return True
        else:
            return False
    def row_op(r):
        A[r,:]+=-A[r,C]*A[R,:]/A[R,C]
    map(row_op,filter(check,xrange(A.shape[0])))
{% endhighlight %}

**In [34]:**

{% highlight python linenos  %}
A
{% endhighlight %}




    array([[    1,     1,    -1,     0,     0,     1,     0,     2],
           [    1,     1,     0,     1,     0,     0,     0,     8],
           [    2,     1,     0,     0,     1,     0,     0,    10],
           [-1020, -1010,  1000,     0,     0,     0,     1, -2000]])



**In [28]:**

{% highlight python linenos  %}
R=0
C=0
do_row(A,R,C)
pd.DataFrame(A,index=['x','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>x</th>
      <td> 1</td>
      <td>  1</td>
      <td> -1</td>
      <td> 0</td>
      <td> 0</td>
      <td>    1</td>
      <td> 0</td>
      <td>  2</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 0</td>
      <td>  0</td>
      <td>  1</td>
      <td> 1</td>
      <td> 0</td>
      <td>   -1</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> 0</td>
      <td> -1</td>
      <td>  2</td>
      <td> 0</td>
      <td> 1</td>
      <td>   -2</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0</td>
      <td> 10</td>
      <td>-20</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1020</td>
      <td> 1</td>
      <td> 40</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [29]:**

{% highlight python linenos  %}
R=2
C=2
do_row(A,R,C)
pd.DataFrame(A,index=['x','s_2','s_1','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>x</th>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td>  0</td>
      <td>    0</td>
      <td> 0</td>
      <td>   5</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> -1</td>
      <td>    0</td>
      <td> 0</td>
      <td>   3</td>
    </tr>
    <tr>
      <th>s_1</th>
      <td> 0</td>
      <td>-1</td>
      <td> 2</td>
      <td> 0</td>
      <td>  1</td>
      <td>   -2</td>
      <td> 0</td>
      <td>   6</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 10</td>
      <td> 1000</td>
      <td> 1</td>
      <td> 100</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



$$
\begin{align}
x=&5\\
y=&0\\
P=&100\\
s_1=&3\\
s_2=&3\\
s_3=&0\\
a_1=&0\\
\end{align}$$

Since one of the constraint lines is parallel to objective function the whole
line segment is optimal. The other end of the line is picked by Matlab solver.

#### Question 3 - A

**In [193]:**

{% highlight python linenos  %}
%%latex
\begin{align}
\text{Max } P(x; y) =& 20x + 10y\\
\text{Subject to}:&\\
2x + 3y \geq& 30\\
2x + y \leq& 26\\
-2x + 5y \leq& 34\\
x; y \geq& 0\\
\end{align}
{% endhighlight %}


\begin{align}
\text{Max } P(x; y) =& 20x + 10y\\
\text{Subject to}:&\\
2x + 3y \geq& 30\\
2x + y \leq& 26\\
-2x + 5y \leq& 34\\
x; y \geq& 0\\
\end{align}


**In [254]:**

{% highlight python linenos  %}
x=np.arange(0,51)
c_1=-2.0/3*x+30/3
c_2=-2.0*x+26.0
c_3=2.0/5*x+34/5.0
f=lambda b:(-2*x+b/10.0)
plt.plot(c_1,'r',linewidth=3)
plt.plot(c_2,'b',linewidth=3)
plt.plot(c_3,'g',linewidth=3)
feasible=np.array([[3,8],[8,10],[12,2]])
plt.gca().add_patch(plt.Polygon(feasible,color='gray'))
map(lambda b:plt.plot(f(b),'-.k'),xrange(0,300,30))
plt.text(3,8.2,'(140)',fontsize=12)
plt.text(8,10,'(260)',fontsize=12,weight='bold')
plt.text(12,2.2,'(260)',fontsize=12,weight='bold')

plt.xlim(0,50)
_=plt.ylim(0,50)
{% endhighlight %}


![png]({{ site.baseurl}}/images/2014-12-11-01-simplex-method_files/2014-12-11-01-simplex-method_39_0.png)


Matlab Linear Programming solution:

**In [16]:**

{% highlight python linenos  %}
f=np.array([-20,-10])
W=np.array([[-2,-3],[2,1],[-2,5],[-1,0],[0,-1]])
B=np.array([-30,26,34,0,0])
mlab.linprog(f,W,B)
{% endhighlight %}




    array([ 9.71445097,  6.57109806])



**In [230]:**

{% highlight python linenos  %}
A=np.array([[2,3,-1,0,0,0,30],[2,1,0,1,0,0,26],[-2,5,0,0,1,0,34],[-20,-10,0,0,0,1,0]])
pd.DataFrame(A,index=['s_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td>  2</td>
      <td>  3</td>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 30</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>  2</td>
      <td>  1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 26</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> -2</td>
      <td>  5</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 34</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-20</td>
      <td>-10</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>  0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



This is not a valid basic solution

$$
\begin{align}
\text{Max } P(x; y) =& 20x + 10y -Ma_1\\
\text{Subject to}:&\\
2x + 3y -s_1+a_1=& 30\\
2x + y \leq& 26\\
-2x + 5y \leq& 34\\
x; y \geq& 0\\
\end{align}$$

**In [232]:**

{% highlight python linenos  %}
A=np.array([[2.0,3.0,-1.0,0,0,1.0,0,30.0],[2.0,1.0,0,1.0,0,0,0,26.0],[-2.0,5.0,0,0,1.0,0,0,34.0],[-20.0,-10,0,0,0,M,1.0,0]])
pd.DataFrame(A,index=['s_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td>  2</td>
      <td>  3</td>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td>    1</td>
      <td> 0</td>
      <td> 30</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>  2</td>
      <td>  1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td>    0</td>
      <td> 0</td>
      <td> 26</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> -2</td>
      <td>  5</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>    0</td>
      <td> 0</td>
      <td> 34</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-20</td>
      <td>-10</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1000</td>
      <td> 1</td>
      <td>  0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [233]:**

{% highlight python linenos  %}
A[3,:]+=-M*A[0,:]
pd.DataFrame(A,index=['a_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a_1</th>
      <td>    2</td>
      <td>    3</td>
      <td>   -1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td>    30</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>    2</td>
      <td>    1</td>
      <td>    0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td>    26</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td>   -2</td>
      <td>    5</td>
      <td>    0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>    34</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-2020</td>
      <td>-3010</td>
      <td> 1000</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>-30000</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [234]:**

{% highlight python linenos  %}
R=2
C=1
do_row(A,R,C)
pd.DataFrame(A,index=['a_1','s_2','y','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a_1</th>
      <td>    3.2</td>
      <td> 0</td>
      <td>   -1</td>
      <td> 0</td>
      <td>  -0.6</td>
      <td> 1</td>
      <td> 0</td>
      <td>    9.6</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>    2.4</td>
      <td> 0</td>
      <td>    0</td>
      <td> 1</td>
      <td>  -0.2</td>
      <td> 0</td>
      <td> 0</td>
      <td>   19.2</td>
    </tr>
    <tr>
      <th>y</th>
      <td>   -2.0</td>
      <td> 5</td>
      <td>    0</td>
      <td> 0</td>
      <td>   1.0</td>
      <td> 0</td>
      <td> 0</td>
      <td>   34.0</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-3224.0</td>
      <td> 0</td>
      <td> 1000</td>
      <td> 0</td>
      <td> 602.0</td>
      <td> 0</td>
      <td> 1</td>
      <td>-9532.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [235]:**

{% highlight python linenos  %}
R=0
C=0
do_row(A,R,C)
pd.DataFrame(A,index=['x','s_2','y','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>x</th>
      <td> 3.2</td>
      <td> 0</td>
      <td>-1.000</td>
      <td> 0</td>
      <td>-0.600</td>
      <td>    1.000</td>
      <td> 0</td>
      <td>   9.6</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 0.0</td>
      <td> 0</td>
      <td> 0.750</td>
      <td> 1</td>
      <td> 0.250</td>
      <td>   -0.750</td>
      <td> 0</td>
      <td>  12.0</td>
    </tr>
    <tr>
      <th>y</th>
      <td> 0.0</td>
      <td> 5</td>
      <td>-0.625</td>
      <td> 0</td>
      <td> 0.625</td>
      <td>    0.625</td>
      <td> 0</td>
      <td>  40.0</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0.0</td>
      <td> 0</td>
      <td>-7.500</td>
      <td> 0</td>
      <td>-2.500</td>
      <td> 1007.500</td>
      <td> 1</td>
      <td> 140.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [237]:**

{% highlight python linenos  %}
R=1
C=2
do_row(A,R,C)
pd.DataFrame(A,index=['x','s_1','y','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>x</th>
      <td> 3.2</td>
      <td> 0</td>
      <td> 0.00</td>
      <td>  1.333333</td>
      <td>-2.666667e-01</td>
      <td>    0.00</td>
      <td> 0</td>
      <td>  25.6</td>
    </tr>
    <tr>
      <th>s_1</th>
      <td> 0.0</td>
      <td> 0</td>
      <td> 0.75</td>
      <td>  1.000000</td>
      <td> 2.500000e-01</td>
      <td>   -0.75</td>
      <td> 0</td>
      <td>  12.0</td>
    </tr>
    <tr>
      <th>y</th>
      <td> 0.0</td>
      <td> 5</td>
      <td> 0.00</td>
      <td>  0.833333</td>
      <td> 8.333333e-01</td>
      <td>    0.00</td>
      <td> 0</td>
      <td>  50.0</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0.0</td>
      <td> 0</td>
      <td> 0.00</td>
      <td> 10.000000</td>
      <td> 1.132427e-13</td>
      <td> 1000.00</td>
      <td> 1</td>
      <td> 260.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



$$\begin{align}
x=&8.0\\
y=&10.0\\
P=&260\\
s_1=&16.0\\
s_2=&0\\
s_3=&0\\
a_1=&0\\
\end{align}$$

#### Question 3 - B

$$
\begin{align}
\text{Min } P(x; y) =& 20x + 10y\\
\text{Subject to}:&\\
2x + 3y \geq& 30\\
2x + y \leq& 26\\
-2x + 5y \leq& 34\\
x; y \geq& 0\\
\end{align}$$

Matlab Linear Programming solution:

**In [17]:**

{% highlight python linenos  %}
f=np.array([20,10])
W=np.array([[-2,-3],[2,1],[-2,5],[-1,0],[0,-1]])
B=np.array([-30,26,34,0,0])
mlab.linprog(f,W,B)
{% endhighlight %}




    array([ 3.,  8.])



This optimization problem is equal to:

$$
\begin{align}
\text{Max } P(x; y) =& -20x - 10y\\
\text{Subject to}:&\\
2x + 3y \geq& 30\\
2x + y \leq& 26\\
-2x + 5y \leq& 34\\
x; y \geq& 0\\
\end{align}$$

**In [257]:**

{% highlight python linenos  %}
A=np.array([[2,3,-1,0,0,0,30],[2,1,0,1,0,0,26],[-2,5,0,0,1,0,34],[20,10,0,0,0,1,0]])
pd.DataFrame(A,index=['s_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td>  2</td>
      <td>  3</td>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 30</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>  2</td>
      <td>  1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 26</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> -2</td>
      <td>  5</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 34</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 20</td>
      <td> 10</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>  0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>




$$\begin{align}
\text{Max } P(x; y) =& -20x - 10y - Ma_1\\
\text{Subject to}:&\\
2x + 3y -s_1+a_1=& 30\\
2x + y \leq& 26\\
-2x + 5y \leq& 34\\
x; y \geq& 0\\
\end{align}$$

**In [261]:**

{% highlight python linenos  %}
A=np.array([[2.0,3.0,-1.0,0,0,1.0,0,30.0],[2.0,1.0,0,1.0,0,0,0,26.0],[-2.0,5.0,0,0,1.0,0,0,34.0],[20.0,10,0,0,0,M,1.0,0]])
pd.DataFrame(A,index=['s_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td>  2</td>
      <td>  3</td>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td>    1</td>
      <td> 0</td>
      <td> 30</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>  2</td>
      <td>  1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td>    0</td>
      <td> 0</td>
      <td> 26</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> -2</td>
      <td>  5</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>    0</td>
      <td> 0</td>
      <td> 34</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 20</td>
      <td> 10</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1000</td>
      <td> 1</td>
      <td>  0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [262]:**

{% highlight python linenos  %}
A[3,:]+=-M*A[0,:]
pd.DataFrame(A,index=['a_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a_1</th>
      <td>    2</td>
      <td>    3</td>
      <td>   -1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td>    30</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>    2</td>
      <td>    1</td>
      <td>    0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td>    26</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td>   -2</td>
      <td>    5</td>
      <td>    0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>    34</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-1980</td>
      <td>-2990</td>
      <td> 1000</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>-30000</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [263]:**

{% highlight python linenos  %}
R=2
C=1
do_row(A,R,C)
pd.DataFrame(A,index=['a_1','s_2','y','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a_1</th>
      <td>    3.2</td>
      <td> 0</td>
      <td>   -1</td>
      <td> 0</td>
      <td>  -0.6</td>
      <td> 1</td>
      <td> 0</td>
      <td>    9.6</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td>    2.4</td>
      <td> 0</td>
      <td>    0</td>
      <td> 1</td>
      <td>  -0.2</td>
      <td> 0</td>
      <td> 0</td>
      <td>   19.2</td>
    </tr>
    <tr>
      <th>y</th>
      <td>   -2.0</td>
      <td> 5</td>
      <td>    0</td>
      <td> 0</td>
      <td>   1.0</td>
      <td> 0</td>
      <td> 0</td>
      <td>   34.0</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-3176.0</td>
      <td> 0</td>
      <td> 1000</td>
      <td> 0</td>
      <td> 598.0</td>
      <td> 0</td>
      <td> 1</td>
      <td>-9668.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



**In [265]:**

{% highlight python linenos  %}
R=0
C=0
do_row(A,R,C)
pd.DataFrame(A,index=['x','s_2','y','P'],columns=['x','y','s_1','s_2','s_3','a_1','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>a_1</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>x</th>
      <td> 3.2</td>
      <td> 0</td>
      <td>-1.000</td>
      <td> 0</td>
      <td>-0.600</td>
      <td>   1.000</td>
      <td> 0</td>
      <td>   9.6</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 0.0</td>
      <td> 0</td>
      <td> 0.750</td>
      <td> 1</td>
      <td> 0.250</td>
      <td>  -0.750</td>
      <td> 0</td>
      <td>  12.0</td>
    </tr>
    <tr>
      <th>y</th>
      <td> 0.0</td>
      <td> 5</td>
      <td>-0.625</td>
      <td> 0</td>
      <td> 0.625</td>
      <td>   0.625</td>
      <td> 0</td>
      <td>  40.0</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0.0</td>
      <td> 0</td>
      <td> 7.500</td>
      <td> 0</td>
      <td> 2.500</td>
      <td> 992.500</td>
      <td> 1</td>
      <td>-140.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 8 columns</p>
</div>



$$
\begin{align}
x=&3.0\\
y=&8.0\\
P=&-140\\
s_1=&0\\
s_2=&12\\
s_3=&0\\
a_1=&0\\
\end{align}$$

#### Question 4

$$
\begin{align}
\text{Max } P(x; y) =& x+y\\
\text{Subject to}:&\\
2x + y \leq 16\\
x \leq& 6\\
y \leq& 10\\
x; y \geq& 0\\
\end{align}$$

**In [311]:**

{% highlight python linenos  %}
x=np.arange(0,21)
y=np.arange(0,21)
c_1=-2.0*x+16
c_3=np.ones(51)*10
f=lambda b:(-1*x+b)
plt.plot(c_1,'r',linewidth=3)
plt.vlines(6,0,51,'b',linewidth=3)
plt.plot(c_3,'g',linewidth=3)
feasible=np.array([[0,0],[0,10],[3,10],[6,4],[6,0]])
plt.gca().add_patch(plt.Polygon(feasible,color='gray'))
map(lambda b:plt.plot(f(b),'-.k'),xrange(20))
plt.text(0.1,0.2,'(0)',fontsize=12)
plt.text(0,10.2,'(10)',fontsize=12)
plt.text(3,10.2,'(13)',fontsize=12,weight='bold')
plt.text(6.1,4.2,'(10)',fontsize=12)
plt.text(6,0,'(6)',fontsize=12)

plt.xlim(0,20)
_=plt.ylim(0,20)
{% endhighlight %}


![png]({{ site.baseurl}}/images/2014-12-11-01-simplex-method_files/2014-12-11-01-simplex-method_66_0.png)


Matlab Linear Programming solution:

**In [18]:**

{% highlight python linenos  %}
f=np.array([-1,-1])
W=np.array([[2,1],[1,0],[0,1],[-1,0],[0,-1]])
B=np.array([16,6,10,0,0])
mlab.linprog(f,W,B)
{% endhighlight %}




    array([  3.,  10.])



**In [277]:**

{% highlight python linenos  %}
A=np.array([[2,1,1,0,0,0,16],[1,0,0,1,0,0,6],[0,1,0,0,1,0,10],[-1,-1,0,0,0,1,0]])
pd.DataFrame(A,index=['s_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td> 2</td>
      <td> 1</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 16</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 10</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-1</td>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>  0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



We first pick column 1:

**In [278]:**

{% highlight python linenos  %}
R=1
C=0
do_row(A,R,C)
pd.DataFrame(A,index=['s_1','x','s_3','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td> 0</td>
      <td> 1</td>
      <td> 1</td>
      <td>-2</td>
      <td> 0</td>
      <td> 0</td>
      <td>  4</td>
    </tr>
    <tr>
      <th>x</th>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 10</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0</td>
      <td>-1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 1</td>
      <td>  6</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



**In [279]:**

{% highlight python linenos  %}
R=0
C=1
do_row(A,R,C)
pd.DataFrame(A,index=['y','x','s_3','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>y</th>
      <td> 0</td>
      <td> 1</td>
      <td> 1</td>
      <td>-2</td>
      <td> 0</td>
      <td> 0</td>
      <td>  4</td>
    </tr>
    <tr>
      <th>x</th>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> 0</td>
      <td> 0</td>
      <td>-1</td>
      <td> 2</td>
      <td> 1</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>-1</td>
      <td> 0</td>
      <td> 1</td>
      <td> 10</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



**In [280]:**

{% highlight python linenos  %}
R=2
C=3
do_row(A,R,C)
pd.DataFrame(A,index=['y','x','s_2','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>y</th>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 10</td>
    </tr>
    <tr>
      <th>x</th>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td>-1</td>
      <td> 0</td>
      <td>  3</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 0</td>
      <td> 0</td>
      <td>-1</td>
      <td> 2</td>
      <td> 1</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 13</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



$$
\begin{align}
x=&3.0\\
y=&10.0\\
P=&13\\
s_1=&0\\
s_2=&3\\
s_3=&0\\
\end{align}$$

**In [284]:**

{% highlight python linenos  %}
A=np.array([[2,1,1,0,0,0,16],[1,0,0,1,0,0,6],[0,1,0,0,1,0,10],[-1,-1,0,0,0,1,0]])
pd.DataFrame(A,index=['s_1','s_2','s_3','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td> 2</td>
      <td> 1</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 16</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>s_3</th>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 10</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-1</td>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td>  0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



Now we pick column 2:

**In [285]:**

{% highlight python linenos  %}
R=2
C=1
do_row(A,R,C)
pd.DataFrame(A,index=['s_1','s_2','y','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>s_1</th>
      <td> 2</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td>-1</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>y</th>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 10</td>
    </tr>
    <tr>
      <th>P</th>
      <td>-1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 1</td>
      <td> 10</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



**In [286]:**

{% highlight python linenos  %}
R=0
C=0
do_row(A,R,C)
pd.DataFrame(A,index=['x','s_2','y','P'],columns=['x','y','s_1','s_2','s_3','P','b'])
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x</th>
      <th>y</th>
      <th>s_1</th>
      <th>s_2</th>
      <th>s_3</th>
      <th>P</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>x</th>
      <td> 2</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td>-1</td>
      <td> 0</td>
      <td>  6</td>
    </tr>
    <tr>
      <th>s_2</th>
      <td> 0</td>
      <td> 0</td>
      <td>-1</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td>  3</td>
    </tr>
    <tr>
      <th>y</th>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 0</td>
      <td> 10</td>
    </tr>
    <tr>
      <th>P</th>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 0</td>
      <td> 1</td>
      <td> 13</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 7 columns</p>
</div>



$$
\begin{align}
x=&3.0\\
y=&10.0\\
P=&13\\
s_1=&0\\
s_2=&3\\
s_3=&0\\
\end{align}$$
