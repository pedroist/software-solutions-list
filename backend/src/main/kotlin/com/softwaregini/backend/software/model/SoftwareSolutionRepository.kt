package com.softwaregini.backend.software.model

import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface SoftwareSolutionRepository : CrudRepository<SoftwareSolution, UUID>