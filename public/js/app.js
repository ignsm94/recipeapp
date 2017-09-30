$(document).ready(() => {
  $(".delete-recipe").on("click", function() {
    let id = $(this).data("id");
    console.log($(this));
    let url = `/delete/${id}`;
    if (confirm("Delete recipe?")) {
      $.ajax({
        url: url,
        type: "DELETE"
      })
        .done((window.location.href = "/"))
        .fail(err => console.log(err));
    }
  });
});
