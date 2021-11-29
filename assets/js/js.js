
$("#contact-form").submit((e) => {
  e.preventDefault();
  let formData = $("#contact-form").serializeArray();
  let alerts = true;
  formData.forEach(({ name, value }) => {
    if (value && name == "email" && !isEmail(value)){
      $(`#${name}`).html(`<p class='text-danger' >Please enter a valid email address</p>`)
      alerts = false;
    }
    if (value == false){
      $(`#${name}`).html(`<p class='text-danger'>${name.charAt(0).toUpperCase() + name.slice(1)} can not be empty</p>`);
      alerts = false;
    }
  });
  
  if (alerts == true) {
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

$("#emailInput").on("input", (e)=>{
    if(!isEmail(e.target.value) || e.target.value == ""){
        $("#email").html("<p class='text-danger' >Enter valid email.</p>");
    }
    if(isEmail(e.target.value)){
        $("#email").html("");
    }
});

function isEmail(email) {
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function onlyStringKey(evt) {
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (97<=ASCIICode && ASCIICode<=122 || 65<=ASCIICode && ASCIICode<=90 || ASCIICode == 32)
      return true;
    return false;
}

function onlyNumberKey(evt) {
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (48<=ASCIICode && ASCIICode <=57)
      return true;
    return false;
}

function noSpace(evt){
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode == 32)
        return false;
    return true;
}

function checkEmpty(id, self){
  if(self.value == false)
    $(`#${id}`).html(`<p class='text-danger'>${id.charAt(0).toUpperCase() + id.slice(1)} can not be empty</p>`);
  else
    $(`#${id}`).html("");
}