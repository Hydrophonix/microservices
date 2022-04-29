// Core
import { FC } from "react";

// Components
import { PageBackHeader } from "../../components";
import { CreatePostForm } from "./create-post-form";

// Elements
import { PageContainer } from "../../elements";

export const CreatePostPage: FC = () => {
    return (
        <PageContainer>
            <PageBackHeader>
                Create Post
            </PageBackHeader>

            <CreatePostForm />
        </PageContainer>
    );
};
