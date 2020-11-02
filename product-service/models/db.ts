export type Product = {
  id: string | number,
  title: string,
  description: string,
  price: number,
  imageUrl: string
};


export const PRODUCTS:Product[]  = [
  {
    id: 1,
    title: 'Unicorn toy white',
    description: 'Unicorn toy for your kid',
    price: 4000,
    imageUrl: 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.47.33.jpeg'
  },
  {
    id: 2,
    title: 'Unicorn toy green',
    description: 'Unicorn toy for your kid',
    price: 4000,
    imageUrl: 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.48.09.jpeg'
  },
  {
    id: 3,
    title: 'Cat toy',
    description: 'Cat toy for your kid',
    imageUrl: 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.53.22.jpeg',
    price: 3000,
  },
  {
    id: 4,
    title: 'Rabbit toy',
    description: 'toy for your kid',
    imageUrl: 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.55.51.jpeg',
    price: 4000,
  },
  {
    id: 5,
    title: 'Bull toy',
    description: 'toy for your kid',
    imageUrl: 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.55.16.jpeg',
    price: 4000,
  },
  {
    id: 6,
    title: 'Leo toy',
    description: 'toy for your kid',
    imageUrl: 'https://julove-coach.ru/wp-content/uploads/2020/11/whatsapp-image-2020-11-02-at-09.54.58.jpeg',
    price: 4000,
  }
];