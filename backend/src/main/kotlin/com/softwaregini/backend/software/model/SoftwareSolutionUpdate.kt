package com.softwaregini.backend.software.model

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "software_solution_updates")
class SoftwareSolutionUpdate(
    @Id
    val id: UUID = UUID.randomUUID(),
    val softwareSolutionId: UUID,
    val update: String,
    var seenByUser: Boolean,
    val updatedAt: Instant = Instant.now()
)