import { BlogCardComp } from "./blog_detail/BlogCard";
import { BlogInterface } from "./interface";
import { montserrat_Subrayada } from "@/langs";
import { Pagination } from "@nextui-org/pagination";
import { BlogData } from "./api";

/**
 * The component that contain the data for the Blog page and Number of pages 
 * 
 * @returns The blog Page with pagination
 */
export function BlogComp() {
    const blog: BlogInterface[] = BlogData();
    return (
        <>
            <div className={`${montserrat_Subrayada.className} text-3xl px-5 mt-5`}> blogs </div>
            <div className="p-5" >
                {
                    blog.map((product, index) => (
                        <span key={index} className="mr-5" >
                            <BlogCardComp product={product} key={index} />
                        </span>
                    ))
                }
            </div>
            <Pagination classNames={{ wrapper: "mx-auto my-5" }} size="lg" isCompact loop showControls color="success" total={10} initialPage={1} />
        </>
    )
};