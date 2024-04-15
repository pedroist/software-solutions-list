import SoftwareSolutionUpdate from "../types/SoftwareSolutionUpdate"
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material"
import SoftwareSolutionUpdateItem from "./SoftwareSolutionUpdateItem"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import softwareSolutionApi, {
    useSoftwareSolutionUpdates,
} from "../api/softwareSolutionApi"
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
    const { data: softwareSolutionUpdatesResponse } =
        useSoftwareSolutionUpdates(softwareSolution.id)

    // Save the timeStamp response in the parent component, which needs it when the modal is closed
    useEffect(() => {
        if (
            softwareSolutionUpdatesResponse &&
            softwareSolutionUpdatesResponse.timestamp
        ) {
            setTimestamp(softwareSolutionUpdatesResponse.timestamp)
        }
    }, [softwareSolutionUpdatesResponse, setTimestamp])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{softwareSolution.name} - Updates</DialogTitle>
            <DialogContent>
                <Box mt={2} display={"flex"} flexDirection={"column"} gap={3}>
                    {(softwareSolutionUpdatesResponse?.updates || []).map(
                        (update) => (
                            <div key={update.id}>
                                <SoftwareSolutionUpdateItem
                                    softwareSolutionUpdate={update}
                                />
                            </div>
                        )
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default SoftwareSolutionUpdatesDialog
