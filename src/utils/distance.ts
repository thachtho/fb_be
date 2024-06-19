function regexDistance(data: string) {
  const regex = /(\d+\.\d+ km)/g;
  const results = [];
  let match;
  // Sử dụng vòng lặp để tìm tất cả các kết quả phù hợp
  while ((match = regex.exec(data)) !== null) {
    results.push(match[1]);
  }

  return results;
}

export { regexDistance };
