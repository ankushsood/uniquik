package com.uniquick.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.uniquick.domain.Job;
import com.uniquick.domain.RandomCity;
import com.uniquick.domain.User;
import com.uniquick.repository.JobRepository;
import com.uniquick.service.GenericService;

@RestController
@RequestMapping("/springjwt")
public class ResourceController {
    @Autowired
    private GenericService userService;

    @RequestMapping(value ="/cities")
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    public List<RandomCity> getUser(){
        return userService.findAllRandomCities();
    }

    @RequestMapping(value ="/users", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public List<User> getUsers(){
        return userService.findAllUsers();
    }
    
    @RequestMapping(value ="/user/{orgUsername:.+}",  method={RequestMethod.GET},consumes={"application/json" },produces={"application/json" })
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    public User getUserByName(@PathVariable("orgUsername") String orgUsername){
        return userService.findByUsername(orgUsername);
    }
    
    @RequestMapping(value ="/saveJob", method={RequestMethod.POST},consumes={"application/json" },produces={"application/json" })
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public Job saveJob( @RequestBody Job job){
        if(job.getId() != null){
        	Job dbJob = userService.getJobById(job.getId());
        	if(dbJob != null){
        		dbJob.setJobAnnualCompensation(job.getJobAnnualCompensation());
        		dbJob.setJobClosingDate(job.getJobClosingDate());
        		dbJob.setJobDescription(job.getJobDescription());
        		dbJob.setJobDesignation(job.getJobDesignation());
        		dbJob.setJobEmail(job.getJobEmail());
        		dbJob.setJobEmploymentType(job.getJobEmploymentType());
        		dbJob.setJobLocation(job.getJobLocation());
        		dbJob.setJobMaxExp(job.getJobMaxExp());
        		dbJob.setJobMinExp(job.getJobMinExp());
        		dbJob.setJobTag(job.getJobTag());
        		dbJob.setJobTitle(job.getJobTitle());
        		return userService.saveJob(dbJob);
        	}
        }else{
        	return userService.saveJob(job);
        }
        return null;
    }

    @RequestMapping(value ="/deleteJob", method={RequestMethod.POST},consumes={"application/json" },produces={"application/json" })
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public List<Job> deleteJob( @RequestBody Job job){
        if(job.getId() != null){
        	Job dbJob = userService.getJobById(job.getId());
        	userService.deleteJob(job.getId());
        	return userService.findJobsByOrg(job.getOrgUsername());
        }else{
        	return Collections.EMPTY_LIST;
        }
    }

    
    @RequestMapping(value ="/findJobs/{orgUsername:.+}",  method={RequestMethod.GET},consumes={"application/json" },produces={"application/json" })
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    public List<Job> getJobs(@PathVariable("orgUsername") String orgUsername ){
        return userService.findJobsByOrg(orgUsername);
    }

    @RequestMapping(value ="/findAllJobs",  method={RequestMethod.GET},consumes={"application/json" },produces={"application/json" })
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public Iterable<Job> getAllJobs(){
        return userService.findAllJobs();
    }

}
