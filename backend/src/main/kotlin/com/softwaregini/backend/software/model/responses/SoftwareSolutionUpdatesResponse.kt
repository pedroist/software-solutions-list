package com.softwaregini.backend.software.model.responses

import com.softwaregini.backend.software.model.SoftwareSolutionUpdate
import java.time.Instant

data class SoftwareSolutionUpdatesResponse(
    val updates: Iterable<SoftwareSolutionUpdate>,
    val timestamp: Instant
)
