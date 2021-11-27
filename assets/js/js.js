
    $("#contact-form").submit((e) => {
      e.preventDefault();
      let formData = $("#contact-form").serializeArray();
      let alerts_details = [];
      let alerts = "";

      formData.forEach(({ name, value }) => {
        if (value == false)
          alerts_details.push(`"${name.charAt(0).toUpperCase() + name.slice(1)}" field is empty.`);

        if (value && name == "email" && !isEmail(value))
          alerts_details.push("Please enter a valid email address");
      });

      alerts_details.forEach((value) => {
        alerts += `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <em>${value}</em>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
      });

      if (alerts) {
        $("#main-alert").html(alerts);
        alerts = "";
      } else {
        $("#main-alert").html(`
              <div class="spinner-grow spinner-grow-sm text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow spinner-grow-sm text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow spinner-grow-sm text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>`);
        $.ajax({
          type: "post",
          url: "https://script.google.com/macros/s/AKfycbx_kA9qYtsPCifMHioiJfKaoBpyYtB8besGmRGXrb3kC6LJ5vMr8tabm07lQT4vls-u/exec",
          data: $("#contact-form").serialize(),
          success: function (response) {
            $("#main-alert").html(`
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Details Successfully submitted</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
            `);
            $("#contact-form").trigger('reset');
          },
          error:function (error){              
            $("#main-alert").html(`
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <em>Submission failed.</em>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
            `);
          }
        });
      }

    })

$("#email").on("input", (e)=>{
    if(!isEmail(e.target.value)){
        $("#phoneDiv").html("<p class='text-danger' >Enter valid email.</p>");
    }
    if(isEmail(e.target.value) || ! e.target.value){
        $("#phoneDiv").html("");
    }
});

function isEmail(email) {
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function onlyStringKey(evt) {
    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (97<=ASCIICode && ASCIICode<=127 || 65<=ASCIICode && ASCIICode<=90)
        return true;
    return false;
}

function onlyNumberKey(evt) {
    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

function noSpace(evt){
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode == 32)
        return false;
    return true;
}