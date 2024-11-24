'use client'
import { HeroPage } from "./hero";
import { BlogListPage } from "./blog-list";
import { TrendingPage } from "./trending";
import { ProductFeaturePage } from "./product-detail";
import { ContactPage } from "./contact";
import { BlogData, ProductData } from "./api";
import { BlogInterface } from "@/interfaces/blog";
import { ProductInterface } from "@/interfaces/product";
import { ProductListUtil } from "@/utility/product/product-list";

/**
 * The components that is used to send the home page as a wrapper components
 * 
 * @returns The Home page
 */
export default function HomeApp() {
    const products: ProductInterface[] = ProductData();
    const blog: BlogInterface[] = BlogData();
    return (<>
        <HeroPage />
        <ProductListUtil products={products} title="shop our new arrival" />
        <BlogListPage products={blog} title="Blogs" />
        <ProductListUtil products={products} title="Featured" />
        <TrendingPage />
        <ProductListUtil products={products} title="Top Trending Products" />
        <ProductListUtil products={products} title="Best Seller" />
        <ProductFeaturePage />
        <ProductListUtil products={products} title="Men Wear" />
        <ProductListUtil products={products} title="Women Wear" />
        <ProductListUtil products={products} title="Kids Wear" />
        <ProductListUtil products={products} title="Perfumes" />
        <ProductListUtil products={products} title="Discover Our Exclusive Collection" />
        <ProductListUtil products={products} title="Inspired by your browsing history" />
        <ContactPage />
    </>);
}