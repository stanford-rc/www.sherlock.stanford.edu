<script src="//libraries.hund.io/status-js/status-3.5.0.js"></script>
<script>
  var statusWidget = new Status.Widget({
    hostname: "status.sherlock.stanford.edu",
    selector: "#sh_status",
    display: {
        ledPosition: "left",
    }
  });
</script>
<style>
.status-widget__state {
  font-size: 1.6rem;
}
.status-widget__led {
  height: 12px;
  width:  11px;
}
.status-widget__issue {
  line-height: normal;
}
.status-widget__issue__title,
.status-widget__issue__body {
  padding: 5px 0;
}
</style>

## Scheduled maintenances

[Maintenance operations and upgrades](concepts#maintenances-and-upgrades) are
scheduled on Sherlock on a regular basis.  Per the University's [Minimum
Security policies][url_minsec], we deploy security patches on Sherlock as
required for compliance.


[url_minsec]:  https://uit.stanford.edu/guide/securitystandards


## Components and services

Sherlock status is <span id="sh_status"></span>

For more details about Sherlock components and services, see the [status
dashboard][url_status].

[url_status]:  https://status.sherlock.stanford.edu

## Current usage

<iframe
  src="https://srcc-lookout.stanford.edu/public/dashboard-solo/db/sherlock-public-dashboard?panelId=3&theme=light"
  width="28%" height="200px" frameborder="0">
</iframe>
<iframe
  src="https://srcc-lookout.stanford.edu/public/dashboard-solo/db/sherlock-public-dashboard?panelId=4&theme=light"
  width="68%" height="200px" frameborder="0">
</iframe>
