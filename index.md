---
layout: default
title: Home
lang: nl
translations:
  - url: /en/
    lang: en
seo:
  canonical: /
centered: true
---

# Roël Couwenberg
{: .large }

{% capture scroller_content %}
<span>{% include icon.liquid icon="fas fa-cloud inline" %} Cloud</span>
<span>{% include icon.liquid icon="fas fa-code-branch inline" %} DevOps</span>
<span>{% include icon.liquid icon="fas fa-earth-europe inline" %} Web</span>
{% endcapture %}

{% include scroller.liquid content=scroller_content %}