export interface ISearchRequestModel {
  term: string;
}

export interface ISearchResponseModel extends ISearchRequestModel {
  booksList: IBookItemModel[];
}

export interface IBookItemModel {
  name: string;
  description: string;
  image: string;
}

export interface IBooksModel extends ISearchRequestModel {
  isLoading: boolean
}
