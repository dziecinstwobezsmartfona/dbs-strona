import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { jsxConverter } from "@/components/ArticleContent/converters";


type Props = {
    data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>;


export const ArticleContent = (props: Props) => {

    const { className, ...rest } = props;

    return (
        <RichText
            {...rest}
            className={className}
            converters={jsxConverter}
        />
    );

};
