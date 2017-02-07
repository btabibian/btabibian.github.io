kernelLocation = null;
$(function() {
  $(document).on("submit", "#articleSearch",function(e) {
    e.preventDefault();
    article_name = $( "input:first" ).val();
    if (kernelLocation == null) {
      retKernel = $.get("http://rel.is.tuebingen.mpg.de/kernels/removal", function(data){
        kernelLocation= data['payload'][0];
      });
    }
    else{
      retKernel = null;
    }

    $.when(
    $.get("http://rel.is.tuebingen.mpg.de/articles/"+article_name+"?type=arrival", function(data){
      arrival_data= data
    }),
    $.get("http://rel.is.tuebingen.mpg.de/articles/"+article_name+"?type=removal", function(data){
      removal_data= data
    }),retKernel).then(function() {
       if (arrival_data == null || removal_data == null){
         alert("\'"+article_name+"\' is not available!");
         return ;
       }
       else{
         plot(arrival_data,removal_data,kernelLocation);
       }
    });

    return false;
  });
});
