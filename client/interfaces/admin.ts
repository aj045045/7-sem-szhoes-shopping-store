/**
 * The interface used for welcoming a user with their post or role and name.
 * 
 * @field post - The role of the user
 * @field name - The name of the user
 */
export interface WelcomeUserInterface {
    post: string;
    name: string;
}

/**
 * The interface used for Tabs for Table showing
 * 
 * @field icon - React SVG icon
 * @field title - The title of the Tabs
 * @field data - The Data contain the row and columns
 */
export interface DetailTabsInterface {
    icon?: React.ReactNode;
    title: string;
    data: {
        columns: { key: string, label: string }[];
        rows: {
            key: string;
            [key: string]: string;
        }[];
    }
}