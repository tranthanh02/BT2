// checkout - detail checkout
// checkout - page
export interface IItem {
  name: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
  totalprice: number;
}

// cart - page
export interface IItemCart {
  id?: string;
  namefood: string;
  description: string;
  img?: string;
  price: number;
  quantity: number;
  totalprice: number;
}

export interface IDetailsCart {
  name: string;
  quandoitac?: boolean;
  items: any;
}

// search - result

interface Category {
  category_name: string;
  description: string;
}

export interface IItemResult {
  food_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  additional_options: object;
  food_slug: string;
  created_at: string;
  categories: Category;
}

// statusOrder - status
export interface IStatusItem {
  id: string;
  number: number;
  name: string;
  st: boolean;
}
// statusOrder - page
export interface IDetailItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalprice: number;
  img: string;
}

// componnents - scrollBar
export interface IItemScrollBar {
  url: string;
}
