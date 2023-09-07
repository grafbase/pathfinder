import { ResizerProvider } from "../resizer/use-resizer";
import { ScoutTools } from "./scout-tools";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <ResizerProvider>{children}</ResizerProvider>;
};

export const Story = () => {
  return (
    <Container>
      <ScoutTools />
    </Container>
  );
};
