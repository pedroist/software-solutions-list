package com.softwaregini.backend

import com.softwaregini.backend.software.model.SoftwareSolution
import com.softwaregini.backend.software.model.SoftwareSolutionRepository
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component

// creates software solution mock data on application startup
@Component
class SoftwareSolutionDataMock(
    private val softwareSolutionRepository: SoftwareSolutionRepository
) : ApplicationListener<ApplicationReadyEvent> {
    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        if (softwareSolutionRepository.count() > 0) return
        (1..3).forEach {
            softwareSolutionRepository.save(
                SoftwareSolution(
                    name = "Software Solution $it",
                    updatesNumber = 0
                )
            )
        }
    }
}