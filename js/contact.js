const beforeBtnS = (btn) => {
  let btnHtml = btn.html();
  let btnAttr = btn.attr("btn_load") ? btn.attr("btn_load") : "Please wait...";
  btn.html(
    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${
      btnAttr ? btnAttr : "Please wait..."
    }`
  );
  btn.attr("btnData", btnHtml);
  btn.attr("disabled", true);
};
const RevertBtnS = (btn) => {
  let btnAttr = btn.attr("btnData");
  btn.attr("disabled", false);
  btn.html(btnAttr);
};
function validateFormS($form) {
  $form.find(".err").html("");
  let spanErs = $form.attr("spanErs") ? 0 : 1;
  let onlyBorder = $form.attr("onlyBorder") ? 0 : 1;
  let fullErs = $form.attr("fullErs") ? 0 : 1;
  $form.find(".respHere").html("");
  var btn = true;
  let allError = "";
  $form.find('[vali="yes"]').each(function () {
    if ($.trim($(this).val()) == "") {
      onlyBorder && $(this).css("border", "1px solid red");
      let $err = $(this).parent().find(".err");
      let errmsg = "";
      if ($err.attr("data")) errmsg = $err.attr("data");
      else errmsg = $(this).attr("name") + " is missing";
      allError += "<li>" + errmsg + "</li>";
      spanErs &&
        $(this)
          .parent()
          .find(".err")
          .html("<div class='alert alert-danger'>" + errmsg + "</div>");
      btn = false;
    } else {
      $(this).css("border", "1px solid #dfdfdf");
    }
  });
  if (!btn && fullErs)
    $form
      .find(".respHere")
      .html("<ul class='alert alert-danger'>" + allError + "</ul>");
  return btn;
}

$(document).ready(function () {
  $("body").on("submit", ".sendMail", function () {
    let $form = $(this);
    var btn = validateFormS($form);
    if (btn) {
      let afterCall = $form.attr("afterCall");
      let params = new FormData(this);
      var converdata = $form.serializeArray();
      $.each(converdata, function (ind, val) {
        let name = val["name"];
        let value = val["value"];
        params[name] = value;
      });
      $.ajax({
        type: "POST",
        url: $form.attr("action"),
        beforeSend: function () {
          beforeBtnS($form.find('button[type="submit"]'));
        },
        data: params,
        contentType: false,
        cache: false,
        processData: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
          if (afterCall) {
            let callThis = eval(afterCall);
            callThis($form, response, fetchCapcha);
          } else {
            if (response == "done") {
              $form
                .find(".respHere")
                .html(
                  `<div style='position:relative;padding:1rem 1rem;margin-bottom:1rem;border:1px solid transparent;border-radius:.25rem; color:#0f5132;background-color:#d1e7dd;border-color:#badbcc;'>We appreciate you contacting TAT:VM.<br> One of our colleagues will get in touch with you soon! Have a great day!</div>`
                );
              $form.find("input").val("");
              $form.find("textarea").val("");
            } else {
              $form
                .find(".respHere")
                .html(
                  `<div style='position:relative;padding:1rem 1rem;margin-bottom:1rem;border:1px solid transparent;border-radius:.25rem; color:#842029;background-color:#f8d7da;border-color:#f5c2c7;'>${response}</div>`
                );
            }
          }
          RevertBtnS($form.find('button[type="submit"]'));
        },
      });
    }
    return false;
  });
});
