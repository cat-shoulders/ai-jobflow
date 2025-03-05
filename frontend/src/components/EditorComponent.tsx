'use client';
import {
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  listsPlugin,
  linkPlugin,
  CreateLink,
  linkDialogPlugin,
  thematicBreakPlugin,
  DiffSourceToggleWrapper,
  MDXEditor,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const allPlugins = () => [
  toolbarPlugin({
    toolbarContents: () => (
      <DiffSourceToggleWrapper>
        <BoldItalicUnderlineToggles />
        <UndoRedo />
        <ListsToggle />
        <CreateLink />
      </DiffSourceToggleWrapper>
    ),
  }),
  listsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  thematicBreakPlugin(),
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
