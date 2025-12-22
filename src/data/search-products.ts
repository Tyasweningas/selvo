/**
 * Search Products Data
 * Data produk untuk halaman pencarian produk
 */

export interface Product {
    id: number;
    category: string;
    title: string;
    image: string;
    rating: number;
    downloads: string;
    price: number;
}

export interface ProductsByCategory {
    [key: string]: Product[];
}

/**
 * Data produk berdasarkan kategori untuk halaman pencarian
 */
export const searchProductsData: ProductsByCategory = {
    "Gambar & Ilustrasi": [
        {
            id: 1,
            category: "Ilustrasi",
            title: "Foto Profil Waifu - 10 Pilihan Varian",
            image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "3.2K",
            price: 10600
        },
        {
            id: 2,
            category: "Ilustrasi",
            title: "Karakter Anime Modern - Set Lengkap",
            image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "2.8K",
            price: 15000
        },
        {
            id: 3,
            category: "Ilustrasi",
            title: "Icon Set Minimalist - 50 Icons",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
            rating: 4.8,
            downloads: "5.1K",
            price: 12500
        },
        {
            id: 4,
            category: "Fotografi",
            title: "Portrait Photography Collection",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "4.5K",
            price: 25000
        },
        {
            id: 5,
            category: "Mockup",
            title: "Device Mockup Bundle - Phone & Laptop",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop",
            rating: 4.9,
            downloads: "6.2K",
            price: 18000
        },
        {
            id: 6,
            category: "Ilustrasi",
            title: "Background Pattern Set - 20 Designs",
            image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
            rating: 4.7,
            downloads: "3.9K",
            price: 11000
        },
        {
            id: 7,
            category: "Fotografi",
            title: "Nature Landscape - Premium Quality",
            image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "7.3K",
            price: 22000
        },
        {
            id: 8,
            category: "Ilustrasi",
            title: "Sticker Pack Kawaii - 30 Stickers",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop",
            rating: 4.8,
            downloads: "4.1K",
            price: 9500
        },
    ],
    "Desain Grafis": [
        {
            id: 9,
            category: "Desain",
            title: "Template PPT - Tema Burung Premium",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "5.0K",
            price: 55400
        },
        {
            id: 10,
            category: "Desain",
            title: "Social Media Templates - Instagram Pack",
            image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=400&fit=crop",
            rating: 4.9,
            downloads: "8.5K",
            price: 35000
        },
        {
            id: 11,
            category: "Website",
            title: "Landing Page Template - Modern Design",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "6.8K",
            price: 75000
        },
        {
            id: 12,
            category: "Desain",
            title: "Business Card Template - Professional",
            image: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=400&h=400&fit=crop",
            rating: 4.7,
            downloads: "4.2K",
            price: 28000
        },
        {
            id: 13,
            category: "3D Element",
            title: "3D Icon Pack - 100 Premium Icons",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "9.1K",
            price: 42000
        },
        {
            id: 14,
            category: "Website",
            title: "E-commerce UI Kit - Complete Set",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
            rating: 4.9,
            downloads: "7.6K",
            price: 65000
        },
        {
            id: 15,
            category: "Desain",
            title: "Poster Design Bundle - 10 Templates",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            rating: 4.8,
            downloads: "5.4K",
            price: 38000
        },
    ],
    "Videografi": [
        {
            id: 16,
            category: "Video",
            title: "Video Cinematic Sunset - 4K Quality",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "4.0K",
            price: 53000
        },
        {
            id: 17,
            category: "Video",
            title: "Motion Graphics Template - Modern",
            image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=400&fit=crop",
            rating: 4.9,
            downloads: "6.3K",
            price: 68000
        },
        {
            id: 18,
            category: "Video",
            title: "Intro Template - YouTube Channel",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
            rating: 4.8,
            downloads: "7.9K",
            price: 45000
        },
        {
            id: 19,
            category: "Video",
            title: "Stock Footage - City Life Collection",
            image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=400&fit=crop",
            rating: 5,
            downloads: "5.2K",
            price: 72000
        },
        {
            id: 20,
            category: "Video",
            title: "Lower Third Templates - Professional",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop",
            rating: 4.7,
            downloads: "3.8K",
            price: 38000
        },
        {
            id: 21,
            category: "Video",
            title: "Transition Pack - 50 Smooth Transitions",
            image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=400&fit=crop",
            rating: 4.9,
            downloads: "8.7K",
            price: 52000
        },
    ],
};

/**
 * Helper function untuk mendapatkan produk berdasarkan kategori
 */
export const getProductsByCategory = (category: string): Product[] => {
    return searchProductsData[category] || [];
};

/**
 * Helper function untuk mendapatkan semua produk
 */
export const getAllProducts = (): Product[] => {
    return Object.values(searchProductsData).flat();
};

/**
 * Helper function untuk mendapatkan produk berdasarkan ID
 */
export const getProductById = (id: number): Product | undefined => {
    return getAllProducts().find(product => product.id === id);
};
