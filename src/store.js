import { proxy } from 'valtio';

export const state = proxy({
  currentModel: "/model/Men’s Genuine Leather Maverick Jacket–Shirt Collar Style.glb",
  currentTexture: "/textures/Leather Texture Transparent.jpg",
  // currentShearlingTexture: "/textures/shearling/smart texture.png",
  autoRotate: false,

  prices: {
    "/model/Men’s Genuine Leather Maverick Jacket–Shirt Collar Style.glb": 159.99,
    "/model/Men’s Real Leather Black 3/4 Length Shearling Style.glb": 215,
    "/model/Men’s Blue Leather Jacket with Faux Fur Collar.glb": 159.99,
    "/model/Men’s Cognac Brown Real Lambskin Leather Bomber Jacket – Classic Leather Jacket.glb": 159.99,
    "/model/Men’s Black Lambskin Faux Fur Shearling Leather Bomber Jacket.glb": 199.99,
    "/model/Men’s Maroon Lambskin Faux Fur Shearling Leather Bomber Jacket.glb": 199.99,
    "/model/Men’s  Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb": 159.99,

    //women jackets prices
    "/model/Women’s Black Real Leather B3 Bomber Cream Shearling Jacket.glb": 199.99,
    "/model/Women’s Cognac Cropped Genuine Lambskin Leather Trucker Jacket.glb": 149.99,
    "/model/Women’s Cognac Brown Genuine Lambskin Leather Bomber Jacket.glb": 159.99,
    "/model/Women’s Black Genuine Lambskin Leather 3/4 Length Coat Faux Fur Shearling.glb": 215,
    "/model/Women’s Blue Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb": 159.99,
    "/model/Women’s Hooded Black Real Lambskin Leather Faux Shearling Aviator Jacket.glb": 199.99,
  },

  // Dynamic settings per model (Objects for zippers)
  modelsSettings: {
    "/model/Men’s Genuine Leather Maverick Jacket–Shirt Collar Style.glb": { 
      body: "#692a288f", 
      inner: "#0c0b0b", 
      zip: { hex: '#D8D8D8', metalness: 1.0, roughness: 0.15 } 
    },
    "/model/Men’s Real Leather Black 3/4 Length Shearling Style.glb": { 
      body: "#2A2A2A", 
      inner: "#d8d8d89a", 
      zip: { hex: '#D8D8D8', metalness: 1.0, roughness: 0.15 } 
    },
    "/model/Men’s Blue Leather Jacket with Faux Fur Collar.glb": { 
      body: "#21656e", 
      inner: "#c2bcbc", 
      zip: { hex: '#8C7748', metalness: 0.85, roughness: 0.40 } 
    },
    "/model/Men’s Cognac Brown Real Lambskin Leather Bomber Jacket – Classic Leather Jacket.glb": { 
      body: "#8B4513", 
      inner: "#0a0909", 
      zip: { hex: '#5C6166', metalness: 0.9, roughness: 0.35 } 
    },
    "/model/Men’s Black Lambskin Faux Fur Shearling Leather Bomber Jacket.glb": { 
      body: "#000000", 
      inner: "#744326", 
      zip: { hex: '#D8D8D8', metalness: 1.0, roughness: 0.15 } 
    },
    "/model/Men’s Maroon Lambskin Faux Fur Shearling Leather Bomber Jacket.glb": { 
      body: "#6d3f36", 
      inner: "#0c0b0b", 
      zip: { hex: '#D8D8D8', metalness: 1.0, roughness: 0.15 } 
    },
    "/model/Men’s  Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb": { 
      body: "#8B4513", 
      inner: "#0c0c0c", 
      zip: { hex: '#D8D8D8', metalness: 1.0, roughness: 0.15 } 
    },


    "/model/Women’s Black Real Leather B3 Bomber Cream Shearling Jacket.glb": { 
      body: "#000000", 
      inner: "#080808", 
      zip: { hex: '#D8D8D8', metalness: 1.0, roughness: 0.15 } 
    },
    "/model/Women’s Cognac Cropped Genuine Lambskin Leather Trucker Jacket.glb": { 
      body: "#80592d", 
      inner: "#020202", 
      zip: { hex: '#214344', metalness: 0.85, roughness: 0.40 } 
    },
    "/model/Women’s Cognac Brown Genuine Lambskin Leather Bomber Jacket.glb": { 
      body: "#8b622d", 
      inner: "#000000", 
      zip: { hex: '#5C6166', metalness: 0.9, roughness: 0.35 } 
    },
    "/model/Women’s Black Genuine Lambskin Leather 3/4 Length Coat Faux Fur Shearling.glb": { 
      body: "#0c0b0b", 
      inner: "#080808", 
      zip: { hex: '#D8D8D8', metalness: 1.0, roughness: 0.15 } 
    },
    "/model/Women’s Blue Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb": { 
      body: "#172e6d", 
      inner: "#050505", 
      zip: { hex: '#D8D8D8', metalness: 1.0, roughness: 0.15 } 
    },
    "/model/Women’s Hooded Black Real Lambskin Leather Faux Shearling Aviator Jacket.glb": { 
      body: "#1A1A1A", 
      inner: "#050505", 
      zip: { hex: '#5C6166', metalness: 0.9, roughness: 0.35 } 
    }
  },

  // Cart Array
  cart: []
});

export const bodyColors = [
  { id: 'purple', name: 'PURPLE', value: '#322681' },
  { id: 'dark_brown', name: 'DARK BROWN', value: '#2c1914' },
  { id: 'cognac', name: 'COGNAC', value: '#7A4328' },
  { id: 'maroon', name: 'MAROON', value: '#802329' },
  { id: 'black', name: 'BLACK', value: '#080808' },
  { id: 'blue', name: 'BLUE', value: '#172e6d' }
];

export const shearlingColors = [
  { id: "cream", value: "#a79675" },
  { id: "black", value: "#000000" },
  { id: "Tan Brown", value: "#703511" },
  { id: "Dark Brown", value: "#36241c" }
 

];

export const modelData = [
  { id: "man", name: "Man Jacket", path: "/model/Men’s Genuine Leather Maverick Jacket–Shirt Collar Style.glb" },
  { id: "woman", name: "Woman Jacket", path: "/model/Women’s Black Real Leather B3 Bomber Cream Shearling Jacket.glb" }
];

