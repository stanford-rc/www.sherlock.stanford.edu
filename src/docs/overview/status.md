<script src="//libraries.hund.io/status-js/status-2.3.5-compat.js"></script>
<script>
  var statusWidget = new Status.Widget({
    hostname: "status.sherlock.stanford.edu",
    selector: "#sh_status",
    display: {
        ledPosition: "right",
    }
  });
</script>
<style>
.status-widget__state {
  font-size: 1.6rem;
}
.status-widget__led {
  height: 12px;
  width: 12px;
  border-radius: 12px;
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

!!! important "Next Maintenance"

    Wednesday, September 20, 2017, 9:00 am - 2:00 pm

[comment]: # (As needed to patch severe security vulnerabilities.)



[url_minsec]:  https://uit.stanford.edu/guide/securitystandards


## Components and services

Sherlock status is <span id="sh_status"></span>

For more details about Sherlock components and services, see the [status
dashboard][url_status].

[url_status]:  http://status.sherlock.stanford.edu

## Current usage

<iframe
  src="https://srcc-lookout.stanford.edu/public/dashboard-solo/db/sherlock-public-dashboard?panelId=3&edit&theme=light"
  width="100%" height="200" frameborder="0">
</iframe>
