import { Title } from "./Title";
import { ImageMap } from "./ImageMap";
import { BlogData, ImageData, ProductData } from "./api";
import { BlogInterface } from "../interface";
import { ProductInterface } from "@/components/product/interface";
import { ProductMapComp } from "@/components/utility/product";
import { MarkDownConverterComp } from "@/components";
import { BlogMapComp } from "@/components/home/BlogMap";

/**
 * The Blog Component is used as a wrapper component for the Blog page
 * 
 * @returns A Blog page contain necessary functionality
 */
export function BlogDetailComp() {
    const DetailImages: string[] = ImageData();
    const Products: ProductInterface[] = ProductData();
    const Blogs: BlogInterface[] = BlogData();

    const tempData: string = `# The Ultimate Guide to Choosing the Perfect Shoes

When it comes to footwear, finding the right pair of shoes can make all the difference. Whether you’re looking for comfort, style, or durability, there’s a shoe out there for you. In this blog, we’ll explore various types of shoes, what to consider when buying, and some top recommendations. 

## Types of Shoes

### 1. **Athletic Shoes**
Perfect for running, walking, or hitting the gym. Look for shoes with good arch support and cushioning.

- **Best For:** Fitness enthusiasts
- **Top Brands:** Nike, Adidas, Asics

### 2. **Casual Sneakers**
Ideal for everyday wear. These shoes blend comfort and style, making them perfect for any casual outing.

- **Best For:** Daily wear and light activities
- **Top Brands:** Vans, Converse, New Balance

### 3. **Dress Shoes**
These are essential for formal occasions. They come in various styles, including oxfords, loafers, and brogues.

- **Best For:** Work and formal events
- **Top Brands:** Clarks, Allen Edmonds, Cole Haan

### 4. **Boots**
From ankle to knee-high, boots provide style and protection. Great for colder weather or rugged terrain.

- **Best For:** Winter wear and outdoor activities
- **Top Brands:** Timberland, Dr. Martens, UGG

### 5. **Sandals**
Perfect for warm weather, sandals come in various styles, from flip-flops to more supportive options.

- **Best For:** Casual outings and beach trips
- **Top Brands:** Birkenstock, Teva, Reef

## What to Consider When Buying Shoes

### 1. **Comfort**
Always prioritize comfort over style. Make sure to try on shoes and walk around in them before making a purchase.

### 2. **Fit**
Ensure there’s enough room for your toes to move. A good fit can prevent blisters and foot pain.

### 3. **Purpose**
Consider what you’ll be using the shoes for. Different activities require different features, such as grip, cushioning, and support.

### 4. **Quality**
Invest in high-quality shoes that will last longer. Check materials and construction details.

### 5. **Style**
Choose a style that reflects your personal taste and fits with your wardrobe. 

## Top Recommendations

### **For Athletic Use**
- **Nike Air Zoom Pegasus:** A versatile running shoe known for its comfort and support.
- **Adidas Ultraboost:** Offers great energy return and cushioning.

### **For Casual Wear**
- **Converse Chuck Taylor All Star:** Timeless and stylish for any outfit.
- **Vans Old Skool:** A classic skate shoe that never goes out of style.

### **For Formal Events**
- **Clarks Tilden Cap Oxford:** Stylish and comfortable for long wear.
- **Allen Edmonds Park Avenue:** A classic choice for the discerning gentleman.

### **For Winter**
- **Timberland 6-Inch Premium Waterproof Boots:** Rugged and stylish for any winter adventure.
- **UGG Classic Short II:** Offers warmth and comfort during the colder months.

### **For Summer**
- **Birkenstock Arizona Sandals:** Known for their arch support and durability.
- **Teva Original Universal Sandals:** Great for outdoor activities with a comfortable fit.

## Conclusion

Choosing the right shoes can greatly enhance your overall experience, whether you’re running errands, going to work, or enjoying a night out. Remember to consider comfort, fit, purpose, quality, and style when making your choice. With the right pair of shoes, you can step confidently into any situation!

Feel free to share your favorite shoe brands and experiences in the comments below! Happy shoe shopping! `;
    return (
        <div className="space-y-10 mt-5">
            <Title image={DetailImages[0]} />
            <div className="w-5/6 mx-auto p-4 border-neutral-300 rounded-lg border-2">
                <MarkDownConverterComp markdownString={tempData} />
            </div>
            <ImageMap DetailImages={DetailImages} />
            <ProductMapComp products={Products} title="Recommended" />
            <BlogMapComp products={Blogs} title="Blogs" />
        </div>
    )
}