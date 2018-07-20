package com.uniquick.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.uniquick.domain.Job;

public interface JobRepository extends CrudRepository<Job, Long> {
	
	List<Job>findByOrgUsername(String orgUsername);
	
	List<Job> findAll();
	
	@Query("select j from Job j where j.jobOccupation = :jobOccupation and j.jobIndustry = :jobIndustry and j.jobLocation = :jobLocation")
	List<Job> searchJobs(String jobOccupation, String jobIndustry, String jobLocation);
}
