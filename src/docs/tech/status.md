---
icon: material/pulse
tags:
    - tech
---

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


!!! info "Scheduled maintenance"

    [Maintenance operations and upgrades][url_maintenance-and-upgrades] are
    scheduled on Sherlock on a regular basis. Per the University's [Minimum
    Security policies][url_minsec], we deploy security patches on Sherlock as
    required for compliance.

## Components and services

Sherlock status is <span id="sh_status"></span>

For more details about Sherlock components and services, see the [status
dashboard][url_status].

## Current usage

<iframe class="grafana-panel" title="CPUs in use" style="float:left;"
  data-src="https://srcc-lookout.stanford.edu/public/d-solo/000000006/sherlock-public-graphs?orgId=1&refresh=5m&panelId=3"
  width="28%" height="200px" frameborder="0">
</iframe>
<iframe class="grafana-panel" title="CPU usage" style="float:right;"
  data-src="https://srcc-lookout.stanford.edu/public/d-solo/000000006/sherlock-public-graphs?orgId=1&refresh=5m&panelId=11"
  width="68%" height="200px" frameborder="0">
</iframe>
<div style="clear:both; margin-bottom:2rem;"></div>
<script>
(function() {
  function getGrafanaTheme() {
    var scheme = document.body.getAttribute('data-md-color-scheme');
    if (scheme === 'slate') return 'dark';
    if (scheme) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function updateGrafanaTheme() {
    var theme = getGrafanaTheme();
    document.querySelectorAll('.grafana-panel').forEach(function(el) {
      var url = new URL(el.getAttribute('data-src'));
      url.searchParams.set('theme', theme);
      if (el.src !== url.toString()) el.src = url.toString();
    });
  }
  updateGrafanaTheme();
  new MutationObserver(updateGrafanaTheme).observe(
    document.body,
    { attributes: true, attributeFilter: ['data-md-color-scheme'] }
  );
})();
</script>


[comment]: #  (link URLs -----------------------------------------------------)

[url_minsec]:                   //uit.stanford.edu/guide/securitystandards
[url_status]:                   //status.sherlock.stanford.edu

[url_maintenance-and-upgrades]:../concepts.md#maintenance-and-upgrades

--8<--- "includes/_acronyms.md"
