export interface ISearchRequestModel {
  term: string;
}

export interface ISearchResponseModel extends ISearchRequestModel {
  booksList: IBookItemModel[];
}

export interface IBookItemModel {
  title: string;
  subtitle: string;
  authors: string;
  description: string;
  image: string;
  pageCount: number;
  rating: number
}

export interface IBooksModel extends ISearchResponseModel {
  isLoading: boolean,
  isError: boolean
}
