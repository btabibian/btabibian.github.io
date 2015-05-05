---
layout: python_note
title: "Lecture 4"
subtitle: "Matplotlib"
tags: [u'learning', u'python']
categories: [

scientific-computing,

]
date:  2015-04-15
parent: "learningPython"
img: [
matplotlib.png,
]

github: https://github.com/btabibian/scientific-python-lectures/blob/master/Lecture-4-Matplotlib.ipynb

---
# matplotlib - 2D and 3D plotting in Python

J.R. Johansson (robert@riken.jp) http://dml.riken.jp/~rob/

The latest version of this [IPython notebook](http://ipython.org/notebook.html) lecture is available at [http://github.com/jrjohansson/scientific-python-lectures](http://github.com/jrjohansson/scientific-python-lectures).

The other notebooks in this lecture series are indexed at [http://jrjohansson.github.io](http://jrjohansson.github.io).


{% highlight python linenos  %}
# This line configures matplotlib to show figures embedded in the notebook, 
# instead of opening a new window for each figure. More about that later. 
# If you are using an old version of IPython, try using '%pylab inline' instead.
%matplotlib inline
{% endhighlight %}

## Introduction

Matplotlib is an excellent 2D and 3D graphics library for generating scientific figures. Some of the many advantages of this library include:

* Easy to get started
* Support for $\LaTeX$ formatted labels and texts
* Great control of every element in a figure, including figure size and DPI. 
* High-quality output in many formats, including PNG, PDF, SVG, EPS, and PGF.
* GUI for interactively exploring figures *and* support for headless generation of figure files (useful for batch jobs).

One of the of the key features of matplotlib that I would like to emphasize, and that I think makes matplotlib highly suitable for generating figures for scientific publications is that all aspects of the figure can be controlled *programmatically*. This is important for reproducibility and convenient when one needs to regenerate the figure with updated data or change its appearance. 

More information at the Matplotlib web page: http://matplotlib.org/

To get started using Matplotlib in a Python program, either include the symbols from the `pylab` module (the easy way):


{% highlight python linenos  %}
from pylab import *
{% endhighlight %}

or import the `matplotlib.pyplot` module under the name `plt` (the tidy way):


{% highlight python linenos  %}
import matplotlib.pyplot as plt
{% endhighlight %}

## MATLAB-like API

The easiest way to get started with plotting using matplotlib is often to use the MATLAB-like API provided by matplotlib. 

It is designed to be compatible with MATLAB's plotting functions, so it is easy to get started with if you are familiar with MATLAB.

To use this API from matplotlib, we need to include the symbols in the `pylab` module: 


{% highlight python linenos  %}
from pylab import *
{% endhighlight %}

### Example

A simple figure with MATLAB-like plotting API:


{% highlight python linenos  %}
x = linspace(0, 5, 10)
y = x ** 2
{% endhighlight %}


{% highlight python linenos  %}
figure()
plot(x, y, 'r')
xlabel('x')
ylabel('y')
title('title')
show()
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_15_0.png)


Most of the plotting related functions in MATLAB are covered by the `pylab` module. For example, subplot and color/symbol selection:


{% highlight python linenos  %}
subplot(1,2,1)
plot(x, y, 'r--')
subplot(1,2,2)
plot(y, x, 'g*-');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_17_0.png)


The good thing about the pylab MATLAB-style API is that it is easy to get started with if you are familiar with MATLAB, and it has a minumum of coding overhead for simple plots. 

However, I'd encourrage not using the MATLAB compatible API for anything but the simplest figures.

Instead, I recommend learning and using matplotlib's object-oriented plotting API. It is remarkably powerful. For advanced figures with subplots, insets and other components it is very nice to work with. 

## The matplotlib object-oriented API

The main idea with object-oriented programming is to have objects that one can apply functions and actions on, and no object or program states should be global (such as the MATLAB-like API). The real advantage of this approach becomes apparent when more than one figure is created, or when a figure contains more than one subplot. 

To use the object-oriented API we start out very much like in the previous example, but instead of creating a new global figure instance we store a reference to the newly created figure instance in the `fig` variable, and from it we create a new axis instance `axes` using the `add_axes` method in the `Figure` class instance `fig`:


{% highlight python linenos  %}
fig = plt.figure()

axes = fig.add_axes([0.1, 0.1, 0.8, 0.8]) # left, bottom, width, height (range 0 to 1)

axes.plot(x, y, 'r')

axes.set_xlabel('x')
axes.set_ylabel('y')
axes.set_title('title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_21_0.png)


Although a little bit more code is involved, the advantage is that we now have full control of where the plot axes are placed, and we can easily add more than one axis to the figure:


{% highlight python linenos  %}
fig = plt.figure()

axes1 = fig.add_axes([0.1, 0.1, 0.8, 0.8]) # main axes
axes2 = fig.add_axes([0.2, 0.5, 0.4, 0.3]) # inset axes

# main figure
axes1.plot(x, y, 'r')
axes1.set_xlabel('x')
axes1.set_ylabel('y')
axes1.set_title('title')

# insert
axes2.plot(y, x, 'g')
axes2.set_xlabel('y')
axes2.set_ylabel('x')
axes2.set_title('insert title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_23_0.png)


If we don't care about being explicit about where our plot axes are placed in the figure canvas, then we can use one of the many axis layout managers in matplotlib. My favorite is `subplots`, which can be used like this:


{% highlight python linenos  %}
fig, axes = plt.subplots()

axes.plot(x, y, 'r')
axes.set_xlabel('x')
axes.set_ylabel('y')
axes.set_title('title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_25_0.png)



{% highlight python linenos  %}
fig, axes = plt.subplots(nrows=1, ncols=2)

for ax in axes:
    ax.plot(x, y, 'r')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_title('title')
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_26_0.png)


That was easy, but it isn't so pretty with overlapping figure axes and labels, right?

We can deal with that by using the `fig.tight_layout` method, which automatically adjusts the positions of the axes on the figure canvas so that there is no overlapping content:


{% highlight python linenos  %}
fig, axes = plt.subplots(nrows=1, ncols=2)

for ax in axes:
    ax.plot(x, y, 'r')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_title('title')
    
fig.tight_layout()
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_28_0.png)


### Figure size, aspect ratio and DPI

Matplotlib allows the aspect ratio, DPI and figure size to be specified when the `Figure` object is created, using the `figsize` and `dpi` keyword arguments. `figsize` is a tuple of the width and height of the figure in inches, and `dpi` is the dots-per-inch (pixel per inch). To create an 800x400 pixel, 100 dots-per-inch figure, we can do: 


{% highlight python linenos  %}
fig = plt.figure(figsize=(8,4), dpi=100)
{% endhighlight %}


    <matplotlib.figure.Figure at 0x4cbd390>


The same arguments can also be passed to layout managers, such as the `subplots` function:


{% highlight python linenos  %}
fig, axes = plt.subplots(figsize=(12,3))

axes.plot(x, y, 'r')
axes.set_xlabel('x')
axes.set_ylabel('y')
axes.set_title('title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_33_0.png)


### Saving figures

To save a figure to a file we can use the `savefig` method in the `Figure` class:


{% highlight python linenos  %}
fig.savefig("filename.png")
{% endhighlight %}

Here we can also optionally specify the DPI and choose between different output formats:


{% highlight python linenos  %}
fig.savefig("filename.png", dpi=200)
{% endhighlight %}

#### What formats are available and which ones should be used for best quality?

Matplotlib can generate high-quality output in a number formats, including PNG, JPG, EPS, SVG, PGF and PDF. For scientific papers, I recommend using PDF whenever possible. (LaTeX documents compiled with `pdflatex` can include PDFs using the `includegraphics` command). In some cases, PGF can also be good alternative.

### Legends, labels and titles

Now that we have covered the basics of how to create a figure canvas and add axes instances to the canvas, let's look at how decorate a figure with titles, axis labels, and legends.

**Figure titles**

A title can be added to each axis instance in a figure. To set the title, use the `set_title` method in the axes instance:


{% highlight python linenos  %}
ax.set_title("title");
{% endhighlight %}

**Axis labels**

Similarly, with the methods `set_xlabel` and `set_ylabel`, we can set the labels of the X and Y axes:


{% highlight python linenos  %}
ax.set_xlabel("x")
ax.set_ylabel("y");
{% endhighlight %}

**Legends**

Legends for curves in a figure can be added in two ways. One method is to use the `legend` method of the axis object and pass a list/tuple of legend texts for the previously defined curves:


{% highlight python linenos  %}
ax.legend(["curve1", "curve2", "curve3"]);
{% endhighlight %}

The method described above follows the MATLAB API. It is somewhat prone to errors and unflexible if curves are added to or removed from the figure (resulting in a wrongly labelled curve).

A better method is to use the `label="label text"` keyword argument when plots or other objects are added to the figure, and then using the `legend` method without arguments to add the legend to the figure: 


{% highlight python linenos  %}
ax.plot(x, x**2, label="curve1")
ax.plot(x, x**3, label="curve2")
ax.legend();
{% endhighlight %}

The advantage with this method is that if curves are added or removed from the figure, the legend is automatically updated accordingly.

The `legend` function takes an optional keyword argument `loc` that can be used to specify where in the figure the legend is to be drawn. The allowed values of `loc` are numerical codes for the various places the legend can be drawn. See http://matplotlib.org/users/legend_guide.html#legend-location for details. Some of the most common `loc` values are:


{% highlight python linenos  %}
ax.legend(loc=0) # let matplotlib decide the optimal location
ax.legend(loc=1) # upper right corner
ax.legend(loc=2) # upper left corner
ax.legend(loc=3) # lower left corner
ax.legend(loc=4) # lower right corner
# .. many more options are available
{% endhighlight %}




    <matplotlib.legend.Legend at 0x4c863d0>



The following figure shows how to use the figure title, axis labels and legends described above:


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.plot(x, x**2, label="y = x**2")
ax.plot(x, x**3, label="y = x**3")
ax.legend(loc=2); # upper left corner
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_54_0.png)


### Formatting text: LaTeX, fontsize, font family

The figure above is functional, but it does not (yet) satisfy the criteria for a figure used in a publication. First and foremost, we need to have LaTeX formatted text, and second, we need to be able to adjust the font size to appear right in a publication.

Matplotlib has great support for LaTeX. All we need to do is to use dollar signs encapsulate LaTeX in any text (legend, title, label, etc.). For example, `"$y=x^3$"`.

But here we can run into a slightly subtle problem with LaTeX code and Python text strings. In LaTeX, we frequently use the backslash in commands, for example `\alpha` to produce the symbol $\alpha$. But the backslash already has a meaning in Python strings (the escape code character). To avoid Python messing up our latex code, we need to use "raw" text strings. Raw text strings are prepended with an '`r`', like `r"\alpha"` or `r'\alpha'` instead of `"\alpha"` or `'\alpha'`:


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.plot(x, x**2, label=r"$y = \alpha^2$")
ax.plot(x, x**3, label=r"$y = \alpha^3$")
ax.legend(loc=2) # upper left corner
ax.set_xlabel(r'$\alpha$', fontsize=18)
ax.set_ylabel(r'$y$', fontsize=18)
ax.set_title('title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_57_0.png)


We can also change the global font size and font family, which applies to all text elements in a figure (tick labels, axis labels and titles, legends, etc.):


{% highlight python linenos  %}
# Update the matplotlib configuration parameters:
matplotlib.rcParams.update({'font.size': 18, 'font.family': 'serif'})
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.plot(x, x**2, label=r"$y = \alpha^2$")
ax.plot(x, x**3, label=r"$y = \alpha^3$")
ax.legend(loc=2) # upper left corner
ax.set_xlabel(r'$\alpha$')
ax.set_ylabel(r'$y$')
ax.set_title('title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_60_0.png)


A good choice of global fonts are the STIX fonts: 


{% highlight python linenos  %}
# Update the matplotlib configuration parameters:
matplotlib.rcParams.update({'font.size': 18, 'font.family': 'STIXGeneral', 'mathtext.fontset': 'stix'})
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.plot(x, x**2, label=r"$y = \alpha^2$")
ax.plot(x, x**3, label=r"$y = \alpha^3$")
ax.legend(loc=2) # upper left corner
ax.set_xlabel(r'$\alpha$')
ax.set_ylabel(r'$y$')
ax.set_title('title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_63_0.png)


Or, alternatively, we can request that matplotlib uses LaTeX to render the text elements in the figure:


{% highlight python linenos  %}
matplotlib.rcParams.update({'font.size': 18, 'text.usetex': True})
{% endhighlight %}


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.plot(x, x**2, label=r"$y = \alpha^2$")
ax.plot(x, x**3, label=r"$y = \alpha^3$")
ax.legend(loc=2) # upper left corner
ax.set_xlabel(r'$\alpha$')
ax.set_ylabel(r'$y$')
ax.set_title('title');
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_66_0.png)



{% highlight python linenos  %}
# restore
matplotlib.rcParams.update({'font.size': 12, 'font.family': 'sans', 'text.usetex': False})
{% endhighlight %}

### Setting colors, linewidths, linetypes

#### Colors

With matplotlib, we can define the colors of lines and other graphical elements in a number of ways. First of all, we can use the MATLAB-like syntax where `'b'` means blue, `'g'` means green, etc. The MATLAB API for selecting line styles are also supported: where, for example, 'b.-' means a blue line with dots:


{% highlight python linenos  %}
# MATLAB style line color and style 
ax.plot(x, x**2, 'b.-') # blue line with dots
ax.plot(x, x**3, 'g--') # green dashed line
{% endhighlight %}




    [<matplotlib.lines.Line2D at 0x4985810>]



We can also define colors by their names or RGB hex codes and optionally provide an alpha value using the `color` and `alpha` keyword arguments:


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.plot(x, x+1, color="red", alpha=0.5) # half-transparant red
ax.plot(x, x+2, color="#1155dd")        # RGB hex code for a bluish color
ax.plot(x, x+3, color="#15cc55")        # RGB hex code for a greenish color
{% endhighlight %}




    [<matplotlib.lines.Line2D at 0x4edbd10>]




![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_73_1.png)


#### Line and marker styles

To change the line width, we can use the `linewidth` or `lw` keyword argument. The line style can be selected using the `linestyle` or `ls` keyword arguments:


{% highlight python linenos  %}
fig, ax = plt.subplots(figsize=(12,6))

ax.plot(x, x+1, color="blue", linewidth=0.25)
ax.plot(x, x+2, color="blue", linewidth=0.50)
ax.plot(x, x+3, color="blue", linewidth=1.00)
ax.plot(x, x+4, color="blue", linewidth=2.00)

# possible linestype options ‘-‘, ‘–’, ‘-.’, ‘:’, ‘steps’
ax.plot(x, x+5, color="red", lw=2, linestyle='-')
ax.plot(x, x+6, color="red", lw=2, ls='-.')
ax.plot(x, x+7, color="red", lw=2, ls=':')

# custom dash
line, = ax.plot(x, x+8, color="black", lw=1.50)
line.set_dashes([5, 10, 15, 10]) # format: line length, space length, ...

# possible marker symbols: marker = '+', 'o', '*', 's', ',', '.', '1', '2', '3', '4', ...
ax.plot(x, x+ 9, color="green", lw=2, ls='*', marker='+')
ax.plot(x, x+10, color="green", lw=2, ls='*', marker='o')
ax.plot(x, x+11, color="green", lw=2, ls='*', marker='s')
ax.plot(x, x+12, color="green", lw=2, ls='*', marker='1')

# marker size and color
ax.plot(x, x+13, color="purple", lw=1, ls='-', marker='o', markersize=2)
ax.plot(x, x+14, color="purple", lw=1, ls='-', marker='o', markersize=4)
ax.plot(x, x+15, color="purple", lw=1, ls='-', marker='o', markersize=8, markerfacecolor="red")
ax.plot(x, x+16, color="purple", lw=1, ls='-', marker='s', markersize=8, 
        markerfacecolor="yellow", markeredgewidth=2, markeredgecolor="blue");
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_76_0.png)


### Control over axis appearance

The appearance of the axes is an important aspect of a figure that we often need to modify to make a publication quality graphics. We need to be able to control where the ticks and labels are placed, modify the font size and possibly the labels used on the axes. In this section we will look at controling those properties in a matplotlib figure.

#### Plot range

The first thing we might want to configure is the ranges of the axes. We can do this using the `set_ylim` and `set_xlim` methods in the axis object, or `axis('tight')` for automatrically getting "tightly fitted" axes ranges:


{% highlight python linenos  %}
fig, axes = plt.subplots(1, 3, figsize=(12, 4))

axes[0].plot(x, x**2, x, x**3)
axes[0].set_title("default axes ranges")

axes[1].plot(x, x**2, x, x**3)
axes[1].axis('tight')
axes[1].set_title("tight axes")

axes[2].plot(x, x**2, x, x**3)
axes[2].set_ylim([0, 60])
axes[2].set_xlim([2, 5])
axes[2].set_title("custom axes range");
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_81_0.png)


#### Logarithmic scale

It is also possible to set a logarithmic scale for one or both axes. This functionality is in fact only one application of a more general transformation system in Matplotlib. Each of the axes' scales are set seperately using `set_xscale` and `set_yscale` methods which accept one parameter (with the value "log" in this case):


{% highlight python linenos  %}
fig, axes = plt.subplots(1, 2, figsize=(10,4))
      
axes[0].plot(x, x**2, x, exp(x))
axes[0].set_title("Normal scale")

axes[1].plot(x, x**2, x, exp(x))
axes[1].set_yscale("log")
axes[1].set_title("Logarithmic scale (y)");
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_84_0.png)


### Placement of ticks and custom tick labels

We can explicitly determine where we want the axis ticks with `set_xticks` and `set_yticks`, which both take a list of values for where on the axis the ticks are to be placed. We can also use the `set_xticklabels` and `set_yticklabels` methods to provide a list of custom text labels for each tick location:


{% highlight python linenos  %}
fig, ax = plt.subplots(figsize=(10, 4))

ax.plot(x, x**2, x, x**3, lw=2)

ax.set_xticks([1, 2, 3, 4, 5])
ax.set_xticklabels([r'$\alpha$', r'$\beta$', r'$\gamma$', r'$\delta$', r'$\epsilon$'], fontsize=18)

yticks = [0, 50, 100, 150]
ax.set_yticks(yticks)
ax.set_yticklabels(["$%.1f$" % y for y in yticks], fontsize=18); # use LaTeX formatted labels
{% endhighlight %}




    [<matplotlib.text.Text at 0x5d75c90>,
     <matplotlib.text.Text at 0x585fe50>,
     <matplotlib.text.Text at 0x575c090>,
     <matplotlib.text.Text at 0x599e610>]




![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_87_1.png)


There are a number of more advanced methods for controlling major and minor tick placement in matplotlib figures, such as automatic placement according to different policies. See http://matplotlib.org/api/ticker_api.html for details.

#### Scientific notation

With large numbers on axes, it is often better use scientific notation:


{% highlight python linenos  %}
fig, ax = plt.subplots(1, 1)
      
ax.plot(x, x**2, x, exp(x))
ax.set_title("scientific notation")

ax.set_yticks([0, 50, 100, 150])

from matplotlib import ticker
formatter = ticker.ScalarFormatter(useMathText=True)
formatter.set_scientific(True) 
formatter.set_powerlimits((-1,1)) 
ax.yaxis.set_major_formatter(formatter) 
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_91_0.png)


### Axis number and axis label spacing


{% highlight python linenos  %}
# distance between x and y axis and the numbers on the axes
rcParams['xtick.major.pad'] = 5
rcParams['ytick.major.pad'] = 5

fig, ax = plt.subplots(1, 1)
      
ax.plot(x, x**2, x, exp(x))
ax.set_yticks([0, 50, 100, 150])

ax.set_title("label and axis spacing")

# padding between axis label and axis numbers
ax.xaxis.labelpad = 5
ax.yaxis.labelpad = 5

ax.set_xlabel("x")
ax.set_ylabel("y");
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_93_0.png)



{% highlight python linenos  %}
# restore defaults
rcParams['xtick.major.pad'] = 3
rcParams['ytick.major.pad'] = 3
{% endhighlight %}

#### Axis position adjustments

Unfortunately, when saving figures the labels are sometimes clipped, and it can be necessary to adjust the positions of axes a little bit. This can be done using `subplots_adjust`:


{% highlight python linenos  %}
fig, ax = plt.subplots(1, 1)
      
ax.plot(x, x**2, x, exp(x))
ax.set_yticks([0, 50, 100, 150])

ax.set_title("title")
ax.set_xlabel("x")
ax.set_ylabel("y")

fig.subplots_adjust(left=0.15, right=.9, bottom=0.1, top=0.9);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_97_0.png)


### Axis grid

With the `grid` method in the axis object, we can turn on and off grid lines. We can also customize the appearance of the grid lines using the same keyword arguments as the `plot` function:


{% highlight python linenos  %}
fig, axes = plt.subplots(1, 2, figsize=(10,3))

# default grid appearance
axes[0].plot(x, x**2, x, x**3, lw=2)
axes[0].grid(True)

# custom grid appearance
axes[1].plot(x, x**2, x, x**3, lw=2)
axes[1].grid(color='b', alpha=0.5, linestyle='dashed', linewidth=0.5)
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_100_0.png)


### Axis spines

We can also change the properties of axis spines:


{% highlight python linenos  %}
fig, ax = plt.subplots(figsize=(6,2))

ax.spines['bottom'].set_color('blue')
ax.spines['top'].set_color('blue')

ax.spines['left'].set_color('red')
ax.spines['left'].set_linewidth(2)

# turn off axis spine to the right
ax.spines['right'].set_color("none")
ax.yaxis.tick_left() # only ticks on the left side
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_103_0.png)


### Twin axes

Sometimes it is useful to have dual x or y axes in a figure; for example, when plotting curves with different units together. Matplotlib supports this with the `twinx` and `twiny` functions:


{% highlight python linenos  %}
fig, ax1 = plt.subplots()

ax1.plot(x, x**2, lw=2, color="blue")
ax1.set_ylabel(r"area $(m^2)$", fontsize=18, color="blue")
for label in ax1.get_yticklabels():
    label.set_color("blue")
    
ax2 = ax1.twinx()
ax2.plot(x, x**3, lw=2, color="red")
ax2.set_ylabel(r"volume $(m^3)$", fontsize=18, color="red")
for label in ax2.get_yticklabels():
    label.set_color("red")
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_106_0.png)


### Axes where x and y is zero


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.spines['right'].set_color('none')
ax.spines['top'].set_color('none')

ax.xaxis.set_ticks_position('bottom')
ax.spines['bottom'].set_position(('data',0)) # set position of x spine to x=0

ax.yaxis.set_ticks_position('left')
ax.spines['left'].set_position(('data',0))   # set position of y spine to y=0

xx = np.linspace(-0.75, 1., 100)
ax.plot(xx, xx**3);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_108_0.png)


### Other 2D plot styles

In addition to the regular `plot` method, there are a number of other functions for generating different kind of plots. See the matplotlib plot gallery for a complete list of available plot types: http://matplotlib.org/gallery.html. Some of the more useful ones are show below:


{% highlight python linenos  %}
n = array([0,1,2,3,4,5])
{% endhighlight %}


{% highlight python linenos  %}
fig, axes = plt.subplots(1, 4, figsize=(12,3))

axes[0].scatter(xx, xx + 0.25*randn(len(xx)))
axes[0].set_title("scatter")

axes[1].step(n, n**2, lw=2)
axes[1].set_title("step")

axes[2].bar(n, n**2, align="center", width=0.5, alpha=0.5)
axes[2].set_title("bar")

axes[3].fill_between(x, x**2, x**3, color="green", alpha=0.5);
axes[3].set_title("fill_between");
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_112_0.png)



{% highlight python linenos  %}
# polar plot using add_axes and polar projection
fig = plt.figure()
ax = fig.add_axes([0.0, 0.0, .6, .6], polar=True)
t = linspace(0, 2 * pi, 100)
ax.plot(t, t, color='blue', lw=3);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_113_0.png)



{% highlight python linenos  %}
# A histogram
n = np.random.randn(100000)
fig, axes = plt.subplots(1, 2, figsize=(12,4))

axes[0].hist(n)
axes[0].set_title("Default histogram")
axes[0].set_xlim((min(n), max(n)))

axes[1].hist(n, cumulative=True, bins=50)
axes[1].set_title("Cumulative detailed histogram")
axes[1].set_xlim((min(n), max(n)));
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_114_0.png)


### Text annotation

Annotating text in matplotlib figures can be done using the `text` function. It supports LaTeX formatting just like axis label texts and titles:


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.plot(xx, xx**2, xx, xx**3)

ax.text(0.15, 0.2, r"$y=x^2$", fontsize=20, color="blue")
ax.text(0.65, 0.1, r"$y=x^3$", fontsize=20, color="green");
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_117_0.png)


### Figures with multiple subplots and insets

Axes can be added to a matplotlib Figure canvas manually using `fig.add_axes` or using a sub-figure layout manager such as `subplots`, `subplot2grid`, or `gridspec`:

#### subplots


{% highlight python linenos  %}
fig, ax = plt.subplots(2, 3)
fig.tight_layout()
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_121_0.png)


#### subplot2grid


{% highlight python linenos  %}
fig = plt.figure()
ax1 = plt.subplot2grid((3,3), (0,0), colspan=3)
ax2 = plt.subplot2grid((3,3), (1,0), colspan=2)
ax3 = plt.subplot2grid((3,3), (1,2), rowspan=2)
ax4 = plt.subplot2grid((3,3), (2,0))
ax5 = plt.subplot2grid((3,3), (2,1))
fig.tight_layout()
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_123_0.png)


#### gridspec


{% highlight python linenos  %}
import matplotlib.gridspec as gridspec
{% endhighlight %}


{% highlight python linenos  %}
fig = plt.figure()

gs = gridspec.GridSpec(2, 3, height_ratios=[2,1], width_ratios=[1,2,1])
for g in gs:
    ax = fig.add_subplot(g)
    
fig.tight_layout()
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_126_0.png)


#### add_axes

Manually adding axes with `add_axes` is useful for adding insets to figures:


{% highlight python linenos  %}
fig, ax = plt.subplots()

ax.plot(xx, xx**2, xx, xx**3)
fig.tight_layout()

# inset
inset_ax = fig.add_axes([0.2, 0.55, 0.35, 0.35]) # X, Y, width, height

inset_ax.plot(xx, xx**2, xx, xx**3)
inset_ax.set_title('zoom near origin')

# set axis range
inset_ax.set_xlim(-.2, .2)
inset_ax.set_ylim(-.005, .01)

# set axis tick locations
inset_ax.set_yticks([0, 0.005, 0.01])
inset_ax.set_xticks([-0.1,0,.1]);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_129_0.png)


### Colormap and contour figures

Colormaps and contour figures are useful for plotting functions of two variables. In most of these functions we will use a colormap to encode one dimension of the data. There are a number of predefined colormaps. It is relatively straightforward to define custom colormaps. For a list of pre-defined colormaps, see: http://www.scipy.org/Cookbook/Matplotlib/Show_colormaps


{% highlight python linenos  %}
alpha = 0.7
phi_ext = 2 * pi * 0.5

def flux_qubit_potential(phi_m, phi_p):
    return 2 + alpha - 2 * cos(phi_p)*cos(phi_m) - alpha * cos(phi_ext - 2*phi_p)
{% endhighlight %}


{% highlight python linenos  %}
phi_m = linspace(0, 2*pi, 100)
phi_p = linspace(0, 2*pi, 100)
X,Y = meshgrid(phi_p, phi_m)
Z = flux_qubit_potential(X, Y).T
{% endhighlight %}

#### pcolor


{% highlight python linenos  %}
fig, ax = plt.subplots()

p = ax.pcolor(X/(2*pi), Y/(2*pi), Z, cmap=cm.RdBu, vmin=abs(Z).min(), vmax=abs(Z).max())
cb = fig.colorbar(p, ax=ax)
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_135_0.png)


#### imshow


{% highlight python linenos  %}
fig, ax = plt.subplots()

im = ax.imshow(Z, cmap=cm.RdBu, vmin=abs(Z).min(), vmax=abs(Z).max(), extent=[0, 1, 0, 1])
im.set_interpolation('bilinear')

cb = fig.colorbar(im, ax=ax)
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_137_0.png)


#### contour


{% highlight python linenos  %}
fig, ax = plt.subplots()

cnt = ax.contour(Z, cmap=cm.RdBu, vmin=abs(Z).min(), vmax=abs(Z).max(), extent=[0, 1, 0, 1])
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_139_0.png)


## 3D figures

To use 3D graphics in matplotlib, we first need to create an instance of the `Axes3D` class. 3D axes can be added to a matplotlib figure canvas in exactly the same way as 2D axes; or, more conveniently, by passing a `projection='3d'` keyword argument to the `add_axes` or `add_subplot` methods.


{% highlight python linenos  %}
from mpl_toolkits.mplot3d.axes3d import Axes3D
{% endhighlight %}

#### Surface plots


{% highlight python linenos  %}
fig = plt.figure(figsize=(14,6))

# `ax` is a 3D-aware axis instance because of the projection='3d' keyword argument to add_subplot
ax = fig.add_subplot(1, 2, 1, projection='3d')

p = ax.plot_surface(X, Y, Z, rstride=4, cstride=4, linewidth=0)

# surface_plot with color grading and color bar
ax = fig.add_subplot(1, 2, 2, projection='3d')
p = ax.plot_surface(X, Y, Z, rstride=1, cstride=1, cmap=cm.coolwarm, linewidth=0, antialiased=False)
cb = fig.colorbar(p, shrink=0.5)
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_144_0.png)


#### Wire-frame plot


{% highlight python linenos  %}
fig = plt.figure(figsize=(8,6))

ax = fig.add_subplot(1, 1, 1, projection='3d')

p = ax.plot_wireframe(X, Y, Z, rstride=4, cstride=4)
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_146_0.png)


#### Coutour plots with projections


{% highlight python linenos  %}
fig = plt.figure(figsize=(8,6))

ax = fig.add_subplot(1,1,1, projection='3d')

ax.plot_surface(X, Y, Z, rstride=4, cstride=4, alpha=0.25)
cset = ax.contour(X, Y, Z, zdir='z', offset=-pi, cmap=cm.coolwarm)
cset = ax.contour(X, Y, Z, zdir='x', offset=-pi, cmap=cm.coolwarm)
cset = ax.contour(X, Y, Z, zdir='y', offset=3*pi, cmap=cm.coolwarm)

ax.set_xlim3d(-pi, 2*pi);
ax.set_ylim3d(0, 3*pi);
ax.set_zlim3d(-pi, 2*pi);
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_148_0.png)


#### Change the view angle

We can change the perspective of a 3D plot using the `view_init` method, which takes two arguments: `elevation` and `azimuth` angle (in degrees):


{% highlight python linenos  %}
fig = plt.figure(figsize=(12,6))

ax = fig.add_subplot(1,2,1, projection='3d')
ax.plot_surface(X, Y, Z, rstride=4, cstride=4, alpha=0.25)
ax.view_init(30, 45)

ax = fig.add_subplot(1,2,2, projection='3d')
ax.plot_surface(X, Y, Z, rstride=4, cstride=4, alpha=0.25)
ax.view_init(70, 30)

fig.tight_layout()
{% endhighlight %}


![png]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_151_0.png)


### Animations

Matplotlib also includes a simple API for generating animations for sequences of figures. With the `FuncAnimation` function we can generate a movie file from sequences of figures. The function takes the following arguments: `fig`, a figure canvas, `func`, a function that we provide which updates the figure, `init_func`, a function we provide to setup the figure, `frame`, the number of frames to generate, and `blit`, which tells the animation function to only update parts of the frame which have changed (for smoother animations):

    def init():
        # setup figure

    def update(frame_counter):
        # update figure for new frame

    anim = animation.FuncAnimation(fig, update, init_func=init, frames=200, blit=True)

    anim.save('animation.mp4', fps=30) # fps = frames per second

To use the animation features in matplotlib we first need to import the module `matplotlib.animation`:


{% highlight python linenos  %}
from matplotlib import animation
{% endhighlight %}


{% highlight python linenos  %}
# solve the ode problem of the double compound pendulum again

from scipy.integrate import odeint

g = 9.82; L = 0.5; m = 0.1

def dx(x, t):
    x1, x2, x3, x4 = x[0], x[1], x[2], x[3]
    
    dx1 = 6.0/(m*L**2) * (2 * x3 - 3 * cos(x1-x2) * x4)/(16 - 9 * cos(x1-x2)**2)
    dx2 = 6.0/(m*L**2) * (8 * x4 - 3 * cos(x1-x2) * x3)/(16 - 9 * cos(x1-x2)**2)
    dx3 = -0.5 * m * L**2 * ( dx1 * dx2 * sin(x1-x2) + 3 * (g/L) * sin(x1))
    dx4 = -0.5 * m * L**2 * (-dx1 * dx2 * sin(x1-x2) + (g/L) * sin(x2))
    return [dx1, dx2, dx3, dx4]

x0 = [pi/2, pi/2, 0, 0]  # initial state
t = linspace(0, 10, 250) # time coordinates
x = odeint(dx, x0, t)    # solve the ODE problem
{% endhighlight %}

Generate an animation that shows the positions of the pendulums as a function of time:


{% highlight python linenos  %}
fig, ax = plt.subplots(figsize=(5,5))

ax.set_ylim([-1.5, 0.5])
ax.set_xlim([1, -1])

pendulum1, = ax.plot([], [], color="red", lw=2)
pendulum2, = ax.plot([], [], color="blue", lw=2)

def init():
    pendulum1.set_data([], [])
    pendulum2.set_data([], [])

def update(n): 
    # n = frame counter
    # calculate the positions of the pendulums
    x1 = + L * sin(x[n, 0])
    y1 = - L * cos(x[n, 0])
    x2 = x1 + L * sin(x[n, 1])
    y2 = y1 - L * cos(x[n, 1])
    
    # update the line data
    pendulum1.set_data([0 ,x1], [0 ,y1])
    pendulum2.set_data([x1,x2], [y1,y2])

anim = animation.FuncAnimation(fig, update, init_func=init, frames=len(t), blit=True)

# anim.save can be called in a few different ways, some which might or might not work
# on different platforms and with different versions of matplotlib and video encoders
#anim.save('animation.mp4', fps=20, extra_args=['-vcodec', 'libx264'], writer=animation.FFMpegWriter())
#anim.save('animation.mp4', fps=20, extra_args=['-vcodec', 'libx264'])
#anim.save('animation.mp4', fps=20, writer="ffmpeg", codec="libx264")
anim.save('animation.mp4', fps=20, writer="avconv", codec="libx264")

plt.close(fig)
{% endhighlight %}

Note: To generate the movie file we need to have either `ffmpeg` or `avconv` installed. Install it on Ubuntu using:

    $ sudo apt-get install ffmpeg

or (newer versions)

    $ sudo apt-get install libav-tools

On MacOSX, try: 

    $ sudo port install ffmpeg


{% highlight python linenos  %}
from IPython.display import HTML
video = open("animation.mp4", "rb").read()
video_encoded = video.encode("base64")
video_tag = '<video controls alt="test" src="data:video/x-m4v;base64,{0}">'.format(video_encoded)
HTML(video_tag)
{% endhighlight %}




<video controls alt="test" src="data:video/x-m4v;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQABllxtZGF0AAACrwYF//+r
3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjM4OSA5NTZjOGQ4IC0gSC4yNjQvTVBF
Ry00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4u
b3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFs
eXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVk
X3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBk
ZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTE4
IGxvb2thaGVhZF90aHJlYWRzPTIgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50
ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBi
X3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29w
PTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yMCBzY2VuZWN1dD00MCBpbnRyYV9y
ZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0w
LjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS4yNSBhcT0xOjEuMDAAgAAA
CE1liIQAO//+906/AptFl2oDklcK9sqkJlm5UmsB8qYAAAMAV9H+CyvrADACapK6ArKw5hT578uF
J69+Vayla3UdyN5CC5xj+zs07maJkq+X9ameCrcBxFJsPXR7Y/WWJKDMk7QpZAAAHAxwgRQr6faa
1eReGl2U3V5C/TjvCC6j0DhG0TN1kPjHhNIyxh54FeVrD6jYdH9ovZftXSTkSc8Z1RZi3xKnM9wQ
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
BQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAFAAAAAQAAAAIAAAABAAAAAAAAAAEAAAAB
AAAABAAAAAIAAAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAFAAAAAQAAAAIA
AAABAAAAAAAAAAEAAAABAAAAAQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEAAAAIAAAAAgAA
AAEAAAAFAAAAAQAAAAIAAAABAAAAAAAAAAEAAAABAAAAAQAAAAIAAAABAAAABQAAAAEAAAACAAAA
AQAAAAAAAAABAAAAAQAAAAEAAAAFAAAAAQAAAAIAAAABAAAAAAAAAAEAAAABAAAAAQAAAAUAAAAB
AAAAAgAAAAEAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAEAAAAEAAAAAQAAAAIAAAABAAAAAAAAAAQA
AAACAAAAAQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEAAAAEAAAAAgAAAAEAAAAFAAAAAQAA
AAIAAAABAAAAAAAAAAEAAAABAAAAAQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEAAAABAAAA
BQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAFAAAAAQAAAAIAAAABAAAAAAAAAAEAAAAB
AAAAAgAAAAIAAAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAFAAAAAQAAAAIA
AAABAAAAAAAAAAEAAAABAAAAAgAAAAIAAAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAA
AAEAAAACAAAAAQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEAAAABAAAABQAAAAEAAAACAAAA
AQAAAAAAAAABAAAAAQAAAAEAAAACAAAAAQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEAAAAB
AAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAQAAAACAAAAAQAAAAUAAAABAAAAAgAAAAEA
AAAAAAAAAQAAAAEAAAACAAAAAgAAAAEAAAAFAAAAAQAAAAIAAAABAAAAAAAAAAEAAAABAAAAAgAA
AAIAAAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAFAAAAAQAAAAIAAAABAAAA
AAAAAAEAAAABAAAAAQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAEAAAAF
AAAAAQAAAAIAAAABAAAAAAAAAAEAAAABAAAAAQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEA
AAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAMAAAACAAAAAQAAAAUAAAABAAAAAgAA
AAEAAAAAAAAAAQAAAAEAAAADAAAAAgAAAAEAAAAFAAAAAQAAAAIAAAABAAAAAAAAAAEAAAABAAAA
AQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEAAAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAAB
AAAAAQAAAAEAAAAFAAAAAQAAAAIAAAABAAAAAAAAAAEAAAABAAAAAgAAAAIAAAABAAAABQAAAAEA
AAACAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAFAAAAAQAAAAIAAAABAAAAAAAAAAEAAAABAAAAAQAA
AAIAAAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAIAAAACAAAAAQAAAAUAAAABAAAA
AgAAAAEAAAAAAAAAAQAAAAEAAAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAF
AAAAAQAAAAIAAAABAAAAAAAAAAEAAAABAAAAAQAAAAUAAAABAAAAAgAAAAEAAAAAAAAAAQAAAAEA
AAABAAAABQAAAAEAAAACAAAAAQAAAAAAAAABAAAAAQAAAAEAAAACAAAAHHN0c2MAAAAAAAAAAQAA
AAEAAAABAAAAAQAAA/xzdHN6AAAAAAAAAAAAAAD6AAALBAAAAesAAADsAAAAagAAALQAAAGgAAAB
oQAAAloAAAJEAAABgAAAAfsAAAEoAAABnQAAAbQAAAIDAAACLQAAAgAAAAHsAAABWgAAAXMAAAGU
AAABIQAAANsAAADeAAACegAAAfEAAAESAAAA/QAAAi8AAAGZAAABIAAAAZIAAAHDAAABewAAATMA
AAE/AAABfgAAAYsAAAG3AAACJQAAAisAAAIgAAABQgAAAU4AAAH3AAABWgAAAUkAAAEoAAAB+wAA
AXIAAADkAAABGAAAAjwAAAF3AAACLAAAAi4AAAG0AAACBwAAAhsAAAGnAAACJgAAAVoAAAFRAAAA
vwAAAhYAAAKVAAABygAAAQYAAACXAAABMQAAAJoAAABgAAAAVgAAAoYAAAHsAAAA7QAAAVQAAAIQ
AAAB1AAAAWQAAAFAAAABVgAAAV4AAAG7AAABhQAAAesAAAJSAAAB5QAAAUMAAAHrAAABcAAAAc8A
AAGJAAABPwAAAYwAAADHAAAA3gAAARkAAAJWAAACRwAAAR0AAAFqAAACNgAAAiAAAAHaAAABfwAA
AbYAAAH/AAAB0AAAAW8AAAEuAAABrAAAAlcAAAH1AAABvwAAAbYAAAF5AAACAAAAAZcAAAFTAAAB
xgAAAeIAAAFtAAAB5wAAAY8AAAEfAAABYAAAAXgAAAHAAAABGgAAASsAAAIyAAAByAAAAVcAAAHH
AAACXwAAAjMAAAG4AAABfgAAAXEAAAIlAAABsAAAAgoAAAEoAAABxQAAAYUAAAIXAAAB5AAAAZcA
AADSAAABUAAAAUQAAAGAAAABFgAAAlwAAAILAAAB3QAAAcoAAAHFAAAA2wAAAhsAAAHAAAABrwAA
AR4AAAIZAAABPQAAAVIAAAGkAAAA6gAAAc4AAAFUAAABaAAAAhkAAAG2AAAB/QAAAhYAAAFSAAAB
tgAAAWoAAAGQAAABuwAAAQ8AAAGOAAABagAAAR8AAAHUAAABtQAAAXMAAAE4AAABoAAAAe0AAAGy
AAACKgAAAjYAAAIFAAABpAAAAWcAAAFcAAABDwAAAQAAAAJSAAACTgAAAbwAAAGCAAACaAAAATwA
AAHAAAAA4wAAATIAAAGAAAABlgAAAaEAAAGdAAAB/AAAAewAAAHaAAABYQAAAYQAAAHxAAABdwAA
AesAAAE+AAAA2gAAAlAAAAGkAAABLAAAAaQAAAHHAAABogAAAj0AAAIGAAAB8wAAAaQAAAHRAAAC
GwAAAfoAAADFAAACPgAAAQYAAAC0AAAAbQAAAUwAAAChAAAAUgAAAIcAAAIRAAACQQAAAPUAAAGq
AAAB9QAAA/hzdGNvAAAAAAAAAPoAAAAwAAALNAAADR8AAA4LAAAOdQAADykAABDJAAASagAAFMQA
ABcIAAAYiAAAGoMAABurAAAdSAAAHvwAACD/AAAjLAAAJSwAACcYAAAocgAAKeUAACt5AAAsmgAA
LXUAAC5TAAAwzQAAMr4AADPQAAA0zQAANvwAADiVAAA5tQAAO0cAAD0KAAA+hQAAP7gAAED3AABC
dQAARAAAAEW3AABH3AAASgcAAEwnAABNaQAATrcAAFCuAABSCAAAU1EAAFR5AABWdAAAV+YAAFjK
AABZ4gAAXB4AAF2VAABfwQAAYe8AAGOjAABlqgAAZ8UAAGlsAABrkgAAbOwAAG49AABu/AAAcRIA
AHOnAAB1cQAAdncAAHcOAAB4PwAAeNkAAHk5AAB5jwAAfBUAAH4BAAB+7gAAgEIAAIJSAACEJgAA
hYoAAIbKAACIIAAAiX4AAIs5AACMvgAAjqkAAJD7AACS4AAAlCMAAJYOAACXfgAAmU0AAJrWAACc
FQAAnaEAAJ5oAACfRgAAoF8AAKK1AACk/AAAphkAAKeDAACpuQAAq9kAAK2zAACvMgAAsOgAALLn
AAC0twAAtiYAALdUAAC5AAAAu1cAAL1MAAC/CwAAwMEAAMI6AADEOgAAxdEAAMckAADI6gAAyswA
AMw5AADOIAAAz68AANDOAADSLgAA06YAANVmAADWgAAA16sAANndAADbpQAA3PwAAN7DAADhIgAA
41UAAOUNAADmiwAA5/wAAOohAADr0QAA7dsAAO8DAADwyAAA8k0AAPRkAAD2SAAA998AAPixAAD6
AQAA+0UAAPzFAAD92wABADcAAQJCAAEEHwABBekAAQeuAAEIiQABCqQAAQxkAAEOEwABDzEAARFK
AAEShwABE9kAARV9AAEWZwABGDUAARmJAAEa8QABHQoAAR7AAAEgvQABItMAASQlAAEl2wABJ0UA
ASjVAAEqkAABK58AAS0tAAEulwABL7YAATGKAAEzPwABNLIAATXqAAE3igABOXcAATspAAE9UwAB
P4kAAUGOAAFDMgABRJkAAUX1AAFHBAABSAQAAUpWAAFMpAABTmAAAU/iAAFSSgABU4YAAVVGAAFW
KQABV1sAAVjbAAFacQABXBIAAV2vAAFfqwABYZcAAWNxAAFk0gABZlYAAWhHAAFpvgABa6kAAWzn
AAFtwQABcBEAAXG1AAFy4QABdIUAAXZMAAF37gABeisAAXwxAAF+JAABf8gAAYGZAAGDtAABha4A
AYZzAAGIsQABibcAAYprAAGK2AABjCQAAYzFAAGNFwABjZ4AAY+vAAGR8AABkuUAAZSPAAAAYHVk
dGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAraWxzdAAA
ACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1NC4yMC4z
">



### Backends

Matplotlib has a number of "backends" which are responsible for rendering graphs. The different backends are able to generate graphics with different formats and display/event loops. There is a distinction between noninteractive backends (such as 'agg', 'svg', 'pdf', etc.) that are only used to generate image files (e.g. with the `savefig` function), and interactive backends (such as Qt4Agg, GTK, MaxOSX) that can display a GUI window for interactively exploring figures. 

A list of available backends are:


{% highlight python linenos  %}
print(matplotlib.rcsetup.all_backends)
{% endhighlight %}

    ['GTK', 'GTKAgg', 'GTKCairo', 'MacOSX', 'Qt4Agg', 'TkAgg', 'WX', 'WXAgg', 'CocoaAgg', 'GTK3Cairo', 'GTK3Agg', 'WebAgg', 'agg', 'cairo', 'emf', 'gdk', 'pdf', 'pgf', 'ps', 'svg', 'template']


The default backend, called `agg`, is based on a library for raster graphics which is great for generating raster formats like PNG.

Normally we don't need to bother with changing the default backend; but sometimes it can be useful to switch to, for example, PDF or GTKCairo (if you are using Linux) to produce high-quality vector graphics instead of raster based graphics. 

#### Generating SVG with the svg backend


{% highlight python linenos  %}
#
# RESTART THE NOTEBOOK: the matplotlib backend can only be selected before pylab is imported!
# (e.g. Kernel > Restart)
# 
import matplotlib
matplotlib.use('svg')
import matplotlib.pylab as plt
import numpy
from IPython.display import Image, SVG
{% endhighlight %}


{% highlight python linenos  %}
#
# Now we are using the svg backend to produce SVG vector graphics
#
fig, ax = plt.subplots()
t = numpy.linspace(0, 10, 100)
ax.plot(t, numpy.cos(t)*numpy.sin(t))
plt.savefig("test.svg")
{% endhighlight %}


{% highlight python linenos  %}
#
# Show the produced SVG file. 
#
SVG(filename="test.svg")
{% endhighlight %}




![svg]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_167_0.svg)



#### The IPython notebook inline backend

When we use IPython notebook it is convenient to use a matplotlib backend that outputs the graphics embedded in the notebook file. To activate this backend, somewhere in the beginning on the notebook, we add:

    %matplotlib inline

It is also possible to activate inline matplotlib plotting with:

    %pylab inline

The difference is that `%pylab inline` imports a number of packages into the global address space (scipy, numpy), while `%matplotlib inline` only sets up inline plotting. In new notebooks created for IPython 1.0+, I would recommend using `%matplotlib inline`, since it is tidier and you have more control over which packages are imported and how. Commonly, scipy and numpy are imported separately with:

    import numpy as np
    import scipy as sp
    import matplotlib.pyplot as plt

The inline backend has a number of configuration options that can be set by using the IPython magic command `%config` to update settings in `InlineBackend`. For example, we can switch to SVG figures or higher resolution figures with either:

    %config InlineBackend.figure_format='svg'
     
or:

    %config InlineBackend.figure_format='retina'
    
For more information, type:

    %config InlineBackend


{% highlight python linenos  %}
%matplotlib inline
%config InlineBackend.figure_format='svg'

import matplotlib.pylab as plt
import numpy
{% endhighlight %}


{% highlight python linenos  %}
#
# Now we are using the SVG vector graphics displaced inline in the notebook
#
fig, ax = plt.subplots()
t = numpy.linspace(0, 10, 100)
ax.plot(t, numpy.cos(t)*numpy.sin(t))
plt.savefig("test.svg")
{% endhighlight %}


![svg]({{site.baseurl}}/notebooks/learnpython//images/2015-04-15-lecture-4-matplotlib_files/2015-04-15-lecture-4-matplotlib_172_0.svg)


#### Interactive backend (this makes more sense in a python script file)


{% highlight python linenos  %}
#
# RESTART THE NOTEBOOK: the matplotlib backend can only be selected before pylab is imported!
# (e.g. Kernel > Restart)
# 
import matplotlib
matplotlib.use('Qt4Agg') # or for example MacOSX
import matplotlib.pylab as plt
import numpy
{% endhighlight %}


{% highlight python linenos  %}
# Now, open an interactive plot window with the Qt4Agg backend
fig, ax = plt.subplots()
t = numpy.linspace(0, 10, 100)
ax.plot(t, numpy.cos(t)*numpy.sin(t))
plt.show()
{% endhighlight %}

Note that when we use an interactive backend, we must call `plt.show()` to make the figure appear on the screen.

## Further reading

* http://www.matplotlib.org - The project web page for matplotlib.
* https://github.com/matplotlib/matplotlib - The source code for matplotlib.
* http://matplotlib.org/gallery.html - A large gallery showcaseing various types of plots matplotlib can create. Highly recommended! 
* http://www.loria.fr/~rougier/teaching/matplotlib - A good matplotlib tutorial.
* http://scipy-lectures.github.io/matplotlib/matplotlib.html - Another good matplotlib reference.


## Versions


{% highlight python linenos  %}
#%install_ext http://raw.github.com/jrjohansson/version_information/master/version_information.py
%load_ext version_information
%reload_ext version_information

%version_information numpy, scipy, matplotlib
{% endhighlight %}




<table><tr><th>Software</th><th>Version</th></tr><tr><td>Python</td><td>2.7.5+ (default, Feb 27 2014, 19:37:08) [GCC 4.8.1]</td></tr><tr><td>IPython</td><td>2.0.0</td></tr><tr><td>OS</td><td>posix [linux2]</td></tr><tr><td>numpy</td><td>1.8.1</td></tr><tr><td>scipy</td><td>0.13.3</td></tr><tr><td>matplotlib</td><td>1.3.1</td></tr><tr><td colspan='2'>Tue Apr 22 10:44:44 2014 JST</td></tr></table>


