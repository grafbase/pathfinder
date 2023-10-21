import { Resizer } from './resizer';

const Container = ({ toRender }: { toRender: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundColor: 'red',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {toRender}
    </div>
  );
};

const Pane1 = () => {
  return (
    <div style={{ backgroundColor: 'khaki', paddingLeft: 12 }}>
      {Array.from({ length: 100 }).map((_a, i) => (
        <div key={i}>Pane1</div>
      ))}
    </div>
  );
};

const Pane2 = () => {
  return (
    <div style={{ backgroundColor: 'aquamarine', paddingLeft: 12 }}>
      {Array.from({ length: 100 }).map((_a, i) => (
        <div key={i}>Pane2</div>
      ))}
    </div>
  );
};

export const HorizontalWithMinimums = () => {
  return (
    <Container
      toRender={
        <Resizer
          resizerName="editors_resizer"
          onSurface={1}
          orientation="HORIZONTAL"
          pane1={{ component: <Pane1 />, minimumSize: 40 }}
          pane2={{
            component: <Pane2 />,
            initialSize: { type: 'PERCENT', value: 50 },
            minimumSize: 40,
          }}
        />
      }
    />
  );
};

export const HorizontalWithoutMinimums = () => {
  return (
    <Container
      toRender={
        <Resizer
          resizerName="editors_resizer"
          onSurface={1}
          orientation="HORIZONTAL"
          pane1={{ component: <Pane1 /> }}
          pane2={{
            component: <Pane2 />,
            initialSize: { type: 'PIXELS', value: 50 },
          }}
        />
      }
    />
  );
};

export const VerticalWithMinimums = () => {
  return (
    <Container
      toRender={
        <Resizer
          resizerName="editors_resizer"
          onSurface={1}
          orientation="VERTICAL"
          pane1={{ component: <Pane1 />, minimumSize: 40 }}
          pane2={{
            component: <Pane2 />,
            initialSize: { type: 'PERCENT', value: 50 },
            minimumSize: 40,
          }}
        />
      }
    />
  );
};

export const VerticalWithPane2Minimum = () => {
  return (
    <Container
      toRender={
        <Resizer
          resizerName="editors_resizer"
          onSurface={1}
          orientation="VERTICAL"
          pane1={{ component: <Pane1 /> }}
          pane2={{
            component: <Pane2 />,
            initialSize: { type: 'PERCENT', value: 50 },
            minimumSize: 40,
          }}
        />
      }
    />
  );
};

export const VerticalWithoutMinimums = () => {
  return (
    <Container
      toRender={
        <Resizer
          resizerName="editors_resizer"
          onSurface={1}
          orientation="VERTICAL"
          pane1={{ component: <Pane1 /> }}
          pane2={{
            component: <Pane2 />,
            initialSize: { type: 'PERCENT', value: 50 },
          }}
        />
      }
    />
  );
};
