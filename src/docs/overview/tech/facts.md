# Sherlock facts
{% if git.status -%}
<small>_as of {{ git.date.strftime("%B %Y") }}_</small>
{%- endif %}
{: style="margin-top: -2.5rem;"}

<style>
.facts { width: 50% }
@media screen and (max-width: 992px) {
    .facts {
        width: 100%;
        float: none !important;
    }
}
</style>

{% for category in facts if category.name != "partitions" %}
<div markdown="1" class="facts" style="float: {{ loop.cycle('left', 'right') }}">
## :fontawesome-solid-{{ category.icon|default(category.name) }}: {{ category.name|capitalize }}
  {% for field in category.fields -%}
    {%- set fmt = field.fmt|default("{:,}") %}
      {% if category.name == "storage" %}
   * **{{ field.value | round(-6) | filesizeformat }}**{: .number :} {{ field.name }}
      {% else %}
   * **{{ fmt.format(field.value) }}**{: .number :} {{ field.name }}
      {% endif %}
     {% if field.desc %}
     {{ field.desc }}
     {: .number_desc :}{% endif %}
  {% endfor %}
</div>
{{ loop.cycle('', '<div style="clear: both"></div>') }}
{% endfor %}

