package com.uniquick.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.uniquick.domain.JobApplication;

public interface JobApplicationRepository extends CrudRepository<JobApplication, Long> {
	List<JobApplication>findByCandidateUsername(String candidateUsername);
	
	List<JobApplication>findByJobId(Long jobId);
	
	
}
