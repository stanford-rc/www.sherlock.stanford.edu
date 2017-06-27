<script src="//libraries.hund.io/status-js/status-2.2.1-compat.js"></script>
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

!!! important "Next Maintenance"
    As needed to patch severe security vulnerabilities.

Monthly full-day maintenance returns in July 2017 with the "go live" of Sherlock 2.0

See [this page](concepts#maintenances-and-upgrades) for more information about
maintenances and upgrades. Per the University's [Minimum Security
policies][url_minsec], we deploy security patches on Sherlock as required for
compliance.


[url_minsec]:  https://uit.stanford.edu/guide/securitystandards


## Components and services

Sherlock status is <span id="sh_status"></span>

For more details about Sherlock components and services, see the [status
dashboard][url_status].

<iframe src="https://status.sherlock.stanford.edu"
  width="100%" height="200" frameborder="0">
</iframe>

[url_status]:  http://status.sherlock.stanford.edu



## Usage

<iframe
  src="https://srcc-lookout.stanford.edu/public/dashboard-solo/db/sherlock-public-dashboard?panelId=3&edit&theme=light"
  width="100%" height="200" frameborder="0">
</iframe>
