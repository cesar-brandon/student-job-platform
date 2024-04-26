"use client";

import CustomCodeRenderer from "@/components/editor/custom-code-renderer";
import CustomImageRenderer from "@/components/editor/custom-image-renderer";
import { FC } from "react";
import dynamic from "next/dynamic";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.885rem",
    lineHeight: "1.25rem",
    letterSpacing: "-0.01em",
    marginTop: "1.5rem",
    marginBottom: "1rem",
  },
  list: {
    container: {
       marginLeft: "1.5rem",
    },
    listItem: {
      fontSize: "0.885rem",
      lineHeight: "1.25rem",
      fontWeight: 500,
      listStyleType: "disc",
    },
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
