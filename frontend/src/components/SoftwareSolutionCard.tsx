import { Badge, Card, Typography } from "@mui/material"
import SoftwareSolution from "../types/SoftwareSolution"
import SoftwareSolutionUpdatesDialog from "./SoftwareSolutionUpdatesDialog"
import { useEffect, useState } from "react"
import softwareSolutionApi from "../api/softwareSolutionApi"

interface Props {
    softwareSolution: SoftwareSolution
}

function SoftwareSolutionCard({ softwareSolution }: Props) {
    const [openUpdates, setOpenUpdates] = useState(false)

    const [timestamp, setTimestamp] = useState<string>("")

    const [updatesNumber, setUpdatesNumber] = useState<number>(
        softwareSolution.updatesNumber
    )

    useEffect(() => {
        // Update updatesNumber state when softwareSolution.updatesNumber prop changes
        setUpdatesNumber(softwareSolution.updatesNumber)
    }, [softwareSolution.updatesNumber])

    console.log("updatesNumberState", updatesNumber)

    // Function to mark updates as seen
    const markUpdatesAsSeen = async () => {
        console.log(timestamp)
        if (timestamp) {
            await softwareSolutionApi.markUpdatesAsSeen(
                softwareSolution.id,
                timestamp
            )
            fetchUpdatesNumber()
        }
    }

    const fetchUpdatesNumber = async () => {
        const data = await softwareSolutionApi.getSoftwareSolutionUpdatesNumber(
            softwareSolution.id
        )
        const updatesNumber = (await data.json()) as number
        setUpdatesNumber(updatesNumber)
    }

    return (
        <>
            <Badge
                badgeContent={updatesNumber}
                color="primary"
                invisible={softwareSolution.updatesNumber === 0}
            >
                <Card
                    sx={{
                        cursor: "pointer",
                        p: 2,
                        width: "-webkit-fill-available",
                    }}
                    onClick={() => setOpenUpdates(true)}
                >
                    <Typography>{softwareSolution.name}</Typography>
                </Card>
                <SoftwareSolutionUpdatesDialog
                    softwareSolution={softwareSolution}
                    open={openUpdates}
                    onClose={() => {
                        markUpdatesAsSeen()
                        setOpenUpdates(false)
                    }}
                    setTimestamp={setTimestamp}
                />
            </Badge>
        </>
    )
}

export default SoftwareSolutionCard
