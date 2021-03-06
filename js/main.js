/*!
 * Item: CardX
 * Description: Modern Personal Portfolio / Resume / CV / vCard / HTML5 Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */
!(function (e) {
  "use strict";
  e(document).ready(function () {
    function t() {
      e(".overlay-block .overlay-close").trigger("click");
    }
    e(document).on("click", 'a[data-scroll][href^="#"]', function (t) {
      var a = e(".navbar").innerHeight(),
        o = e(this).attr("href"),
        n = e(o);
      0 !== n.length &&
        (t.preventDefault(),
        e("body, html").animate({ scrollTop: n.offset().top - a }, 600));
    }),
      e(window).on("scroll", function () {
        var t = e(".navbar");
        t.offset().top > 75
          ? t.addClass("scrolled")
          : t.removeClass("scrolled");
      }),
      e(".navbar .navbar-btn").animatedModal({
        animatedIn: "fadeIn",
        animatedOut: "fadeOut",
        animationDuration: ".15s",
        beforeOpen: function () {
          function t() {
            return {
              top:
                parseInt(e(".navbar").css("marginTop"), 10) +
                e(".navbar .navbar-btn").position().top,
              left: e(".navbar .navbar-btn").position().left,
            };
          }
          e(".overlay-block .overlay-close").css(t()),
            e(window).on("resize", function () {
              e(".overlay-block .overlay-close").css(t());
            });
        },
      }),
      e(document).on("keydown", function (a) {
        27 === a.keyCode &&
          e(".overlay-block").hasClass("overlay-block-on") &&
          t();
      }),
      e(".overlay-block .overlay-menu .nav-link").on("click", function () {
        t();
      }),
      e("body").scrollspy({
        target: ".overlay-menu",
        offset: e(".navbar").innerHeight() + 5,
      });
    var a,
      o,
      n = 2500,
      i = 660,
      r = 1500;
    function s(e) {
      var t = (function (e) {
        return e.is(":last-child") ? e.parent().children().eq(0) : e.next();
      })(e);
      e.parents(".cd-headline").hasClass("clip") &&
        e
          .parents(".cd-words-wrapper")
          .animate({ width: "2px" }, i, function () {
            var a;
            (a = t),
              e.removeClass("is-visible").addClass("is-hidden"),
              a.removeClass("is-hidden").addClass("is-visible"),
              (function (e, t) {
                e.parents(".cd-headline").hasClass("clip") &&
                  e
                    .parents(".cd-words-wrapper")
                    .animate({ width: e.width() + 10 }, i, function () {
                      setTimeout(function () {
                        s(e);
                      }, r);
                    });
              })(t);
          });
    }
    (a = e(".cd-headline")),
      (o = n),
      a.each(function () {
        var t = e(this);
        if (t.hasClass("clip")) {
          var a = t.find(".cd-words-wrapper"),
            n = a.width() + 10;
          a.css("width", n);
        }
        setTimeout(function () {
          s(t.find(".is-visible").eq(0));
        }, o);
      });
    var l = window.Shuffle,
      c = function (e) {
        (this.element = e),
          (this.shuffle = new l(e, {
            itemSelector: ".portfolio-area .shufflejs .single-item",
            sizer: e.querySelector(".portfolio-area .shufflejs .sizer-element"),
          })),
          (this._activeFilters = []),
          this.addFilterButtons();
      };
    (c.prototype.addFilterButtons = function () {
      var e = document.querySelector(".portfolio-area .filter-control");
      e &&
        Array.from(e.children).forEach(function (e) {
          e.addEventListener("click", this._handleFilterClick.bind(this), !1);
        }, this);
    }),
      (c.prototype._handleFilterClick = function (e) {
        var t = e.currentTarget.getAttribute("data-group");
        this.shuffle.filter(t);
      }),
      (window.shufflejs = new c(document.getElementById("shufflejs"))),
      e(".portfolio-area .filter-control>li").on("click", function () {
        e(this).addClass("tab-active").siblings().removeClass("tab-active");
      }),
      e(".portfolio-area .shufflejs .portfolio-item").each(function () {
        var t = e(this),
          a = t.attr("href");
        e(t).animatedModal({
          animatedIn: "fadeIn",
          animatedOut: "fadeOut",
          animationDuration: ".15s",
          beforeOpen: function () {
            e(a + ".lightbox-wrapper .lightbox-gallery").owlCarousel({
              loop: !0,
              margin: 10,
              nav: !1,
              items: 1,
              smartSpeed: 400,
            });
          },
          afterClose: function () {
            e(a + ".lightbox-wrapper .lightbox-gallery").trigger(
              "destroy.owl.carousel"
            );
          },
        });
      }),
      e(".testimonials-area .owl-carousel").owlCarousel({
        items: 1,
        loop: !0,
        margin: 0,
        nav: !1,
        smartSpeed: 400,
      }),
      e(".contact-form").on("submit", function (t) {
        var a = e(this),
          o = a.find("#contact-submit"),
          n = a.find(".contact-error");
        t.preventDefault(),
        setTimeout(function () {
            if(checkAllInputs(a.serializeArray())){
                o.html("Wait...").addClass("wait").prop("disabled", !0);
                $("#main-alert").html(`
                    <div class="spinner-grow spinner-grow-sm text-primary mb-2" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-primary mb-2" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-primary mb-2" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>`);
                e.ajax({
                  url: a.attr("action"),
                  type: "POST",
                  data: a.serialize(),
                }).done(function (e) {
                    $("#main-alert").html("");

                    "success" == e.result
                    ? (o.removeClass("wait").html("Success").addClass("success"),
                        setTimeout(function () {
                            o.html("Submit").removeClass("success");
                        }, 3e3),
                        a[0].reset())
                    : (o.removeClass("wait").html("Error").addClass("error"),
                        n.fadeIn(200),
                        setTimeout(function () {
                            o.html("Submit").removeClass("error").prop("disabled", !1),
                            n.fadeOut(200);
                        }, 6e3));
                });
            }
          },);
      }),
      e(window).trigger("scroll");
  }),
    e(window).on("load", function () {
      e(".preloader-icon, .preloader-brand").fadeOut(400),
        e(".preloader").delay(500).fadeOut("slow");
    });
})(jQuery);


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

// for mian submission
function checkAllInputs(datas){
    let alerts = true;
    datas.forEach(({name, value})=>{
        console.log();
        if (value && name == "email" && !isEmail(value)){
            $(`#${name}`).html(`<p class='text-danger' >Please enter a valid email address</p>`)
            alerts = false;
        }

        if (value == false){
            $(`#${name}`).html(`<p class='text-danger'>${name.charAt(0).toUpperCase() + name.slice(1)} can not be empty</p>`);
            alerts = false;
        }

        if(name ==  "name" && value != false && checkMinLength(name, value.length, 4))
            alerts = false;

        if(name ==  "phone" && value != false && checkMinLength(name, value.length, 10))
            alerts = false;

        if((name == "message" || name == "subject") && value != false && checkMinLength(name, value.length, 6))
            alerts = false;
    });

    return alerts;
}

// checks whenevet the input gets inputs.
function inputStatus(id, self){
    if(self.value == false){
        sayEmpty(id);
        return;
    }

    switch (id){
        case "name":
            checkMinLength(id, self.value.length, 4);
            break;

        case "phone":
            checkMinLength(id, self.value.length, 10);

            if(self.value.length > 10)
                self.value = $(`#${id}`).attr("data-phone");
            
            $(`#${id}`).attr("data-phone", self.value);
            break;

        case "email":
            if(!isEmail(self.value) || self.value == "")
                $("#email").html("<p class='text-danger' >Enter valid email.</p>");
            
            if(isEmail(self.value))
                $("#email").html("");
            break;

        case "subject":
            checkMinLength(id, self.value.length, 6);
            break;

        case "message":
            checkMinLength(id, self.value.length, 6);
            break;
        
        default:
            break;
    }
}
// helper functions
function sayEmpty(id){
    $(`#${id}`).html(`<p class='text-danger'>${id.charAt(0).toUpperCase() + id.slice(1)} can not be empty</p>`);
}
function isEmail(email) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
// for checking min-length.
function checkMinLength(id, length, minLength){
    if(length < minLength){
        $(`#${id}`).html(`<p class='text-danger'>min-length is ${minLength}</p>`);
        return true;
    }
    else{
        $(`#${id}`).html("");
        return false;
    }
}