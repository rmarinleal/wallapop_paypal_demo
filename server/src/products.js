export const products = [
  {
    id: "alas-onix",
    title: "Alas de Ónix",
    price: 15,
    protection: 1.81,
    shipping: 3.89,
    condition: "Como nuevo",
    extra: "Fantasía",
    category: "Libros, cómics y revistas",
    tags: ["Libros", "Fantasía", "Novela"],
    location: "Madrid",
    description:
      "Libro en excelente estado. Entrega con protección Wallapop y envío a domicilio.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
    seller: {
      name: "Laura M.",
      rating: 4.8,
      reviews: 312,
      verified: true,
    },
  },
  {
    id: "cds-rock",
    title: "15 CD's Rock: McCartney, Fleetwood Mac, DOORS",
    price: 20,
    protection: 2.2,
    shipping: 4.49,
    condition: "Como nuevo",
    extra: "Compilación",
    category: "Música",
    tags: ["Música", "CDs, Vinilos y Casetes", "CDs Música"],
    location: "Madrid",
    description:
      "Lote de 15 CDs de rock en muy buen estado: McCartney, Fleetwood Mac, The Doors y más. Carátulas originales. Envío disponible.",
    image:
      "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=1200&q=80",
    seller: {
      name: "XAVI H.",
      rating: 4.9,
      reviews: 1025,
      verified: true,
    },
  },
  {
    id: "mates-eso",
    title: "Matemáticas, 1 ESO",
    price: 20,
    protection: 2.2,
    shipping: 3.89,
    condition: "Buen estado",
    extra: "Libro de texto",
    category: "Libros, cómics y revistas",
    tags: ["Libros", "Educación", "ESO"],
    location: "Madrid Centro",
    description: "Libro de texto de Matemáticas 1º ESO. Sin subrayar. Envío disponible.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    seller: {
      name: "Ana P.",
      rating: 4.7,
      reviews: 88,
      verified: false,
    },
  },
  {
    id: "vinilo-floyd",
    title: "Vinilo Pink Floyd – The Dark Side of the Moon",
    price: 18,
    protection: 2.05,
    shipping: 3.89,
    condition: "Buen estado",
    extra: "Vinilo",
    category: "Música",
    tags: ["Música", "CDs, Vinilos y Casetes", "Vinilos"],
    location: "Madrid",
    description: "Vinilo original en buen estado. Funda con signos de uso normales.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    seller: {
      name: "Marc R.",
      rating: 4.6,
      reviews: 154,
      verified: true,
    },
  },
  {
    id: "comic-spiderman",
    title: "Cómic Spider-Man tomo 1",
    price: 12,
    protection: 1.55,
    shipping: 3.89,
    condition: "Como nuevo",
    extra: "Cómic",
    category: "Libros, cómics y revistas",
    tags: ["Cómics", "Marvel", "Superhéroes"],
    location: "Madrid",
    description: "Tomo recopilatorio en perfecto estado, como nuevo.",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=1200&q=80",
    seller: {
      name: "Diego S.",
      rating: 4.9,
      reviews: 640,
      verified: true,
    },
  },
  {
    id: "dvd-matrix",
    title: "The Matrix trilogía DVD",
    price: 10,
    protection: 1.4,
    shipping: 3.89,
    condition: "Buen estado",
    extra: "DVD",
    category: "Cine y series",
    tags: ["Cine", "DVD", "Ciencia ficción"],
    location: "Madrid",
    description: "Trilogía completa de Matrix en DVD. Cajas originales.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    seller: {
      name: "Nuria V.",
      rating: 4.5,
      reviews: 41,
      verified: false,
    },
  },
  {
    id: "guitarra-acustica",
    title: "Guitarra acústica Yamaha",
    price: 90,
    protection: 6.5,
    shipping: 8.99,
    condition: "Buen estado",
    extra: "Instrumento",
    category: "Música",
    tags: ["Música", "Instrumentos", "Guitarra"],
    location: "Madrid",
    description: "Yamaha en buen estado, cuerdas nuevas. Ideal para empezar.",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
    seller: {
      name: "XAVI H.",
      rating: 4.9,
      reviews: 1025,
      verified: true,
    },
  },
  {
    id: "novela-grafica",
    title: "Novela gráfica Watchmen",
    price: 14,
    protection: 1.7,
    shipping: 3.89,
    condition: "Nuevo",
    extra: "Novela gráfica",
    category: "Libros, cómics y revistas",
    tags: ["Cómics", "Novela gráfica", "DC"],
    location: "Madrid Centro",
    description: "Edición de lujo sin estrenar. Envío con protección.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    seller: {
      name: "Clara T.",
      rating: 5,
      reviews: 27,
      verified: true,
    },
  },
];

export function getProduct(id) {
  return products.find((item) => item.id === id) || null;
}

export function money(value) {
  return Number(value).toFixed(2);
}

export function computeTotals(product, delivery = "address") {
  const item = Number(product.price);
  const protection = Number(product.protection);
  const shipping = delivery === "address" ? Number(product.shipping) : 0;
  const total = item + protection + shipping;
  return {
    item,
    protection,
    shipping,
    total,
    itemFormatted: money(item),
    protectionFormatted: money(protection),
    shippingFormatted: money(shipping),
    totalFormatted: money(total),
  };
}
