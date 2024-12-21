import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * The Component for that is used for markdown Section page
 * 
 * @param markdownString - The String for the markdown
 * @returns 
 */
export function MarkDownConverterComp({ markdownString }: { markdownString: string; }) {
    return (
        <div className="prose max-w-full prose-pre:bg-neutral-300 prose-pre:border-2 prose-pre:border-neutral-400 prose-pre:text-black prose-blockquote:bg-neutral-300 prose-blockquote:border-l-4 prose-blockquote:border-l-neutral-400 prose-blockquote:rounded-e-sm hover:prose-a:text-blue-500 prose-thead:border-b-neutral-400 select-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownString}
            </ReactMarkdown>
        </div>
    )

}