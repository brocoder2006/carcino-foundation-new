import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function estimateReadingTime(content: any): number {
  if (!content) return 1;
  let text = "";

  function extractText(node: any) {
    if (!node) return;
    if (typeof node === "string") {
      text += " " + node;
    } else if (node.text) {
      text += " " + node.text;
    }
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(extractText);
    }
  }

  extractText(content);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

export function renderTiptapNode(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return escapeHtml(node);

  if (node.type === "text") {
    let text = escapeHtml(node.text || "");
    if (node.marks && Array.isArray(node.marks)) {
      node.marks.forEach((mark: any) => {
        if (mark.type === "bold") text = `<strong>${text}</strong>`;
        if (mark.type === "italic") text = `<em>${text}</em>`;
        if (mark.type === "underline") text = `<u>${text}</u>`;
        if (mark.type === "code") text = `<code>${text}</code>`;
        if (mark.type === "link" && mark.attrs?.href) {
          const href = sanitizeUrl(mark.attrs.href);
          text = `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">${text}</a>`;
        }
      });
    }
    return text;
  }

  const innerHtml = node.content && Array.isArray(node.content)
    ? node.content.map(renderTiptapNode).join("")
    : "";

  switch (node.type) {
    case "doc":
      return innerHtml;
    case "paragraph":
      return `<p class="mb-4 leading-relaxed">${innerHtml}</p>`;
    case "heading":
      const level = node.attrs?.level || 2;
      const headingClasses: Record<number, string> = {
        1: "text-3xl font-extrabold mt-8 mb-4 tracking-tight",
        2: "text-2xl font-bold mt-6 mb-3 tracking-tight",
        3: "text-xl font-semibold mt-5 mb-2",
        4: "text-lg font-semibold mt-4 mb-2",
      };
      return `<h${level} class="${headingClasses[level] || headingClasses[2]}">${innerHtml}</h${level}>`;
    case "blockquote":
      return `<blockquote class="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700 font-medium">${innerHtml}</blockquote>`;
    case "bulletList":
      return `<ul class="list-disc pl-6 mb-4 space-y-1">${innerHtml}</ul>`;
    case "orderedList":
      return `<ol class="list-decimal pl-6 mb-4 space-y-1">${innerHtml}</ol>`;
    case "listItem":
      return `<li>${innerHtml}</li>`;
    case "codeBlock":
      return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm"><code>${innerHtml}</code></pre>`;
    case "horizontalRule":
      return `<hr class="my-8 border-gray-200" />`;
    case "image":
      if (node.attrs?.src) {
        const src = sanitizeUrl(node.attrs.src);
        const alt = escapeHtml(node.attrs.alt || "Article Image");
        return `<figure class="my-6"><img src="${src}" alt="${alt}" class="rounded-xl w-full object-cover shadow-sm max-h-[500px]" /></figure>`;
      }
      return "";
    default:
      return innerHtml;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeUrl(url: string): string {
  if (!url) return "#";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("data:image/")
  ) {
    return trimmed;
  }
  return "#";
}
