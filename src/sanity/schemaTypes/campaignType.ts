import { LaunchIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const campaignType = defineType({
  name: "campaign",
  title: "Carcino Pathway Campaign",
  type: "document",
  icon: LaunchIcon,
  fields: [
    defineField({
      name: "title",
      title: "Campaign Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pathwayStage",
      title: "Carcino Pathway Stage",
      type: "string",
      description: "Select which stage of the Carcino Pathway this campaign belongs to",
      options: {
        list: [
          { title: "Stage 01: Clinical Navigation (TCF PATHWAY)", value: "stage-01" },
          { title: "Stage 02: Integrative Care (TCF ADVOCACY)", value: "stage-02" },
          { title: "Stage 03: Moderated Spaces (TCF CONNECTION)", value: "stage-03" },
          { title: "Stage 04: Survivorship Plans (TCF VOICES)", value: "stage-04" },
          { title: "General Flagship Campaign", value: "general-flagship" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "status",
      title: "Campaign Status",
      type: "string",
      options: {
        list: [
          { title: "Active / Live", value: "active" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Completed / Archived", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "active",
    }),
    defineField({
      name: "summary",
      title: "Campaign Short Summary",
      type: "text",
      description: "A short, engaging description for cards and previews",
    }),
    defineField({
      name: "bannerImage",
      title: "Campaign Banner Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "actionUrl",
      title: "Call to Action / Registration Link (URL)",
      type: "url",
      description: "Optional URL for campaign participation or registration form",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
    }),
    defineField({
      name: "organizer",
      title: "Organizer / Lead Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "body",
      title: "Campaign Details & Body Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pathwayStage",
      media: "bannerImage",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection;
      const stageMap: Record<string, string> = {
        "stage-01": "Stage 01: Clinical Navigation",
        "stage-02": "Stage 02: Integrative Care",
        "stage-03": "Stage 03: Moderated Spaces",
        "stage-04": "Stage 04: Survivorship Plans",
        "general-flagship": "Flagship Campaign",
      };
      const stageName = subtitle ? stageMap[subtitle] || subtitle : "Pathway Campaign";
      const statusLabel = status ? ` [${status.toUpperCase()}]` : "";
      return {
        title,
        subtitle: `${stageName}${statusLabel}`,
        media,
      };
    },
  },
});
