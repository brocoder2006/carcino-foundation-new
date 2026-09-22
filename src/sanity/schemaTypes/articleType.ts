import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Medical Insights",
          "Survivor Stories",
          "Caregiver Guide",
          "Wellness & Recovery",
        ],
      },
    }),
    defineField({ name: "readTime", title: "Read Time (e.g. 5 min read)", type: "string" }),
    defineField({ name: "date", title: "Published Date", type: "string" }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "desc", title: "Short Description", type: "text" }),
    defineField({
      name: "mainImage",
      title: "Main Image",
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
    defineField({ name: "content", title: "Content", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
