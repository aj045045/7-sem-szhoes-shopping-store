import { ProductInterface } from "../product/interface";
import { BlogInterface } from "../blog/interface";
import { Hero } from "./Hero";
import { ProductMapComp } from "@/components/utility/product";
import { BlogMapComp } from "./BlogMap";
import { Trending } from "./Trending";
import { ProductDetail } from "./Product_Detail";
import { Contact } from "./Contact";
import { BlogData, ProductData } from "./api";

/**
 * The components that is used to send the home page as a wrapper components
 * 
 * @returns The Home page
 */
export function HomeComp() {
    const products: ProductInterface[] = ProductData();
    const blog: BlogInterface[] = BlogData();
    return (<>
        <Hero />
        <ProductMapComp products={products} title="shop our new arrival" />
        <BlogMapComp products={blog} title="Blogs" />
        <ProductMapComp products={products} title="Featured" />
        <Trending />
        <ProductMapComp products={products} title="Top Trending Products" />
        <ProductMapComp products={products} title="Best Seller" />
        <ProductDetail />
        <ProductMapComp products={products} title="Men Wear" />
        <ProductMapComp products={products} title="Women Wear" />
        <ProductMapComp products={products} title="Kids Wear" />
        <ProductMapComp products={products} title="Perfumes" />
        <ProductMapComp products={products} title="Discover Our Exclusive Collection" />
        <ProductMapComp products={products} title="Inspired by your browsing history" />
        <Contact />
    </>);
}