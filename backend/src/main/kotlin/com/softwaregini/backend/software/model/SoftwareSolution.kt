package com.softwaregini.backend.software.model

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "software_solutions")
class SoftwareSolution(
    @Id
    val id: UUID = UUID.randomUUID(),
    val name: String,
    var updatesNumber: Int
)