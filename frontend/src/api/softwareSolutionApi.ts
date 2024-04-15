import useSWR, { mutate } from "swr"
import useMutation from "use-mutation"
import { get, HTTPError, patch } from "./apiUtils"
import SoftwareSolution from "../types/SoftwareSolution"
import SoftwareSolutionUpdatesResponse from "../types/SoftwareSolutionUpdatesResponse"
import MarkUpdatesAsSeenResponse from "../types/MarkUpdatesAsSeenResponse"
import MarkUpdatesAsSeenInput from "../types/MarkUpdatesAsSeenInput"

const baseUrl = "http://localhost:8080"

export const useSoftwareSolutions = () => {
    return useSWR<SoftwareSolution[], HTTPError>(`${baseUrl}/solutions`, get)
}

export const useSoftwareSolutionUpdates = (softwareSolutionId: string) => {
    return useSWR<SoftwareSolutionUpdatesResponse, HTTPError>(
        `${baseUrl}/solutions/${softwareSolutionId}`,
        get
    )
}

const markUpdatesAsSeen = ({
    softwareSolutionId,
    timestamp,
}: MarkUpdatesAsSeenInput) =>
    patch<MarkUpdatesAsSeenResponse>(
        `${baseUrl}/solutions/${softwareSolutionId}/updates?timestamp=${timestamp}`
    )

export const useMarkUpdatesAsSeen = () =>
    useMutation<MarkUpdatesAsSeenInput, MarkUpdatesAsSeenResponse>(
        markUpdatesAsSeen,
        {
            onSuccess({ input: { softwareSolutionId } }) {
                mutate(`${baseUrl}/solutions`)
                mutate(`${baseUrl}/solutions/${softwareSolutionId}`)
            },
        }
    )
