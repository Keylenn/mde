import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import CodeBlock, { Props } from "@theme/CodeBlock";
import { FC } from "react";

interface Block extends Omit<Props, "children"> {
  label?: string;
  value?: string;
  code: string;
}

interface CodeBlocksProps {
  blocks: Block[];
}

const CodeBlocks: FC<CodeBlocksProps> = ({ blocks }) => {
  const renderBolck = ({ code, ...codeBlockProps }: Block) => (
    <CodeBlock showLineNumbers {...codeBlockProps}>
      {code}
    </CodeBlock>
  );
  if (blocks.length === 1) return renderBolck(blocks[0]);

  return (
    <Tabs>
      {blocks.map(({ value, label, ...rest }) => {
        return (
          <TabItem
            value={value || rest.language}
            label={label || rest.language}
          >
            {renderBolck(rest as Block)}
          </TabItem>
        );
      })}
    </Tabs>
  );
};
export default CodeBlocks;
