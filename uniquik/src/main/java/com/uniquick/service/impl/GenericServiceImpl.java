package com.uniquick.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.uniquick.domain.Candidate;
import com.uniquick.domain.Job;
import com.uniquick.domain.JobApplication;
import com.uniquick.domain.Organization;
import com.uniquick.domain.RandomCity;
import com.uniquick.domain.Role;
import com.uniquick.domain.User;
import com.uniquick.repository.CandidateRepository;
import com.uniquick.repository.JobApplicationRepository;
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
    private JobApplicationRepository jobApplicationRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RandomCityRepository randomCityRepository;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private CandidateRepository candidateRepository;

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
	public List<Job> findAllJobs() {
		return jobRepository.findAll();
	}
	
	@Override
	public Iterable<Candidate> saveCandidates(List<Candidate> candidates) {
		return candidateRepository.save(candidates);
	}
	
	@Override
	public List<Candidate> findbyEmail(Set<String> candidates) {
		return candidateRepository.findByEmail(candidates);
	}
	
	@Override
	public List<Candidate> findMatchingCandidates(Job job) {
		List<Candidate> matchedCandidates = new ArrayList<>();
		Iterable<Candidate> candidates = candidateRepository.findAll();
		
		for (Candidate candidate : candidates) {
			Integer matchedScore = 0;
			
			Integer totalWorkExp = 0 ;
			if(candidate.getWorkExperience().contains("Month"))
			{
				String exp = candidate.getWorkExperience();
    			exp = exp.toLowerCase().replace(" year(s) ", ":").replace(" month(s)", "");
    			totalWorkExp = (Integer.parseInt(exp.split(":")[0].trim())) * 12;
    			totalWorkExp = totalWorkExp + (Integer.parseInt(exp.split(":")[1].trim()));
			}else {
				totalWorkExp = Integer.parseInt(candidate.getWorkExperience()); 
			}
			
			if((job.getJobMaxExp() * 12) >= totalWorkExp && (job.getJobMinExp() * 12) <= totalWorkExp ) {
				matchedScore++;
			} else{
				continue;
			}

			if(job.getJobAnnualCompensation() >= candidate.getAnnualSalary() ) {
				matchedScore++;
			}else {
				continue;
			}

			String jobLocationArr []= job.getJobLocation().split(",");
			for (int i = 0; i < jobLocationArr.length; i++) {
				if(candidate.getPreferredLocation().toLowerCase().contains(jobLocationArr[i].toLowerCase())){
					matchedScore++;
					break;
				}
			}
			
			String jobTags []= job.getJobTag().split(",");
			for (int i = 0; i < jobTags.length; i++) {
				if(candidate.getResumeTitle().toLowerCase().contains(jobTags[i]) 
						|| candidate.getCurrentDesignation().toLowerCase().contains(jobTags[i])
						|| candidate.getPGCourse().toLowerCase().contains(jobTags[i])
						|| candidate.getPPGCourse().toLowerCase().contains(jobTags[i])){
					matchedScore++;
					break;
				}
			}
			
			if(matchedScore  > 0){
				candidate.setMatchedScore(matchedScore);
				matchedCandidates.add(candidate);
			}
		}
		
		Collections.sort(matchedCandidates , new SortbyMatchingScore());
		return matchedCandidates;
	}
	
	class SortbyMatchingScore implements Comparator<Candidate>
	{
	    public int compare(Candidate a, Candidate b)
	    {
	        return b.getMatchedScore().compareTo(a.getMatchedScore());
	    }
	}

	@Override
	public Candidate saveCandidate(Candidate candidate) {
		return candidateRepository.save(candidate);
	}
	
	@Override
	public Candidate getCandidateById(long id) {
		return candidateRepository.findOne(id);
	}
	
	@Override
	public List<Job> searchJobs(String searchIndustry, String searchOccupation, String searchLocation) {
		return jobRepository.searchJobs(searchOccupation, searchIndustry, searchLocation);
	}
	@Override
	public Candidate getCandidateByEmail(String email) {
		Set<String> emails = new HashSet<>();
		emails.add(email);
		return candidateRepository.findByEmail(emails).get(0);
	}
	
	@Override
	public List<Job> findCandidateMatchingJobs(Candidate candidate) {
		List<Job> dbJobs = findAllJobs();
		List<Job> matchedJobs = new ArrayList<>();
		List<JobApplication> jobApps = jobApplicationRepository.findByCandidateUsername(candidate.getEmail());
		boolean alreadyApplied = false;
		for (Job job : dbJobs) {
			alreadyApplied = false;
			for (JobApplication jobApplication : jobApps) {
				if(job.getId().equals(jobApplication.getJobId())){
					alreadyApplied = true;
				}
			}
			if(alreadyApplied)
				continue;
			if(!StringUtils.isEmpty(candidate.getPreferredIndustry()) && candidate.getPreferredIndustry().contains(job.getJobIndustry()) ){
				matchedJobs.add(job);
				continue;
			}
			if(!StringUtils.isEmpty(candidate.getEmploymentDetailsJSON()) && candidate.getEmploymentDetailsJSON().contains(job.getJobIndustry()) ){
				matchedJobs.add(job);
				continue;
			}
			if(!StringUtils.isEmpty(candidate.getPreferredOccupation()) && candidate.getPreferredOccupation().contains(job.getJobOccupation()) ){
				matchedJobs.add(job);
				continue;
			}
			if(!StringUtils.isEmpty(candidate.getExpOccupation()) && candidate.getExpOccupation().contains(job.getJobOccupation()) ){
				matchedJobs.add(job);
				continue;
			}
			if(!StringUtils.isEmpty(job.getJobLocation()) ){
				String loc [] = job.getJobLocation().split(",");
				for (int i = 0; i < loc.length; i++) {
					if(candidate.getPreferredLocation().contains(loc[i])){
						matchedJobs.add(job);
						break;
					}
				}
				continue;
			}
		}
		return matchedJobs;
	}
	
	@Override
	public JobApplication applyToJob(Long jobId, String candidateUsername) {
		
		List<JobApplication> dbJobApplication = jobApplicationRepository.findByCandidateUsername(candidateUsername);
		for (JobApplication jobApplication : dbJobApplication) {
			if(jobApplication.getJobId().equals(jobId)){
				return null;
			}
		}
		
		Job dbJob = jobRepository.findOne(jobId);
		if(dbJob == null)
			return null;
		
		JobApplication jobApp = new JobApplication();
		jobApp.setAppliedDate(new Date());
		jobApp.setCandidateUsername(candidateUsername);
		jobApp.setJobId(jobId);
		jobApp.setLastUpdated(new Date());
		jobApp.setStatusText("Job Application Submitted Successfully.");
		jobApp.setJobTitle(dbJob.getJobTitle());
		return jobApplicationRepository.save(jobApp);
	}
	@Override
	public List<JobApplication> findByCandidate(String candidateUsername) {
		return jobApplicationRepository.findByCandidateUsername(candidateUsername);
	}

	@Override
	public List<JobApplication> findByJobId(Long jobId) {
		return jobApplicationRepository.findByJobId(jobId);
	}
	

	@Override
	public Job findJobDetails(Long jobId) {
		return jobRepository.findOne(jobId);
	}
}