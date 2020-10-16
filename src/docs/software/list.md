# Software list

The full list of software centrally installed and managed on Sherlock is in the
tables below.

!!! todo "Work in progress"

    Software installations on Sherlock are an ever ongoing process. We're
    continuously adding new software to the list. If you're looking for
    something that is not in the list, please take a look
    [here][url_installations] for options.

## Categories

Software modules on Sherlock are organized in *categories*, by scientific field
or functional class. It means that you will have to first load a category
module before getting access to individual modules.  The `math` and `devel`
categories are loaded by default. See the [Modules page][url_modules] for
further details and examples.

{% set all_packages =  software_modules.categories |
                       map(attribute='packages') | sum(start=[]) %}

{% set all_fields   =  all_packages |
                       unique(attribute='categories') | list %}

_We currently provide {{ all_packages | count }} software modules, in {{
software_modules.categories | count }} categories, covering {{ all_fields |
count }} fields of science:_


{% for c in software_modules.categories|sort(attribute='name') %}
* [`{{ c.name }}`](#{{ c.name }}) <small>
    {{ c.packages | map(attribute='categories')
                  | map('replace', c.name ~ ', ', '')
                  | unique | sort | join(', ') }}
  </small>
{% endfor %}

!!! warning "Licensed software"

    Access to software modules marked with ^<b class="lic"></b>^ in the tables
    below is restricted to properly licensed user groups.

    SRCC is not funded to provide commercial software on Sherlock and
    researchers are responsible for the costs of purchasing and renewing
    commercial software licenses. For more information, please feel free to
    [contact us](mailto:{{ support_email }}) and see the [Stanford
    Software Licensing page](https://uit.stanford.edu/service/softwarelic) for
    purchasing information.


!!! tip "Additional flags and features"

    Some of the modules listed below have been built to support specific
    architectures or parallel execution modes:

      * versions marked with ^<b class="gpu"></b>^ support GPU acceleration
      * versions marked with ^<b class="mpi"></b>^ support MPI parallel
        execution
      * versions marked with ^<b class="def"></b>^ are the default version for
        the module

<!-- color styles for module properties -->
<style>
.mpi  { color: darkblue; }
.gpu  { color: darkgreen; }
.lic  { color: darkred; }
.def  { color: gray; }
.mpi:after { content: "mpi" }
.gpu:after { content: "gpu" }
.lic:after { content: "lic" }
.def:after { content: "def" }
</style>



{# macros_info() #}


{% set h_name = '<img style="float:left;min-width:110px;visibility:hidden"/>Module&nbsp;name' %}
{% set h_vers = '<img style="float:left;min-width:90px;visibility:hidden"/>Version(s)' %}

{% macro version_properties(v) -%}
    {%- if v.markedDefault is true -%}^<b class="def"></b>^{%- endif -%}
    {%- if v.properties -%}
        {%- if v.properties.arch     and v.properties.arch.gpu     -%}^<b class="gpu"></b>^{%- endif -%}
        {%- if v.properties.parallel and v.properties.parallel.mpi -%}^<b class="mpi"></b>^{%- endif -%}
        {%- if v.properties.license  and v.properties.license.restricted -%}^<b class="lic"></b>^{%- endif -%}
    {%- endif -%}
{%- endmacro %}

{% macro module_line(p) -%}
    **{{ p.categories.split(',') | last | trim }}** | <a id="{{ p.package }}">`
    {{- p.package }}`</a> |
    {%- for v in p.versions -%}
      `{{ v.versionName }}`{{ version_properties(v) }}<br/>
    {%- endfor -%}
    | [Website]({{ p.url }}) | {{ p.description }}
{%- endmacro %}


{% for c in software_modules.categories|sort(attribute='name') %}
### **`{{ c.name  }}`**

Field | {{ h_name }} | {{ h_vers }} | URL | Description
:---- | :----------- | :----------- | :-- | :----------
  {% for p in c.packages | sort(attribute="categories,package") -%}
    {{ module_line(p) }}
  {% endfor -%}

{% endfor %}


[comment]: #  (link URLs -----------------------------------------------------)

[url_modules]:         /docs/software/modules/
[url_installations]:   /docs/software#installation-requests

--8<--- "includes/_acronyms.md"
