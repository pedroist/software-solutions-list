import { Box, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import softwareSolutionApi from "../api/softwareSolutionApi"
import SoftwareSolutionCard from "./SoftwareSolutionCard"
import SoftwareSolution from "../types/SoftwareSolution"

function SoftwareSolutionSection() {
    const [softwareSolutions, setSoftwareSolutions] = useState<
        SoftwareSolution[]
    >([])

    useEffect(() => {
        const fetchSolutions = async () => {
            const data = await softwareSolutionApi.getSoftwareSolutions()
            const solutions = (await data.json()) as SoftwareSolution[]
            setSoftwareSolutions(solutions)
        }
        //Fetch Solutions every few seconds
        const interval = setInterval(fetchSolutions, 4000)

        // Clear interval on component unmount
        return () => clearInterval(interval)
    }, [])

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
                {softwareSolutions.map((softwareSolution) => (
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
