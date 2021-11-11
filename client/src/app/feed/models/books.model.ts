export interface ISearchRequestModel {
  term: string;
}

export interface ISearchResponseModel extends ISearchRequestModel {
  booksList: IBookItemModel[];
}

export interface IBookItemModel {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  description: string;
  image: string;
  publishedDate: string;
  pageCount: number;
  rating: number
}

export interface IBooksModel extends ISearchResponseModel {
  isLoading: boolean,
  isError: boolean
}
