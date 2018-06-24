package com.uniquick.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.uniquick.domain.Candidate;

public interface CandidateRepository extends CrudRepository<Candidate, Long> {
	
	@Query("select c from Candidate c where c.email in (:emails)")
	List<Candidate> findByEmail(@Param("emails") Set<String> emails);
}
