/**
 * The blog interface contain the Data to be used for blog card
 * 
 * @field id - The unique identifier
 * @field title - The title of the product
 * @field image - The image of the blog
 * @field link - The Link for the blog detail
 * @field data - The date of the blog
 * @field description - The short description of the blog 
 */
export interface BlogInterface {
    id: number;
    title: string;
    image: string;
    link: string;
    date: string;
    description: string;
}

