---
layout: page
title: "Distilling Information Reliability \n and Source Trustworthiness from Digital Traces"
categories: projects
date: 2016-10-17
author: "behzad_tabibian"
no_logo: true
redirect_from:
 - /distil_reliable_knowledge/
image:
 feature: "Reliability_screen.png"
excerpt: "In this work we use evaluation mechanisms in online knowledge platforms, like Wikipedia, to distill an interpretable measure of information reliability and source trustworthiness."
---
<div align="center">
{% include social-share.html %}
</div>
-----

|   |   |   |
| :------------- |:-------------:| -------------:|
| Behzad Tabibian       | Isabel Valera | Mehrdad Farajtabar |
| Le Song      | Bernhard Schölkopf     |   Manuel Gomez-Rodriguez  |

-----

<div class="notice .text-justify">
<p>
Online knowledge repositories typically rely on their users or dedicated editors to evaluate the reliability of their contents. These <i>explicit</i> feedback mechanisms can be viewed as noisy measurements of both information reliability and information source trustworthiness. Can we leverage these noisy measurements, often biased, to distill a robust, unbiased and interpretable measure of both notions?
</p>
<p>
In this paper, we argue that the large volume of digital traces left by the users within knowledge repositories also reflect information reliability and source trustworthiness. In particular, we propose a temporal point process modeling framework which links the <i>temporal</i> behavior of the users to information reliability and source
trustworthiness.
</p>
<p>
Furthermore, we develop an efficient convex optimization procedure to learn the parameters of the model from historical traces of the evaluations provided by these users. Experiments on real-world data gathered from <i>Wikipedia</i> and <i>Stack Overflow</i> show that our modeling framework accurately predicts evaluation events, provides an interpretable
measure of information reliability and source trustworthiness, and yields interesting insights about real-world events.
</p>
</div>

-----

|   |   |   |    |
| :-------------: |:-------------:|:-------------:| :-------------:|
| [<i class="fa fa-github-square fa-2x"></i>](https://onedrive.live.com/download?cid=712F893E56B9B053&resid=712F893E56B9B053%21105187&authkey=AOSpfWbzkkFlVek){: .btn .btn--success}  | [<i class="fa fa-file-pdf-o fa-2x"></i>](http://arxiv.org/abs/1610.07472){: .btn .btn--success}  | [<i class="fa fa-table fa-2x"></i>](https://onedrive.live.com/download?cid=712F893E56B9B053&resid=712F893E56B9B053%21105188&authkey=AIRYm2WFwWq7lCI){: .btn .btn--success} | [<i class="fa fa-slideshare fa-2x"></i>](https://onedrive.live.com/download?cid=712F893E56B9B053&resid=712F893E56B9B053%21106377&authkey=ALpQI7Sw7QYFc20){: .btn .btn--success}

-----

## Wikipedia Demo

### Domains

<p>
Explore site parameters by typing domain name in following text box.
</p>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
<script src="./js/chart.js"></script>
<script src="./js/requests.js"></script>

<p>
<form id="domainSearch" class=".generic-form" data-search-form >
  <input name="domainTxt" type="name" placeholder="Enter Domain name, for example bbc.co.uk, cnn.com, breitbart.com ..." data-search-input id="input-qt"/>
  <input type="submit"  id="query-sb" />
</form>
</p>
<div id="canvasContainerSource">
</div>

----

### Articles

<p>
Explore parameters of the model trained on Wikipedia corpus by typing title of an entry on Wikipedia in following text box.
</p>

<p>
<form id="articleSearch" class=".generic-form" data-search-form >
  <input name="articleTxt" type="name" placeholder="Enter Wikipedia article entry, for example Barack Obama, Prison Break,..." data-search-input id="input-qt"/>
  <input type="submit"  id="query-sb" />
</form>
</p>
<div id="canvasContainer">
</div>
