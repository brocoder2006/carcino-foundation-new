from django.urls import path
from .views import (
    PublicPostListView,
    PublicPostDetailView,
    PublicCategoryListView,
    PublicCategoryDetailView,
    PublicTagListView,
    PublicSearchView,
    PublicCampaignListView,
    PublicPodcastListView,
    DashboardPostListCreateView,
    DashboardPostDetailView,
    DashboardPublishView,
    DashboardUnpublishView,
    DashboardScheduleView,
    DashboardPostRevisionsView,
    DashboardAnalyticsView,
    DashboardCategoryListCreateView,
    DashboardCategoryDetailView,
    DashboardTagListCreateView,
    DashboardTagDetailView,
    DashboardMediaListCreateView,
    DashboardMediaDetailView,
    DashboardCampaignListCreateView,
    DashboardCampaignDetailView,
    DashboardPodcastListCreateView,
    DashboardPodcastDetailView,
    MediaUploadView,
)

urlpatterns = [
    # Public endpoints
    path("posts/", PublicPostListView.as_view(), name="public-post-list"),
    path("posts/<slug:slug>/", PublicPostDetailView.as_view(), name="public-post-detail"),
    path("categories/", PublicCategoryListView.as_view(), name="public-category-list"),
    path("categories/<slug:slug>/", PublicCategoryDetailView.as_view(), name="public-category-detail"),
    path("tags/", PublicTagListView.as_view(), name="public-tag-list"),
    path("search/", PublicSearchView.as_view(), name="public-search"),
    path("campaigns/", PublicCampaignListView.as_view(), name="public-campaign-list"),
    path("podcasts/", PublicPodcastListView.as_view(), name="public-podcast-list"),

    # Dashboard endpoints
    path("dashboard/posts/", DashboardPostListCreateView.as_view(), name="dashboard-post-list-create"),
    path("dashboard/posts/<uuid:id>/", DashboardPostDetailView.as_view(), name="dashboard-post-detail"),
    path("dashboard/posts/<uuid:id>/publish/", DashboardPublishView.as_view(), name="dashboard-post-publish"),
    path("dashboard/posts/<uuid:id>/unpublish/", DashboardUnpublishView.as_view(), name="dashboard-post-unpublish"),
    path("dashboard/posts/<uuid:id>/schedule/", DashboardScheduleView.as_view(), name="dashboard-post-schedule"),
    path("dashboard/posts/<uuid:id>/revisions/", DashboardPostRevisionsView.as_view(), name="dashboard-post-revisions"),
    path("dashboard/analytics/", DashboardAnalyticsView.as_view(), name="dashboard-analytics"),
    path("dashboard/categories/", DashboardCategoryListCreateView.as_view(), name="dashboard-category-list-create"),
    path("dashboard/categories/<uuid:id>/", DashboardCategoryDetailView.as_view(), name="dashboard-category-detail"),
    path("dashboard/tags/", DashboardTagListCreateView.as_view(), name="dashboard-tag-list-create"),
    path("dashboard/tags/<uuid:id>/", DashboardTagDetailView.as_view(), name="dashboard-tag-detail"),
    path("dashboard/media/", DashboardMediaListCreateView.as_view(), name="dashboard-media-list-create"),
    path("dashboard/media/<uuid:id>/", DashboardMediaDetailView.as_view(), name="dashboard-media-detail"),
    path("dashboard/campaigns/", DashboardCampaignListCreateView.as_view(), name="dashboard-campaign-list-create"),
    path("dashboard/campaigns/<uuid:id>/", DashboardCampaignDetailView.as_view(), name="dashboard-campaign-detail"),
    path("dashboard/podcasts/", DashboardPodcastListCreateView.as_view(), name="dashboard-podcast-list-create"),
    path("dashboard/podcasts/<uuid:id>/", DashboardPodcastDetailView.as_view(), name="dashboard-podcast-detail"),

    # Media upload endpoint
    path("media/upload/", MediaUploadView.as_view(), name="media-upload"),
]

