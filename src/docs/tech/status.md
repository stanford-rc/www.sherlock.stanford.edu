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
  font-size: 1em;
  font-weight: bold;
}
.status-widget__led {
  height: 12px;
  width:  11px;
  margin-left: 5px;
}
.status-widget__issue {
  line-height: normal;
}
.status-widget__issue__title,
.status-widget__issue__body {
  padding: 5px 0;
}
</style>


!!! info "Scheduled maintenances"

    [Maintenance operations and upgrades][url_maintenances-and-upgrades] are
    scheduled on Sherlock on a regular basis.  Per the University's [Minimum
    Security policies][url_minsec], we deploy security patches on Sherlock as
    required for compliance.

## Components and services

Sherlock status is <span id="sh_status"></span>

For more details about Sherlock components and services, see the [status
dashboard][url_status].

## Current usage

<iframe style="float:left;"
  src="https://srcc-lookout.stanford.edu/public/d-solo/000000006/sherlock-public-graphs?orgId=1&refresh=5m&theme=light&panelId=3"
  width="28%" height="200px" frameborder="0">
</iframe>
<iframe style="float:right;"
  src="https://srcc-lookout.stanford.edu/public/d-solo/000000006/sherlock-public-graphs?orgId=1&refresh=5m&theme=light&panelId=11"
  width="68%" height="200px" frameborder="0">
</iframe>


[comment]: #  (link URLs -----------------------------------------------------)

[url_minsec]:  https://uit.stanford.edu/guide/securitystandards
[url_status]:  https://status.sherlock.stanford.edu
[url_maintenances-and-upgrades]: /docs/concepts/#maintenances-and-upgrades

--8<--- "includes/_acronyms.md"
