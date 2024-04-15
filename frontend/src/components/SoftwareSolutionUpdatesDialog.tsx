import SoftwareSolutionUpdate from "../types/SoftwareSolutionUpdate"
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material"
import SoftwareSolutionUpdateItem from "./SoftwareSolutionUpdateItem"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import softwareSolutionApi from "../api/softwareSolutionApi"
import SoftwareSolution from "../types/SoftwareSolution"
import SoftwareSolutionUpdatesResponse from "../types/SoftwareSolutionUpdatesResponse"

interface Props {
    softwareSolution: SoftwareSolution
    open: boolean
    onClose: () => void
    setTimestamp: Dispatch<SetStateAction<string>>
}

function SoftwareSolutionUpdatesDialog({
    softwareSolution,
    open,
    onClose,
    setTimestamp,
}: Props) {
    const [softwareSolutionUpdates, setSoftwareSolutionUpdates] = useState<
        SoftwareSolutionUpdate[]
    >([])
    useEffect(() => {
        const fetchUpdates = async () => {
            const data = await softwareSolutionApi.getSoftwareSolutionUpdates(
                softwareSolution.id
            )
            const response =
                (await data.json()) as SoftwareSolutionUpdatesResponse
            setSoftwareSolutionUpdates(
                response.updates as SoftwareSolutionUpdate[]
            )
            setTimestamp(response.timestamp)
        }
        if (open) {
            fetchUpdates()
        }
    }, [softwareSolution.id, open])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{softwareSolution.name} - Updates</DialogTitle>
            <DialogContent>
                <Box mt={2} display={"flex"} flexDirection={"column"} gap={3}>
                    {softwareSolutionUpdates.map((update) => (
                        <div key={update.id}>
                            <SoftwareSolutionUpdateItem
                                softwareSolutionUpdate={update}
                            />
                        </div>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default SoftwareSolutionUpdatesDialog
