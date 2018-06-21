package com.uniquick.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.uniquick.domain.Job;

public interface JobRepository extends CrudRepository<Job, Long> {
	
	List<Job>findByOrgUsername(String orgUsername);
}
