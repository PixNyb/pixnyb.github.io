---
layout: default
title: Home
lang: en
translations:
  - url: /
    lang: nl
seo:
  canonical: /en/
centered: true
---

# Roël Couwenberg
{: .large }

{% capture scroller_content %}
<span>{% include icon.liquid icon="fas fa-cloud inline" %} Cloud</span>
<span>{% include icon.liquid icon="fas fa-code-commit inline" %} DevOps</span>
<span>{% include icon.liquid icon="fas fa-code-branch inline" %} GitOps</span>
<span>{% include icon.liquid icon="fas fa-code-merge inline" %} Collaboration</span>
<span>{% include icon.liquid icon="fas fa-code-compare inline" %} Legacy</span>
{% endcapture %}

{% include scroller.liquid content=scroller_content %}