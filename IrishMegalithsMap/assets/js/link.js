



$("#clearAll").click(function(event) {
  event.preventDefault();

  $(".check").each(function(i, el) {
    el.checked = false; // Set new status (unchecked) first.
    $(el).change(); // Trigger the event.
  })
});

$(".check").change(function() {
  var layerClicked = $(this).attr("id");
  switch (layerClicked) {
    
case "PassageTombs": toggleLayer(this.checked, PassageTombs); break;









  }
});



