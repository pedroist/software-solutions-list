package com.softwaregini.backend.software.controller

import com.softwaregini.backend.software.model.*
import com.softwaregini.backend.software.model.responses.SoftwareSolutionUpdatesResponse
import com.softwaregini.backend.software.model.responses.MarkUpdatesAsSeenResponse
import com.softwaregini.backend.software.service.SoftwareSolutionService
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping("/solutions")
class SoftwareSolutionController(
    private val softwareSolutionRepository: SoftwareSolutionRepository,
    private val softwareSolutionUpdateRepository: SoftwareSolutionUpdateRepository,
    private val softwareSolutionService: SoftwareSolutionService
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
        return softwareSolutionService.markUpdatesAsSeen(softwareSolutionId, timestamp)
    }
}