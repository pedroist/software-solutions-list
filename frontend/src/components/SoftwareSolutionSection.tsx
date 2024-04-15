import { Box, Container, Typography } from "@mui/material"
import SoftwareSolutionCard from "./SoftwareSolutionCard"
import { useSoftwareSolutionsWithRefreshInterval } from "../api/softwareSolutionApi"

function SoftwareSolutionSection() {
    const { data: softwareSolutions } =
        useSoftwareSolutionsWithRefreshInterval()

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant={"h4"} component={"h1"} mb={2}>
                Solutions
            </Typography>
            <Box
                display={"grid"}
                gridTemplateColumns={"repeat(3, 1fr)"}
                gap={2}
            >
                {(softwareSolutions || []).map((softwareSolution) => (
                    <SoftwareSolutionCard
                        key={softwareSolution.id}
                        softwareSolution={softwareSolution}
                    />
                ))}
            </Box>
        </Container>
    )
}

export default SoftwareSolutionSection
