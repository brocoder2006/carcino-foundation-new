"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import UnderlineExtension from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  UploadCloud,
} from "lucide-react";
import { uploadMediaApi } from "@/lib/api";

interface TiptapEditorProps {
  content?: any;
  onChange: (json: any) => void;
  placeholder?: string;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  placeholder = "Start writing your article content...",
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline font-medium",
        },
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor && content && JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="h-64 w-full bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-medium">
        Loading rich text editor...
      </div>
    );
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadMediaApi(file);
      if (res.url) {
        editor.chain().focus().setImage({ src: res.url, alt: file.name }).run();
      }
    } catch (err: any) {
      alert(`Image upload failed: ${err.message || err}`);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter destination URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
      {/* Editor Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("heading", { level: 1 }) ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("bold") ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("italic") ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("underline") ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("bulletList") ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("orderedList") ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("blockquote") ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("codeBlock") ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors ${
            editor.isActive("link") ? "bg-slate-200 text-blue-600 font-bold" : ""
          }`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <label className="p-2 rounded hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors flex items-center gap-1" title="Insert Image">
          <ImageIcon className="w-4 h-4" />
          {isUploading && <UploadCloud className="w-3 h-3 animate-spin text-blue-600" />}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </label>

        <div className="w-px h-5 bg-slate-300 mx-1 ml-auto" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-slate-200 text-slate-700 disabled:opacity-30 transition-colors"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-slate-200 text-slate-700 disabled:opacity-30 transition-colors"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="p-5 min-h-[350px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
