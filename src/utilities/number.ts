export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("id-ID").format(price)
}
