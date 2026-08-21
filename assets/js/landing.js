// navbar display
!function(t) {
    "use strict";
    t("a.page-scroll").bind("click", function(a) {
        var e = t(this)
          , o = e.attr("href");
        "undefined" != typeof o && o.startsWith("#") && (t("html, body").stop().animate({
            scrollTop: t(o).offset().top - 50
        }, 1250, "easeInOutExpo"),
        a.preventDefault())
    }),
    t("body").scrollspy({
        target: ".navbar-fixed-top",
        offset: 51
    }),
    t(".navbar-collapse ul li a").click(function() {
        t(".navbar-toggle:visible").click()
    }),
    t("#mainNav").affix({
        offset: {
            top: 100
        }
    })
}(jQuery);


// Freshdesk widget
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("nav-support").addEventListener("click", function(){
        FreshworksWidget('clear', 'ticketForm');
        FreshworksWidget('open');
        FreshworksWidget('prefill', 'ticketForm', {
            system: 'Sherlock' });
    });
    [].forEach.call(document.getElementsByClassName("account"),
        function(el) {
            el.addEventListener("click", function() {
            frw_account();
          })
        });
});

function frw_account() {
    FreshworksWidget('hide', 'ticketForm', ['attachment-container']);
    FreshworksWidget('prefill', 'ticketForm', {
        subject: 'Sherlock account request',
        type: 'Account creation',
        confirmation: "Thanks! We'll be in touch soon.",
        description: "Hi! \n\nI'd like to request an account on Sherlock. \n" +
                     "I understand I'll need to get approval from a " +
                     "sponsoring Faculty member."
    });
    FreshworksWidget('open');
}

window.fwSettings={ 'widget_id':47000001678, };
!function(){ if("function"!=typeof window.FreshworksWidget){
        var n=function(){n.q.push(arguments)};
        n.q=[],window.FreshworksWidget=n } }()


// status widget
var statusWidget = new Status.Widget({
    hostname: "status.sherlock.stanford.edu",
    selector: "#status-widget",
    debug: true,
    outOfOffice: true,
    paneStatistics: false,
    display: {
        hideOnError: true,
        ledOnly: true,
        panePosition: "bottom-right",
        outOfOffice: {
          officeOpenHour: 18,
          officeCloseHour: 19,
          timezone: "America/Los_Angeles"
        }
    }
});

