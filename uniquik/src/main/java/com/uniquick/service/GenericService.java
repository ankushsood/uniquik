package com.uniquick.service;

import java.util.List;

import com.uniquick.domain.Candidate;
import com.uniquick.domain.Job;
import com.uniquick.domain.Organization;
import com.uniquick.domain.RandomCity;
import com.uniquick.domain.Role;
import com.uniquick.domain.User;

public interface GenericService {
    User findByUsername(String username);

    List<User> findAllUsers();

    List<RandomCity> findAllRandomCities();
    
    Organization saveOrganization(Organization organization);
    
    User saveUser(User user);
    
    Role findRoleByName(String roleName);

    Job saveJob(Job job);
    
    List<Job> findJobsByOrg(String orgUsername);
    
    Iterable<Job> findAllJobs();

    User findUserByUsername(String orgUsername);
    
    void deleteJob(long id);
    
    Job getJobById(long id);
    
    Iterable<Candidate> saveCandidates(List<Candidate> candidates);
}
