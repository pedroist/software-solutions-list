const baseUrl = "http://localhost:8080"
const softwareSolutionApi = {
    getSoftwareSolutions: () => fetch(`${baseUrl}/solutions`),
    getSoftwareSolutionUpdates: (softwareSolutionId: string) =>
        fetch(`${baseUrl}/solutions/${softwareSolutionId}`),
    getSoftwareSolutionUpdatesNumber: (softwareSolutionId: string) =>
        fetch(`${baseUrl}/solutions/${softwareSolutionId}/updatesNumber`),
    markUpdatesAsSeen: (softwareSolutionId: string, timestamp: string) =>
        fetch(
            `${baseUrl}/solutions/${softwareSolutionId}/updates?timestamp=${timestamp}`,
            {
                method: "PATCH",
            }
        ),
}

export default softwareSolutionApi
