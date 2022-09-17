export const capitalize = (string) => {
    const separateString = string.split(" ");
    const final = separateString
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return final;
  };
  export const productosPorCategoria = (data) => {
    console.log({ data });
    return data?.reduce((accum, current) => {
      if (!accum.find((item) => item.category === current.category)) {
        accum.push({ category: current.category, products: [current] });
      } else {
        accum.map((item) => {
          if (item.category === current.category) {
            return { ...item, products: item.products.push(current) };
          } else {
            return item;
          }
        });
      }
      return accum;
    }, []);
  };
  export const renderCurrency = (value) => {
    return Number(value).toLocaleString("es-es", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };