---
layout: python_note
title: "05-Applications and Convex Sets"
tags: [ipython, convex, blog]
categories: [optimization_hw]
date:  2014-12-06
parent: [/optimization,Optimization]
---
**In [1]:**

{% highlight python linenos  %}
from scipy.optimize import minimize
import cvxopt
from cvxopt import modeling
import cvxpy as cvp
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Wedge, Polygon
{% endhighlight %}

$$C=\begin{bmatrix} ~ &Fabrication & Assembly\\
 A & 2 & 1 \\
 B & 3 & 1\\
 C & 2 & 2 \\
 \end{bmatrix}$$

$$L=\begin{bmatrix} ~ & \text{Limits}\\
 Fabrication &  1000\\
 Assembly &  800\\
 \end{bmatrix}$$

$$P=\begin{bmatrix} ~ & \text{Profits}\\
 A & 7\\
 B & 8\\
 C & 10\\
 \end{bmatrix}$$

$$\begin{align}
\text{Maximize }&P^TX\\
\text{Subject to }&C^TX\preceq L\\
&X\succeq 0\\
\end{align}$$

<!--break-->


**In [3]:**

{% highlight python linenos  %}
x_1=cvp.Variable(rows=3)
P=np.array([[7,8,9]])
b=np.array([10,8])
C=np.array([[2,1],[3,1],[2,2]])
print P.shape,x_1.shape
constraints = [ x_1>=0,C.T*x_1 <= b]
objective1 = cvp.Minimize(-1*P*x_1)
p1 = cvp.Problem(objective1, constraints)
p1.solve()
print x_1.value
print objective1.value

{% endhighlight %}

    (1, 3) Shape(3, 1)
    [ 2.00e+00]
    [ 5.40e-07]
    [ 3.00e+00]
    
    -40.9999962424


**In [79]:**

{% highlight python linenos  %}
P=np.array([[7,8,9]]).T
L=np.array([1000,800]).T
C=np.array([[2,1],[3,1],[2,2]])

def fun(x):
    cost=-np.dot(P.T,x)
    return cost
const=map(lambda j:{'type':'ineq',
       'fun':lambda x:x[j]},xrange(C.shape[0]))+\
       map(lambda j:{'type':'ineq',
       'fun':lambda x:L[j]-np.dot(x,C.T[j,:])},xrange(C.shape[1]))
       
minimize(fun,x0=np.array([0.1,0.1,0.1]),constraints=const)
{% endhighlight %}




      status: 0
     success: True
        njev: 12
        nfev: 60
         fun: array([-4099.99999998])
           x: array([  2.00000000e+02,   1.53958624e-10,   3.00000000e+02])
     message: 'Optimization terminated successfully.'
         jac: array([-7., -8., -9.,  0.])
         nit: 12



$$P=\begin{bmatrix} ~ &Regular & Delux\\
 A & 20 & 10 \\
 B & 10 & 20\\
 C & 20 & 20 \\
 \end{bmatrix}$$

$$L=\begin{bmatrix} ~ & \text{Limits}\\
 Regular &  300\\
 Assembly &  200\\
 \end{bmatrix}$$

$$C=\begin{bmatrix} ~ & \text{Costs}\\
 A & 70\\
 B & 75\\
 C & 90\\
 \end{bmatrix}$$

$$\begin{align}
\text{Minimize }&C^TX\\
\text{Subject to }&P^TX\succeq L\\
&X\succeq 0\\
\end{align}$$

**In [95]:**

{% highlight python linenos  %}
x_1=cvp.Variable(rows=3)
C=np.array([[70,75,90]]).T
L=np.array([300,200]).T
P=np.array([[20,10],[10,20],[20,20]])
constraints = [ x_1>=0,P.T*x_1 >= L]
objective1 = cvp.Minimize(C.T*x_1)
p1 = cvp.Problem(objective1, constraints)
p1.solve()
print x_1.value
{% endhighlight %}

    [ 1.00e+01]
    [ 8.28e-07]
    [ 5.00e+00]
    


**In [97]:**

{% highlight python linenos  %}
def fun(x):
    cost=np.dot(C.T,x)
    return cost
const=map(lambda j:{'type':'ineq',
       'fun':lambda x:x[j]},xrange(P.shape[0]))+\
       map(lambda j:{'type':'ineq',
       'fun':lambda x:np.dot(x,P.T[j,:])-L[j]},xrange(P.shape[1]))
       
minimize(fun,x0=np.array([0.1,0.1,0.1]),constraints=const)
{% endhighlight %}




      status: 0
     success: True
        njev: 2
        nfev: 10
         fun: array([ 1149.99999994])
           x: array([  1.00000000e+01,  -2.10258116e-10,   5.00000000e+00])
     message: 'Optimization terminated successfully.'
         jac: array([ 70.,  75.,  90.,   0.])
         nit: 2



####Affine set:

A set is Affine if:

$$\begin{align}
C \subseteq R^N\\
x_1,x_2 \in C, \theta \in R \text{ then} \\
\theta x_1+(1-\theta)x_2 \in C\\
\end{align}$$

####Convex set:

A set is Convex if:

$$\begin{align}
C \subseteq R^N
\end{align}$$
and
$$\begin{align}
x_1,x_2 \in C, \theta \in R \text{ and } 0 \leq \theta \leq 1 \text{ then} \\
\theta x_1+(1-\theta)x_2 \in C\\
\end{align}$$



#### Convex cone with vertex the origin:
A set is convex cone with vertex the origin if:

$$\begin{align}
C \subseteq R^N
\end{align}$$
and
$$\begin{align}
x,y \in C, \theta_x,\theta_y \in R \text{ and } 0 \leq \theta_x,\theta_y \text{
then} \\
\theta_x x +\theta_y y \in C\\
\end{align}$$

#### Polyhedra

A set is Polyhedra(Polytope) if:

$$P = \{x|a_j^T x \leq b_j, j= 1,\dots, m, c_j^Tx=d_j, j= 1,\dots,p\} = \{x |
Ax\preceq b.Cx=d\}$$

### Q2.12 - a

Describe following set:

\begin{align}
S_1=\{x=[x_1,x_2]^T:x_1^2+x_2^2\leq 1,x_1-x_2\leq 1,x_2>-x_1-1\}
\end{align}

**In [164]:**

{% highlight python linenos  %}
plt.axis('equal')
x=np.arange(-5,10,0.1)
plt.xlim((-2,2))
plt.ylim((-2,2))
plt.grid()
plt.gca().add_artist(plt.Circle((0,0),1,color='k',alpha=0.1))
plt.plot(x,x-1)
plt.plot(x,-x-1)
plt.gca().add_artist(plt.Polygon([[0,-1],[-1,0],[1,0]],color='k'))
plt.gca().add_artist(Wedge((0,0),1,0,180,color='k'))
{% endhighlight %}




    <matplotlib.patches.Wedge at 0x1067ea950>




![png]({{ site.baseurl}}/images/2014-12-06-05-applications-and-convex-sets_files/2014-12-06-05-applications-and-convex-sets_9_1.png)


+ This set **is** *convex*, this is the case because this set is intersection of
a set of convex sets: Circle and two halfspace. Since convex sets are closed
under intersection therefore this set is also *convex*.

+ The set **is not** *convex cone with vertex the origin* because assuming
$\theta=1000$ and x=$0,0.5$ the point $0,500$ does not belong to the set.

+ The set **is not** a *convex polytope* because it cannot be represented as a
linear inequalities of $x$.

### Q2.12 - b

Describe following set:

\begin{align}
S_1=\{x=[x_1,x_2]^T:x_1+x_2\leq 5,x_1\geq 0,x_2\geq 2\}
\end{align}

**In [171]:**

{% highlight python linenos  %}
plt.axis('equal')
x=np.arange(-15,15,1)
plt.xlim((-10,10))
plt.ylim((-10,10))
plt.grid()
plt.plot(x,5-x)
plt.vlines(0,-15,15,color='r')
plt.hlines(0,-15,15,color='g')
plt.gca().add_artist(plt.Polygon([[0,0],[0,5],[5,0]],color='k'))
{% endhighlight %}




    <matplotlib.patches.Polygon at 0x106b5c790>




![png]({{ site.baseurl}}/images/2014-12-06-05-applications-and-convex-sets_files/2014-12-06-05-applications-and-convex-sets_12_1.png)


+ This set **is** *convex*, this is the case because this set is intersection of
a set of convex sets: three halfspaces. Since convex sets are closed under
intersection therefore this set is also *convex*.

+ The set **is not** *convex cone with vertex the origin* because assuming
$\theta=1000$ and $x=0,0.5$ the point $0,500$ does not belong to the set.

+ The set **is** a *convex polytope* because it is represented as a set of
linear equalities and inequalities of $x$.

### Q2.12 - c

Describe following set:

\begin{align}
S_2=\{x=[x_1,x_2]^T:2x_1-x_2\leq 4,x_1-x_2\geq -5,x_1\geq 0,x_2\geq 0\}
\end{align}

**In [178]:**

{% highlight python linenos  %}
plt.axis('equal')
x=np.arange(-20,20,1)
plt.xlim((-20,20))
plt.ylim((-20,20))
plt.grid()
plt.plot(x,2*x-4)
plt.plot(x,x+5)
plt.vlines(0,-20,20,color='r')
plt.hlines(0,-30,30,color='g')
plt.gca().add_artist(plt.Polygon([[0,0],[0,5],[9,14],[2,0]],color='k'))
{% endhighlight %}




    <matplotlib.patches.Polygon at 0x106fd5410>




![png]({{ site.baseurl}}/images/2014-12-06-05-applications-and-convex-sets_files/2014-12-06-05-applications-and-convex-sets_15_1.png)


+ This set **is** *convex*, this is the case because this set is intersection of
a set of convex sets: four halfspaces. Since convex sets are closed under
intersection therefore this set is also *convex*.

+ The set **is not** *convex cone with vertex the origin* because assuming
$\theta=1000$ and $x=0,0.5$ the point $x'=(0,500)$ does not belong to the set.

+ The set **is** a *convex polytope* because it is represented as a set of
linear equalities and inequalities of $x$.

### Q2.13

Describe Following:

\begin{align}
S=\{[0,0]^T,[4,1]^T,[5,0]^T,[3,9]^T,[0,2]^T,[0,0]^T,[2,8]^T\}
\end{align}

---

$\textbf{Aff}(S)$ and $\textbf{L}(S)$ are the whole 2D plane.

**In [193]:**

{% highlight python linenos  %}
plt.axis('equal')
x=np.array([[0,0],[0,2],[2,8],[3,9],[5,0],[4,1]])
plt.xlim((-1,10))
plt.ylim((-1,10))
plt.grid()
plt.scatter(x[:,0],x[:,1],color='k')
plt.gca().add_artist(plt.Polygon(x[:-1],alpha=0.1))
plt.title('Con(S)')
plt.figure()
plt.xlim((-1,10))
plt.ylim((-1,10))
plt.grid()
plt.scatter(x[:,0],x[:,1],color='k')
plt.gca().add_artist(plt.Polygon([[0,0],[0,10],[10,10],[10,0]],alpha=0.1))
plt.title('Coni(S)')
{% endhighlight %}




    <matplotlib.text.Text at 0x107672150>




![png]({{ site.baseurl}}/images/2014-12-06-05-applications-and-convex-sets_files/2014-12-06-05-applications-and-convex-sets_18_1.png)



![png]({{ site.baseurl}}/images/2014-12-06-05-applications-and-convex-sets_files/2014-12-06-05-applications-and-convex-sets_18_2.png)


### Q2.14
The hyperplane $H$ is defined as:

\begin{align}
H(c,b):c^TX&=\beta\\
3x_1+4x_2&=12\\
x_2&=3-\frac{3}{4}x_1\\
\end{align}

\begin{align}
H^+(c,b):c^TX&\geq\beta\\
\end{align}

\begin{align}
H^-(c,b):c^TX&\leq\beta\\
\end{align}


**In [216]:**

{% highlight python linenos  %}

x=np.arange(-10,15,1)
plt.xlim((-3,10))
plt.ylim((-3,10))
plt.grid()
plt.plot(x,3-0.75*x)
plt.gca().add_artist(plt.Polygon([[-4,6],[-4,10],[10,10],[10,-4],[8,-3]],alpha=0.3,color='g'))
font = {'family' : 'serif',
        'color'  : 'darkred',
        'weight' : 'normal',
        'size'   : 16,
        }
plt.text(6,6,"H+",font)
plt.gca().add_artist(plt.Polygon([[-3,5.25],[8,-3],[-3,-3]],alpha=0.3,color='r'))
plt.text(0,0,"H-",font)
{% endhighlight %}




    <matplotlib.text.Text at 0x108209a50>




![png]({{ site.baseurl}}/images/2014-12-06-05-applications-and-convex-sets_files/2014-12-06-05-applications-and-convex-sets_20_1.png)


A set is convex cone with vertex the origin if:

\begin{align}
C \subseteq R^N
\end{align}
and
\begin{align}
x,y \in C, \theta_x,\theta_y \in R \text{ and } 0 \leq \theta_x,\theta_y \text{
then} \\
\theta_x x +\theta_y y \in C\\
\end{align}

---

\begin{align}
\text{Coni }(X)=\sum_{i=1}^{k}\alpha_i x_i, \forall x_i \in X,\forall \alpha_i
\geq 0
\end{align}

> $X$ is *convex cone with vertex the origin* if $X=\text{Coni }(X)$

This can be deducted by looking at the form of $\text{Coni }(X)$.

\begin{align}
\text{Coni }(X)=\sum_{i=1}^{k}\alpha_i x_i, \forall x_i \in X,\forall \alpha_i
\geq 0
\end{align}

assuming vector $\alpha$ takes 0 on all entries except two, say $\alpha_p$ and
$\alpha_q$, we retrieve the same formulation as *convex cone with vertex the
origin*.



> $X=\text{Coni }(X)$ if $X$ is *convex cone with vertex the origin*:

This can be deducted by looking at the form of *convex cone with vertex the
origin*.

\begin{align}
\text{Coni }(X)=\sum_{i=1}^{k}\alpha_i x_i, \forall x_i \in X,\forall \alpha_i
\geq 0
\end{align}

We can rewrite the sum as:

\begin{align}
\text{Coni }(X)=\sum_{i=1}^{l}\alpha_i x_i + \sum_{i=l}^{k}\alpha_i x_i, \forall
x_i \in X,\forall \alpha_i \geq 0
\end{align}

\begin{align}
P=\sum_{i=1}^{l}\alpha_i x_i \forall x_i \in X,\forall \alpha_i \geq 0
\end{align}

\begin{align}
Q=\sum_{i=l}^{k}\alpha_i x_i \forall x_i \in X,\forall \alpha_i \geq 0
\end{align}

$P,Q$ are subsets of $X$ (we can assume the $\alpha$s absent in each sum are
zero). Therefore:

\begin{align}
x\in P,y \in Q, \theta_p,\theta_q \in R \text{ and } 0 \leq \theta_p,\theta_q
\text{ then} \\
\theta_p x_p +\theta_q x_q \in X\\
\end{align}

Which shows that $X$ is *convex cone with vertex the origin*.


