
export function FooterData() {
    return [
        {
            type: "Product", list: [
                { link: "#", data: "Small Cotton Cheese" },
                { link: "#", data: "Refined Concrete Bike" },
                { link: "#", data: "Practical Concrete Salad" },
            ]
        },
        {
            type: "Perfume", list: [
                { link: "#", data: "Intelligent Plastic Chicken" },
                { link: "#", data: "Fantastic Wooden Bacon" },
                { link: "#", data: "Intelligent Steel Mouse" },
            ]
        },
        {
            type: "Accessories", list: [
                { link: "#", data: "Sausages" },
                { link: "#", data: "Chair" },
                { link: "#", data: "Gloves" },
            ]
        },
        {
            type: "Help", list: [
                { link: "/login", data: "Login" },
                { link: "/register", data: "Register" },
                { link: "/home", data: "Home" },
                { link: "/blog", data: "Blogs" },
                { link: "/men", data: "men" },
                { link: "/women", data: "women" },
                { link: "/kids", data: "kids" },
            ]
        },
    ]
}

export function NavbarItemData() {
    return [
        { page: "Home", link: "/home" },
        { page: "Men", link: "/men" },
        { page: "Women", link: "/women" },
        { page: "Kids", link: "/kids" },
        { page: "Perfumes", link: "/perfumes" },
        { page: "Accessories", link: "/accessories" },
    ];
}

export function SearchItemData() {
    return [
        { id: 1, link: "/home", name: "Home" },
        { id: 4, link: "/men", name: "Men" },
        { id: 5, link: "/women", name: "Women" },
        { id: 6, link: "/kids", name: "Kids" },
        { id: 7, link: "/perfumes", name: "Perfumes" },
        { id: 8, link: "/accessories", name: "Accessories" },
        { id: 3, link: "/register", name: "Registration" },
        { id: 2, link: "/login", name: "Login" },
    ]
}