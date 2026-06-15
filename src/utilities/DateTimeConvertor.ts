export const formatMessageDateTime = (timestamp: Date | string) => {
  const date = new Date(timestamp);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const messageDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diffInDays = Math.floor(
    (today.getTime() - messageDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (diffInDays === 0) {
    return `Today, ${time}`;
  }

  if (diffInDays === 1) {
    return `Yesterday, ${time}`;
  }

  if (diffInDays < 7) {
    const day = date.toLocaleDateString("en-IN", {
      weekday: "long",
    });

    return `${day}, ${time}`;
  }

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });

  return `${formattedDate}, ${time}`;
};
