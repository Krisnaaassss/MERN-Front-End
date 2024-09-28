export const generateSelectOptions = (amount) => {
  // fungsi ini digunakan untuk menggenerate option pada select element
  // berdasarkan jumlah yang diinputkan
  return Array.from({ length: amount }, (_, index) => {
    const value = index + 1;
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  });
};

export const priceFormat = (price) => {
  const rupiahFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  return rupiahFormat;
};
