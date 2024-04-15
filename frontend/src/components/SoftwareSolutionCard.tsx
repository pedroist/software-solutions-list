import { Badge, Card, Typography } from "@mui/material"
import SoftwareSolution from "../types/SoftwareSolution"
import SoftwareSolutionUpdatesDialog from "./SoftwareSolutionUpdatesDialog"
import { useEffect, useState } from "react"
import softwareSolutionApi from "../api/softwareSolutionApi"
import MarkUpdatesAsSeenResponse from "../types/markUpdatesAsSeenResponse"

interface Props {
    softwareSolution: SoftwareSolution
}

function SoftwareSolutionCard({ softwareSolution }: Props) {
    const [openUpdates, setOpenUpdates] = useState(false)

    const [timestamp, setTimestamp] = useState<string>("")

    const [updatesNumber, setUpdatesNumber] = useState<number>(
        softwareSolution.updatesNumber
    )

    // Update updatesNumber state when softwareSolution.updatesNumber prop changes - everytime solutions are fetched this component also will re-render
    useEffect(() => {
        setUpdatesNumber(softwareSolution.updatesNumber)
    }, [softwareSolution.updatesNumber])

    // Function to mark updates as seen
    const markUpdatesAsSeen = async () => {
        if (timestamp) {
            const data = await softwareSolutionApi.markUpdatesAsSeen(
                softwareSolution.id,
                timestamp
            )
            const response: MarkUpdatesAsSeenResponse = await data.json()
            setUpdatesNumber(response.unseenUpdatesNumber)
        }
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
