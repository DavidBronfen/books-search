export interface IWishListBookItemModel {
  id: string;
  title: string;
  image: string;
}

export interface IWishListModel {
  myList: IWishListBookItemModel[];
}
