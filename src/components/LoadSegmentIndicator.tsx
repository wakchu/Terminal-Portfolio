import React from 'react';

export function LoadSegmentIndicator() {
  const [activeSegment, setActiveSegment] = React.useState(0);

  React.useEffect(() => {
    const segmentTimer = setInterval(() => {
      setActiveSegment((prev) => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(segmentTimer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-1">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`h-[3px] ${i === activeSegment ? 'bg-tokyo-primary' : 'bg-tokyo-border'}`} />
      ))}
    </div>
  );
}
