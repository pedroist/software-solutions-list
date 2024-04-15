package com.softwaregini.backend.software.model

import org.springframework.data.repository.CrudRepository
import java.time.Instant
import java.util.*

interface SoftwareSolutionUpdateRepository : CrudRepository<SoftwareSolutionUpdate, UUID> {
    fun findBySoftwareSolutionIdOrderByUpdatedAtDesc(softwareSolutionId: UUID): List<SoftwareSolutionUpdate>

    fun findBySoftwareSolutionIdAndUpdatedAtBeforeAndSeenByUserIsFalse(
        softwareSolutionId: UUID,
        updatedAt: Instant
    ): List<SoftwareSolutionUpdate>
}