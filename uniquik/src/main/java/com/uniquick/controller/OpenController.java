package com.uniquick.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.uniquick.domain.Candidate;
import com.uniquick.domain.Job;
import com.uniquick.domain.Organization;
import com.uniquick.domain.Role;
import com.uniquick.domain.User;
import com.uniquick.service.GenericService;

@RestController
@RequestMapping("/open")
public class OpenController {
    @Autowired
    private GenericService userService;

  
    @RequestMapping(value ="/saveOrganization", method={RequestMethod.POST},consumes={"application/json" },produces={"application/json" })
    public Organization saveUser( @RequestBody Organization organization){
        List<Role> standardUserRoles = new ArrayList<>();
       String encodedPass = new ShaPasswordEncoder(256).encodePassword(organization.getPassword(), null);        
        Role role = userService.findRoleByName("STANDARD_USER");
        standardUserRoles.add(role);
    	User user = new User();
        user.setFirstName(organization.getOrgName());
        user.setPassword(encodedPass);
        user.setUsername(organization.getOrgEmail());
        user.setRoles(standardUserRoles);
    	user.setLastName("");
    	userService.saveUser(user);
    	
    	return userService.saveOrganization(organization);
    }

    @RequestMapping(value ="/registerCandidate", method={RequestMethod.POST},consumes={"application/json" },produces={"application/json" })
    public Candidate registerCandidate( @RequestBody Candidate candidate){
        if(candidate.getId() != null){
        	Candidate dbCandidate = userService.getCandidateById(candidate.getId());
        	if(dbCandidate != null){
        		dbCandidate.setCandidateName(candidate.getCandidateName());
				dbCandidate.setResumeId(candidate.getResumeId());
				dbCandidate.setPostalAddress(candidate.getPostalAddress());
				dbCandidate.setTelephoneNo(candidate.getTelephoneNo());
				dbCandidate.setMobileNo(candidate.getMobileNo());
				dbCandidate.setDateOfBirth(candidate.getDateOfBirth());
				dbCandidate.setWorkExperience(candidate.getWorkExperience());
				dbCandidate.setResumeTitle(candidate.getResumeTitle());
				dbCandidate.setCurrentLocation(candidate.getCurrentLocation());
				dbCandidate.setPreferredLocation(candidate.getPreferredLocation());
				dbCandidate.setCurrentEmployer(candidate.getCurrentEmployer());
				dbCandidate.setCurrentDesignation(candidate.getCurrentDesignation());
				dbCandidate.setAnnualSalary(candidate.getAnnualSalary());
				dbCandidate.setUgCourse(candidate.getUgCourse());
				dbCandidate.setPGCourse(candidate.getPGCourse());
				dbCandidate.setPPGCourse(candidate.getPPGCourse());
				dbCandidate.setLastActiveDate(candidate.getLastActiveDate());
				dbCandidate.setComment1(candidate.getComment1());
				dbCandidate.setSubuser1(candidate.getSubuser1());
				dbCandidate.setTimestamp1(candidate.getTimestamp1());
				dbCandidate.setComment2(candidate.getComment2());
				dbCandidate.setSubuser2(candidate.getSubuser2());
				dbCandidate.setTimestamp2(candidate.getTimestamp2());
				dbCandidate.setComment3(candidate.getComment3());
				dbCandidate.setSubuser3(candidate.getSubuser3());
				dbCandidate.setTimestamp3(candidate.getTimestamp3());
				dbCandidate.setComment4(candidate.getComment4());
				dbCandidate.setSubuser4(candidate.getSubuser4());
				dbCandidate.setTimestamp4(candidate.getTimestamp4());
				dbCandidate.setComment5(candidate.getComment5());
				dbCandidate.setSubuser5(candidate.getSubuser5());
				dbCandidate.setTimestamp5(System.currentTimeMillis() + "");
				
				dbCandidate.setGender(candidate.getGender());
				dbCandidate.setEmploymentDetailsJSON(candidate.getEmploymentDetailsJSON());
				dbCandidate.setQualificationDetailsJSON(candidate.getQualificationDetailsJSON());
				dbCandidate.setNationality(candidate.getNationality());
				dbCandidate.setZip(candidate.getZip());
				dbCandidate.setExpOccupation(candidate.getExpOccupation());
				dbCandidate.setIsEmployed(candidate.getIsEmployed());
				dbCandidate.setResumePath(candidate.getResumePath());
				
				dbCandidate.setPreferredIndustry(candidate.getPreferredIndustry());
				dbCandidate.setPreferredOccupation(candidate.getPreferredOccupation());
				dbCandidate.setEngConversation(candidate.getEngConversation());
				dbCandidate.setEnglishReading(candidate.getEnglishReading());
				dbCandidate.setEngWriting(candidate.getEngWriting());
				dbCandidate.setJapTalking(candidate.getJapTalking());
				dbCandidate.setJapReading(candidate.getJapReading());
				dbCandidate.setJapWriting(candidate.getJapWriting());
				dbCandidate.setJlpt(candidate.getJlpt());
				dbCandidate.setToeic(candidate.getToeic());
				dbCandidate.setToefl(candidate.getToefl());
				
        		return userService.saveCandidate(dbCandidate);
        	}
        }else{
            List<Role> standardUserRoles = new ArrayList<>();
        	String encodedPass = new ShaPasswordEncoder(256).encodePassword(candidate.getCandidateName(), null);
        	Role role = userService.findRoleByName("STANDARD_USER");
        	standardUserRoles.add(role);
         	User user = new User();
            user.setFirstName(candidate.getCandidateName());
            user.setPassword(encodedPass);
            user.setUsername(candidate.getEmail());
            user.setRoles(standardUserRoles);
         	user.setLastName("");
         	userService.saveUser(user);
         	return userService.saveCandidate(candidate);
        }
        return null;
    }

    @RequestMapping(value ="/findAllJobs",  method={RequestMethod.GET}, produces={"application/json" })
    public List<Job> getJobs(){
        return userService.findAllJobs();
    }
}
