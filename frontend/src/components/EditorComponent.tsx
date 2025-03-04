"use client";
import {
  toolbarPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  MDXEditor,
} from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'


const allPlugins = (diffMarkdown: string) => [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
  markdownShortcutPlugin(),
];

export default function EditorComp({
  markdown,
  setMarkdown,
}: {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}) {
  return (
    <MDXEditor
      markdown={markdown}
      onChange={setMarkdown}
      className="full-demo-mdxeditor"
      contentEditableClassName="prose max-w-full font-sans"
      plugins={allPlugins(markdown)}
    />
  );
}
