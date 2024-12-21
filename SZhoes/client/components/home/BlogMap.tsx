'use client'
import { useEffect, useRef, useState } from 'react';
import { montserrat_Subrayada, } from '@/langs';
import { BlogInterface } from '@/components/blog/interface';
import { BlogCardComp } from '@/components/blog/blog_detail/BlogCard';

/**
 * The component that is used for the blog product list map
 * 
 * @param products - The Blog detail
 * @param title - The title of the product
 * @returns The Blog section
 */
export function BlogMapComp({ products, title }: { products: BlogInterface[], title: string }) {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    const scrollLeft = () => {
        if (isAutoScrolling) {
            setIsAutoScrolling(false);
        }
        if (scrollContainerRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
            if (scrollLeft === 0) {
                scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
            }
        }
    };

    const scrollRight = () => {
        if (isAutoScrolling) {
            setIsAutoScrolling(false);
        }
        if (scrollContainerRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
            if (scrollLeft + clientWidth >= scrollWidth) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsAutoScrolling(true);
                } else {
                    setIsAutoScrolling(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Trigger when at least 50% of the component is in view
        });

        if (scrollContainer) {
            observer.observe(scrollContainer);
        }

        return () => {
            if (scrollContainer) {
                observer.unobserve(scrollContainer);
            }
        };
    }, []);
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsAutoScrolling(true);
                } else {
                    setIsAutoScrolling(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Trigger when at least 50% of the component is in view
        });

        if (scrollContainer) {
            observer.observe(scrollContainer);
        }

        return () => {
            if (scrollContainer) {
                observer.unobserve(scrollContainer);
            }
        };
    }, []);
    useEffect(() => {
        if (isAutoScrolling) {
            const interval = setInterval(() => {
                if (scrollContainerRef.current) {
                    const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
                    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
                        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                }
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isAutoScrolling]);

    return (
        <div className="relative w-full py-2 space-y-2 mt-10 select-none">
            <span className={`${montserrat_Subrayada.className} lg:text-2xl text-xl ml-10 md:[word-spacing:15px] text-center w-full hyphens-auto [word-spacing:5px]`}>{title}</span>
            <div ref={scrollContainerRef} className="w-full space-x-4 overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth px-10">
                {products.map((product, index) => (
                    <BlogCardComp product={product} key={index} />
                ))}
            </div>
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-neutral-700 shadow-md shadow-neutral-500 text-white text-xl px-2 py-8 rounded-r-md h-36" onClick={scrollLeft}>
                &#10094;
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-neutral-700 text-white px-2 py-8 text-xl rounded-l-md h-36 shadow-md shadow-neutral-500" onClick={scrollRight}>
                &#10095;
            </button>
        </div>
    );
};