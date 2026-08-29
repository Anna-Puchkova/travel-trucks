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
              color: isFilled ? "#FFC531" : "#D0D5DD",
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
