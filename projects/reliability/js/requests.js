kernelLocation = null;
topics = null;
$(function() {
  $(document).on("submit", "#articleSearch", function(e) {
    e.preventDefault();
    article_name = $("input[name=articleTxt]").val();
    if (kernelLocation == null) {
      retKernel = $.get("http://rel.is.tuebingen.mpg.de/kernels/removal", function(data) {
        kernelLocation = data['payload'][0];
      });
    }
    if (topics == null) {
      retTopics = $.get("http://rel.is.tuebingen.mpg.de/topic_titles/", function(data) {
        topics = data['payload'];
      });
    } else {
      retKernel = null;
      retTopics = null;
    }

    $.when(
      $.get("http://rel.is.tuebingen.mpg.de/articles/" + article_name + "?type=arrival", function(data) {
        arrival_data = data
      }),
      $.get("http://rel.is.tuebingen.mpg.de/articles/" + article_name + "?type=removal", function(data) {
        removal_data = data
      }),
      $.get("http://rel.is.tuebingen.mpg.de/articles_topics/" + article_name, function(data) {
        article_topics = data
      }), retKernel, retTopics).then(function() {
      if (arrival_data == null || removal_data == null) {
        alert("\'" + article_name + "\' is not available!");
        return;
      } else {
        plot(arrival_data, removal_data, article_topics['payload'], kernelLocation, topics);
      }
    });

    return false;
  });

  $(document).on("submit", "#domainSearch", function(e) {
    e.preventDefault();

    site_name = $("input[name=domainTxt]").val();
    if (topics == null) {
      retTopics = $.get("http://rel.is.tuebingen.mpg.de/topic_titles/", function(data) {
        topics = data['payload'];
      });
    } else {
      retKernel = null;
      retTopics = null;
    }

    $.when(
      $.get("http://rel.is.tuebingen.mpg.de/sites/" + site_name + "?type=arrival", function(data) {
        arrival_data = data
      }),
      $.get("http://rel.is.tuebingen.mpg.de/sites/" + site_name + "?type=removal", function(data) {
        removal_data = data
      }),
      retTopics).then(function() {
      if (arrival_data == null || removal_data == null) {
        alert("\'" + site_name + "\' is not available!");
        return;
      } else {
        plotDomain(arrival_data, removal_data, topics);
      }
    });

    return false;
  });
});