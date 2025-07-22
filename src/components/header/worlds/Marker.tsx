type MarkerProps = {
  isActive: boolean;
};

export function Marker({ isActive }: MarkerProps) {
  if (isActive) {
    return (
      <div className="marker active">
        <div className="marker__wrapper">
          <div className="marker__base-square">
            <div className="marker__circle" />
          </div>
          <div className="marker__arrow-square">
            <div className="marker__arrow-line">
              <div className="marker__arrow-circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="marker" />;
}
