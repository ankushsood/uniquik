package com.uniquick.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uniquick.domain.Job;
import com.uniquick.domain.Organization;
import com.uniquick.domain.RandomCity;
import com.uniquick.domain.Role;
import com.uniquick.domain.User;
import com.uniquick.repository.JobRepository;
import com.uniquick.repository.OrganizationRepository;
import com.uniquick.repository.RandomCityRepository;
import com.uniquick.repository.RoleRepository;
import com.uniquick.repository.UserRepository;
import com.uniquick.service.GenericService;

@Service
public class GenericServiceImpl implements GenericService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RandomCityRepository randomCityRepository;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private JobRepository jobRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> findAllUsers() {
        return (List<User>)userRepository.findAll();
    }

    @Override
    public List<RandomCity> findAllRandomCities() {
        return (List<RandomCity>)randomCityRepository.findAll();
    }
    
    @Override
    public Organization saveOrganization(Organization organization) {
    	return organizationRepository.save(organization);
    }
    
    @Override
    public User saveUser(User user) {
    	return userRepository.save(user);
    }
    
    public Role findRoleByName(String roleName){
    	
    	return roleRepository.findByRoleName(roleName);
    }
    
    @Override
    public Job saveJob(Job job) {
    	return jobRepository.save(job);
    }
    
    @Override
    public List<Job> findJobsByOrg(String orgUsername) {
    	return jobRepository.findByOrgUsername(orgUsername);
    }
    
	@Override
	public User findUserByUsername(String orgUsername) {
		return userRepository.findByUsername(orgUsername);
	}
    
	@Override
	public void deleteJob(long id) {
		jobRepository.delete(id);
	}
    
	@Override
	public Job getJobById(long id) {
		return jobRepository.findOne(id);
	}
	
	@Override
	public Iterable<Job> findAllJobs() {
		return jobRepository.findAll();
	}
}
