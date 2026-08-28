export default function RatingStars({ rating }: { rating: number }) {
  const maxStars = 5;

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <span
            key={index}
            style={{
              color: isFilled ? "#FFC531" : "#F2F4F7",
              fontSize: "16px",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
