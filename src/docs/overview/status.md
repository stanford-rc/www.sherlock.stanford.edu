<script src="//libraries.hund.io/status-js/status-2.1.1.js"></script>
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
</style>

## Components and services

Sherlock status is <span id="sh_status"></span>

For more details about Sherlock components and services, see the [status
dashboard][url_status].

[url_status]:  http://status.sherlock.stanford.edu


## Usage

<iframe
  src="https://srcc-lookout.stanford.edu/public/dashboard-solo/db/sherlock-public-dashboard?panelId=3&edit&theme=light"
  width="100%" height="200" frameborder="0">
</iframe>
