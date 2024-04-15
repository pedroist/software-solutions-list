package com.softwaregini.backend.software.controller

import com.softwaregini.backend.software.model.*
import com.softwaregini.backend.software.model.responses.SoftwareSolutionUpdatesResponse
import com.softwaregini.backend.software.model.responses.MarkUpdatesAsSeenResponse
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping("/solutions")
class SoftwareSolutionController(
    private val softwareSolutionRepository: SoftwareSolutionRepository,
    private val softwareSolutionUpdateRepository: SoftwareSolutionUpdateRepository
) {
    @GetMapping
    fun getSoftwareSolutions(): Iterable<SoftwareSolution> {
        return softwareSolutionRepository.findAll()
    }

    @GetMapping("{softwareSolutionId}")
    fun getSoftwareSolutionUpdates(@PathVariable softwareSolutionId: UUID): SoftwareSolutionUpdatesResponse {
        val updates = softwareSolutionUpdateRepository.findBySoftwareSolutionIdOrderByUpdatedAtDesc(softwareSolutionId)
        val timestamp = Instant.now()
        return SoftwareSolutionUpdatesResponse(updates, timestamp)
    }

    @PatchMapping("/{softwareSolutionId}/updates")
    fun markUpdatesAsSeen(
        @PathVariable softwareSolutionId: UUID,
        @RequestParam timestamp: String
    ): MarkUpdatesAsSeenResponse {
        // Find updates associated with the software solution
        val updates = softwareSolutionUpdateRepository
            .findBySoftwareSolutionIdAndUpdatedAtBeforeAndSeenByUserIsFalse(
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