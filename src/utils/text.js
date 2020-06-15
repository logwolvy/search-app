const truncatedText = (text, allowedWords) => {
  return (
    text
      .split(" ")
      .slice(0, allowedWords + 1)
      .join(" ") + "..."
  );
};

export { truncatedText };
