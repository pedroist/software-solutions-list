package com.softwaregini.backend.software.service

import com.softwaregini.backend.software.model.SoftwareSolutionRepository
import com.softwaregini.backend.software.model.SoftwareSolutionUpdateRepository
import com.softwaregini.backend.software.model.responses.MarkUpdatesAsSeenResponse
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.util.*

@Service
class SoftwareSolutionService(
    private val softwareSolutionRepository: SoftwareSolutionRepository,
    private val softwareSolutionUpdateRepository: SoftwareSolutionUpdateRepository
) {
    @Transactional
    fun markUpdatesAsSeen(softwareSolutionId: UUID, timestamp: String): MarkUpdatesAsSeenResponse {
        // Find updates associated with the software solution
        val updates = softwareSolutionUpdateRepository.findBySoftwareSolutionIdAndUpdatedAtBeforeAndSeenByUserIsFalse(
            softwareSolutionId,
            Instant.parse(timestamp)
        )

        // Number of updates being marked as seen
        val updatesMarkedAsSeenCount = updates.size

        // Mark updates as seen
        updates.forEach { it.seenByUser = true }
        softwareSolutionUpdateRepository.saveAll(updates)

        // Update the updatesNumber field in the SoftwareSolution entity
        val softwareSolution = softwareSolutionRepository.findById(softwareSolutionId).orElseThrow()
        softwareSolution.updatesNumber -= updatesMarkedAsSeenCount
        val unseenUpdatesNumber = softwareSolution.updatesNumber

        softwareSolutionRepository.save(softwareSolution)

        return MarkUpdatesAsSeenResponse(unseenUpdatesNumber)
    }
}
