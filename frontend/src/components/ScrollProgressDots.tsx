interface ScrollProgressDotsProps {
  total: number;
  current: number;
  className?: string;
}

export default function ScrollProgressDots({
  total,
  current,
  className = "",
}: ScrollProgressDotsProps) {
  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === current ? "bg-primary scale-125" : "bg-outline-variant"
          }`}
        />
      ))}
    </div>
  );
}
