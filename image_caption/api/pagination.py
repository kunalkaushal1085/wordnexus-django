
from django.core.paginator import Paginator

def file_paginate(queryset, page, per_page=10):
    """
    Paginate a queryset if required, either returning a
    page object, or `[]` if pagination is not configured for this view.
    """
    queryset = queryset.order_by('id')  # Order by ID in ascending order

    paginator = Paginator(queryset, per_page)

    try:
        page = paginator.page(page)
    except Exception:
        return []

    return list(page)