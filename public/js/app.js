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

  $(".edit-recipe").on("click", function() {
    $("#edit-form-id").val($(this).data("id"));
    $("#edit-form-name").val($(this).data("name"));
    $("#edit-form-ingredients").val($(this).data("ingredients"));
    $("#edit-form-descr").val($(this).data("description"));
  });
});
