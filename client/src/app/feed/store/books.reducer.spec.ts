import * as booksReducer from './books.reducer';
import { IBookItemModel, IBooksModel, ISearchRequestModel, ISearchResponseModel } from '../models/books.model';
import { ClearSearch, SearchBooks, SearchBooksSuccess } from './books.actions';

describe('Books reducer', () => {
  let state: IBooksModel;
  const term = 'new search term';
  const booksList: IBookItemModel[] = [{
    id: 'book id',
    rating: 2,
    title: 'books title',
    subtitle: 'books subtitle',
    description: 'books description',
    authors: 'author 1 author 2',
    pageCount: 340,
    publishedDate: '1/1/1995',
    image: ''
  }];

  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = booksReducer;
      const action = {
        type: 'Action does not belong to the module'
      };
      state = booksReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('Search books action', () => {
    beforeEach(async () => {
      const { initialState } = booksReducer;
      const payload: ISearchRequestModel = { term };
      const action = SearchBooks(payload);
      state = booksReducer.reducer(initialState, action);
    });

    it('should update the state with the search term', () => {
      const expectedState: IBooksModel = {
        term: 'new search term',
        booksList: null,
        isLoading: true,
        isError: false
      };

      // check the properties
      expect(state).toEqual(expectedState);
      // check the reference - for immutability
      expect(state).not.toBe(expectedState);
    });
  });

  describe('Search books success action', () => {
    beforeEach(async () => {
      const { initialState } = booksReducer;
      const payload: ISearchResponseModel = { term, booksList };
      const action = SearchBooksSuccess(payload);
      state = booksReducer.reducer(initialState, action);
    });

    it('should update the state with the search term', () => {
      const expectedState: IBooksModel = {
        term: 'new search term',
        booksList,
        isLoading: false,
        isError: false
      };

      expect(state).toEqual(expectedState);
      expect(state).not.toBe(expectedState);
    });
  });

  describe('Clear search', () => {
    beforeEach(async () => {
      const { initialState } = booksReducer;
      const action = ClearSearch();
      state = booksReducer.reducer(initialState, action);
    });

    it('should return clean state', () => {
      const expectedState: IBooksModel = {
        term: null,
        booksList: null,
        isLoading: null,
        isError: null
      };
      expect(state).toEqual(expectedState);
      expect(state).not.toBe(expectedState);
    });
  });

  describe('Selectors', () => {
    beforeEach(async () => {
      state = {
        term,
        booksList,
        isLoading: false,
        isError: false
      };
    });

    it('should select books list', async () => {
      const response = await booksReducer.getBooksList.projector(state);
      expect(response.length).toEqual(1);
      expect(response[0].title).toEqual(state.booksList[0].title);
    });

    it('should select the loader state', () => {
      state = {
        ...state,
        isLoading: true
      };
      const response = booksReducer.isLoadingBooks.projector(state);
      expect(response).toBeTrue();
    });
  });

});
