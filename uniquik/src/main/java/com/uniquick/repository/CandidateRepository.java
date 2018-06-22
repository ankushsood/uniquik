package com.uniquick.repository;

import org.springframework.data.repository.CrudRepository;

import com.uniquick.domain.Candidate;

public interface CandidateRepository extends CrudRepository<Candidate, Long> {
	
}
