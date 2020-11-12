# Sherlock <small>by the numbers</small>
{% if git.status -%}
<small>_as of {{ git.date.strftime("%B %Y") }}_</small>
{%- endif %}
{: style="margin-top: -2.5rem;"}


{% for category in numbers if category.name != "partitions" %}
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

{% endfor %}



