import { useState } from "react";

// import * as DialogPrimitive from "@radix-ui/react-dialog";

// import {
//   TertiaryPane,
//   useSchemaDocumentation,
// } from "../../schema-documentation";
import { quickDocsClass } from "./quick-docs.css";

export const QuickDocs = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  // const { activeTertiaryPane, clearTertiaryPaneStack } =
  //   useSchemaDocumentation();

  // const closeDialog = () => clearTertiaryPaneStack();

  return (
    <div
      className={quickDocsClass({
        // dialogActive: !!activeTertiaryPane
        dialogActive: false,
      })}
    >
      {/* <DialogPrimitive.Root open={!!activeTertiaryPane} modal={false}>
        <DialogPrimitive.Portal container={container}>
          <DialogPrimitive.Content
            className="quick-docs-dialog-content"
            onEscapeKeyDown={() => closeDialog()}
          >
            {activeTertiaryPane && (
              <TertiaryPane
                pane={activeTertiaryPane["pane"]}
                placement="QUICK_DOCS"
              />
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
      <div className="quick-docs-portal-container" ref={setContainer} /> */}
    </div>
  );
};
