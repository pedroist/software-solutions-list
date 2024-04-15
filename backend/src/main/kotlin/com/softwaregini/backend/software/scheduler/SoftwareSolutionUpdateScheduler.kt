package com.softwaregini.backend.software.scheduler

import com.softwaregini.backend.software.model.SoftwareSolution
import com.softwaregini.backend.software.model.SoftwareSolutionRepository
import com.softwaregini.backend.software.model.SoftwareSolutionUpdate
import com.softwaregini.backend.software.model.SoftwareSolutionUpdateRepository
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service

// scheduler creates random software solution updates every 30 seconds
@Service
class SoftwareSolutionUpdateScheduler(
    private val softwareSolutionRepository: SoftwareSolutionRepository,
    private val softwareSolutionUpdateRepository: SoftwareSolutionUpdateRepository,
) {
    @Scheduled(fixedRate = 1000L *5L/* * 30L*/)
    fun createRandomSoftwareSolutionUpdate() {
        softwareSolutionRepository.findAll().shuffled().firstOrNull()?.let { softwareSolution ->
            val updateCount =
                softwareSolutionUpdateRepository.findBySoftwareSolutionIdOrderByUpdatedAtDesc(softwareSolution.id).size
            softwareSolutionUpdateRepository.save(
                SoftwareSolutionUpdate(
                    softwareSolutionId = softwareSolution.id,
                    update = "Automatic update ${updateCount + 1}",
                    seenByUser = false
                )
            )
            
            incrementUpdatesNumber(softwareSolution)
        }
    }

    private fun incrementUpdatesNumber(softwareSolution: SoftwareSolution) {
        softwareSolution.updatesNumber++
        softwareSolutionRepository.save(softwareSolution)
    }
}