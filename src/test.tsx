type Laptop = {
  type: 'laptop';
  screenSize: number;
  graphics: string;
}

type Headphone = {
  type: 'headphone',
  ANC: boolean
}

/*
  用 & 和 聯合的方式去聯結兩個 type 
  在下列使用的方式，type 使用的參數會對照被關聯的兩個 type 尋找對應的
  進而決定使用哪一個 type
*/

type Product = {
  name: string;
  price: number;
} & (Laptop | Headphone)
/*
example: 下列的 type 實際會長這樣
type Product ={ name: string; price: number; } & Laptop
*/
const laptopXY: Product = {
  type: 'laptop',
  name: 'laptopXY',
  price: 200,
  graphics: 'nvidia',
  screenSize: 14,
}
/*
example: 下列的 type 實際會長這樣
type Product ={ name: string; price: number; } & Headphone
*/
const airpodsPro: Product = {
  type: 'headphone',
  name: ' airPodsPro2022',
  price: 100,
  ANC: true,
}