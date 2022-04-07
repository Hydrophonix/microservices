// Core
import { Typography } from "@mui/material";

import { FC }                        from "react";
import { PageContainer, PageHeader } from "../../elements";

export const HomePage: FC = () => {
    return (
        <PageContainer>
            <PageHeader>
                Home page
            </PageHeader>

            <Typography>
                Add basic info about project
            </Typography>
        </PageContainer>
    );
};
