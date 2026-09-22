import { defineField, defineType } from "sanity";

export const podcastType = defineType({
  name: "podcast",
  title: "Podcast Episode",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Episode Code (e.g. TCF 001)",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image Upload",
      type: "image",
      options: { hotspot: true },
      description: "Upload a cover image for this podcast episode",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "cover",
      title: "Cover Image Fallback Path/URL (Optional)",
      type: "string",
      description: "Static image URL or path (e.g. /Cover.png) if no image file is uploaded",
    }),
    defineField({
      name: "videoFile",
      title: "Video File Upload",
      type: "file",
      options: {
        accept: "video/*",
      },
      description: "Upload a podcast video file (MP4, WebM, etc.) directly",
    }),
    defineField({
      name: "videoUrl",
      title: "Video Stream URL (Optional)",
      type: "url",
      description: "External stream URL (e.g. CDN or video link) if no video file is uploaded",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "code",
      media: "coverImage",
    },
  },
});
