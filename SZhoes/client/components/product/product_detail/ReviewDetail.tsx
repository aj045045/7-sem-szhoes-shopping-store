import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { ImageSize } from "./ImageSize";

/**
 * The component that is used to provide the detail review of the product by user
 * 
 * @param rate - The Rate of the product review
 * @param reviewImages - List of Images
 * @returns The Review detail of the product
 */
export function ReviewDetail({ rate, reviewImages }: { rate: number; reviewImages: any }) {
    const displayStar = () => {
        let display: React.ReactNode[] = [];
        let integerPart = Math.floor(rate);
        let fractionalPart = rate - integerPart;

        for (let i = 0; i < 5; i++) {
            if (i < integerPart) {
                display.push(<FaStar key={i} />);
            } else if (fractionalPart >= 0.5) {
                display.push(<FaStarHalfStroke key={i} />);
                fractionalPart = 0;
            } else {
                display.push(<FaRegStar key={i} />);
            }
        }
        return display;
    };
    return (
        <div className=" border-2 border-neutral-300 rounded-lg p-3 mr-10 space-y-2">
            <div className="flex flex-row items-center space-x-2">
                <div className="text-lg rounded-full bg-gradient-to-tl from-lime-400 to-orange-400 py-1 px-3">A</div>
                <div>Ansh Yadav</div>
            </div>
            <span className="flex flex-row space-x-1 text-medium text-orange-500">{displayStar()}</span>
            <span className="text-sm text-neutral-500">Review on Tue Jul 09 2024</span>
            <hr className="bg-neutral-400 w-full h-px max-w-6xl my-2" />
            <div className="text-sm [word-spacing:5px] tracking-wide">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis
            </div>
            <div className="flex flex-row space-x-2 overflow-auto pb-2">
                {reviewImages.map((product: string, index: number) => (
                    <ImageSize img={product} key={index} />
                ))}
            </div>
        </div>
    )
}