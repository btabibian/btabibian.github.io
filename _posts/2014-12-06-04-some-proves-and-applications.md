---
layout: python_note
title: "04-Some proves and Applications"
tags: [ipython, convex, blog]
categories: [optimization_hw]
date:  2014-12-06
parent: [/optimization,Optimization]
---
**In []:**

{% highlight python linenos  %}
from scipy.optimize import minimize
{% endhighlight %}

###Question 1
> Consider the two problems
> $$\begin{align}
\text{Maximize } f(x_1,\dots,x_n) \text{ subject to } (x_1,\dots,x_n)\in
\Omega\\
\end{align}$$

> and

> $$\begin{align}
\text{Minimize } -f(x_1,\dots,x_n) \text{ subject to } (x_1,\dots,x_n)\in \Omega
\end{align}$$

> Show that

> $$\begin{align}
f(x_1^*,\dots,x_n^*)=max\{f(x_1,\dots,x_n):(x_1,\dots,x_n) \in \Omega \}\\
\end{align}$$

> if and only if

> $$\begin{align}
-f(x_1^*,\dots,x_n^*)=min\{-f(x_1,\dots,x_n):(x_1,\dots,x_n) \in \Omega \}\\
\end{align}$$

<!--break-->

With out loss of generality we assume these problems have unique solutions.

Assuming:

$$\begin{align}
f(x_1^*,\dots,x_n^*)=max\{f(x_1,\dots,x_n):(x_1,\dots,x_n) \in \Omega \}\\
\end{align}$$

We have that:

$$\begin{align}
\forall (x_1,\dots,x_n) \in \Omega \backslash \{(x_1^*,\dots,x_n^*)\} &\\
f(x_1^*,\dots,x_n^*) &> f(x_1,\dots,x_n)\\
\text{and therefore}\\
-f(x_1^*,\dots,x_n^*) &< -f(x_1,\dots,x_n)
\end{align}$$

which is:

$$\begin{align}
-f(x_1^*,\dots,x_n^*)=min\{-f(x_1,\dots,x_n):(x_1,\dots,x_n) \in \Omega \}\\
\end{align}$$

----

The reverse also holds:

Assuming:

$$\begin{align}
-f(x_1^*,\dots,x_n^*)=min\{-f(x_1,\dots,x_n):(x_1,\dots,x_n) \in \Omega \}\\
\end{align}$$

We have that:

$$\begin{align}
\forall (x_1,\dots,x_n) \in \Omega \backslash \{(x_1^*,\dots,x_n^*)\} &\\
-f(x_1^*,\dots,x_n^*) &< -f(x_1,\dots,x_n)\\
\text{and therefore}\\
f(x_1^*,\dots,x_n^*) &> f(x_1,\dots,x_n)
\end{align}$$

which is:

$$\begin{align}
f(x_1^*,\dots,x_n^*)=max\{f(x_1,\dots,x_n):(x_1,\dots,x_n) \in \Omega \}\\
\end{align}$$

###Question 2
> An import car company has warehouses in cities $A$,$B$ and $C$ and supplies
four different dealers $D_1$,$D_2$,$D_3$ and $D_4$. The cost in dollars of
transporting a car from a given warehouse to a given dealer is found in the
following table.

> Currently, $D_1$ needs $100$, $D_2$ needs $50$, $D_3$ needs $65$, and $D_4$
needs $75$ cars. How should the cars be shipped in order to minimize the
shipping costs?


C=$$\begin{bmatrix} ~ & D_1 & D_2 & D_3 & D_4\\
 A & 225 & 150 & 375 & 140\\
 B & 105 & 110 & 400 & 200\\
 C & 200 & 450 & 310 & 105 \\
 \end{bmatrix}$$

X=$$\begin{bmatrix} ~ &Fabrication & Assembly\\
 A & 2 & 1 \\
 B & 3 & 1\\
 C & 2 & 2 \\
 \end{bmatrix}$$

L=$$\begin{bmatrix} ~ & \text{Limits}\\
 Fabrication &  295\\
 Ass &  400\\
 C &  300\\
 \end{bmatrix}$$

P=$$\begin{bmatrix} ~ & \text{Profits}\\
 A & 7\\
 B & 8\\
 C & 10\\
 \end{bmatrix}$$

$$\begin{align}
\text{Minimize }&P^TX\\
\text{Subject to }&X_{i,:}\boldsymbol{1}<L_i & i=\{1,\dots,3\}\\
&X_{i,:}^T\boldsymbol{1}<D_i & i=\{1,\dots,4\}
\end{align}$$
