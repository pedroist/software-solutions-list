import SoftwareSolutionUpdate from "../types/SoftwareSolutionUpdate"
import { Badge, Card, Typography } from "@mui/material"

interface Props {
    softwareSolutionUpdate: SoftwareSolutionUpdate
}

function SoftwareSolutionUpdateItem({ softwareSolutionUpdate }: Props) {
    return (
        <Badge
            badgeContent={""}
            color="primary"
            invisible={softwareSolutionUpdate.seenByUser}
        >
            <Card sx={{ p: 1 }}>
                <Typography>{softwareSolutionUpdate.update}</Typography>
            </Card>
        </Badge>
    )
}

export default SoftwareSolutionUpdateItem
