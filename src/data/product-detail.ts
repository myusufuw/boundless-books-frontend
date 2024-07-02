export type ProductDetailListType = {
  title: string
  value: string | number
}

export const productDetailList = (
  numberOfPages: number,
  publisher: string,
  publicationDate: string,
  weight: number,
  isbn: string,
  width: number,
  language: string,
  length: number
): ProductDetailListType[] => [
  {
    title: "Number of Pages",
    value: numberOfPages ?? "-",
  },
  {
    title: "Publisher",
    value: publisher ?? "-",
  },
  {
    title: "Publication Date",
    value: publicationDate ?? "-",
  },
  {
    title: "Weight",
    value: `${weight} Grams` ?? "-",
  },
  {
    title: "ISBN",
    value: isbn ?? "-",
  },
  {
    title: "Width",
    value: `${width} Milimeters` ?? "-",
  },
  {
    title: "Language",
    value: language ?? "-",
  },
  {
    title: "Length",
    value: `${length} Milimeters` ?? "-",
  },
]
