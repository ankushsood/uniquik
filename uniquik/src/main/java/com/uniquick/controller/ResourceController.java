package com.uniquick.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.uniquick.domain.Candidate;
import com.uniquick.domain.Job;
import com.uniquick.domain.RandomCity;
import com.uniquick.domain.User;
import com.uniquick.service.GenericService;

@RestController
@RequestMapping("/springjwt")
public class ResourceController {
    @Autowired
    private GenericService userService;

    SimpleDateFormat sdfLastActive = new SimpleDateFormat("dd MMM yyyy");
    
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

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public List<Candidate> handleFileUpload(@RequestParam(value="file") MultipartFile excelfile) throws IOException {
		List<Candidate> candidateList = new ArrayList<>();
    	try {
    		int i = 0;
    		HSSFWorkbook workbook = new HSSFWorkbook(excelfile.getInputStream());
    		HSSFSheet worksheet = workbook.getSheetAt(0);
    		while (i <= worksheet.getLastRowNum()) {
    			Candidate candidate = new Candidate();
    			HSSFRow row = worksheet.getRow(i++);

    			candidate.setCandidateName(row.getCell(1).getStringCellValue());
    			candidate.setResumeId(row.getCell(2).getStringCellValue());
    			candidate.setPostalAddress(row.getCell(3).getStringCellValue());
    			candidate.setTelephoneNo(row.getCell(4).getStringCellValue());
    			candidate.setMobileNo(row.getCell(5).getStringCellValue());
    			candidate.setDateOfBirth(sdfLastActive.parse(row.getCell(6).getStringCellValue().replaceAll("'", "")));
    			candidate.setEmail(row.getCell(7).getStringCellValue());
    			candidate.setWorkExperience(row.getCell(8).getStringCellValue());
    			candidate.setResumeTitle(row.getCell(9).getStringCellValue());
    			candidate.setCurrentLocation(row.getCell(10).getStringCellValue());
    			candidate.setPreferredLocation(row.getCell(11).getStringCellValue());
    			candidate.setCurrentEmployer(row.getCell(12).getStringCellValue());
    			candidate.setCurrentDesignation(row.getCell(13).getStringCellValue());
    			
    			String salaryString = row.getCell(14).getStringCellValue();
    			salaryString = salaryString.replaceAll("INR ", "");
    			salaryString = salaryString.replaceAll(" Lac\\(s\\)", "");
    			Double d = Double.parseDouble(salaryString);
    			Long salary = (long)(d * 100000);
    			candidate.setAnnualSalary(salary);
    			candidate.setUgCourse(row.getCell(15).getStringCellValue());
    			candidate.setPGCourse(row.getCell(16).getStringCellValue());
    			candidate.setPPGCourse(row.getCell(17).getStringCellValue());
    			candidate.setLastActiveDate(sdfLastActive.parse(row.getCell(18).getStringCellValue().replaceAll("'", "")));
    			candidate.setComment1(row.getCell(19).getStringCellValue());
    			candidate.setSubuser1(row.getCell(20).getStringCellValue());
    			candidate.setTimestamp1(row.getCell(21).getStringCellValue());
    			candidate.setComment2(row.getCell(22).getStringCellValue());
    			candidate.setSubuser2(row.getCell(23).getStringCellValue());
    			candidate.setTimestamp2(row.getCell(24).getStringCellValue());
    			candidate.setComment3(row.getCell(25).getStringCellValue());
    			candidate.setSubuser3(row.getCell(26).getStringCellValue());
    			candidate.setTimestamp3(row.getCell(27).getStringCellValue());
    			candidate.setComment4(row.getCell(28).getStringCellValue());
    			candidate.setSubuser4(row.getCell(29).getStringCellValue());
    			candidate.setTimestamp4(row.getCell(30).getStringCellValue());
    			candidate.setComment5(row.getCell(31).getStringCellValue());
    			candidate.setSubuser5(row.getCell(32).getStringCellValue());
    			candidate.setTimestamp5(row.getCell(33).getStringCellValue());
    			candidateList.add(candidate);
    		}			
    		workbook.close();
    		userService.saveCandidates(candidateList);
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    	return candidateList;
    }
    
    @RequestMapping(value ="/deleteJob", method={RequestMethod.POST},consumes={"application/json" },produces={"application/json" })
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public List<Job> deleteJob( @RequestBody Job job){
        if(job.getId() != null){
        	userService.deleteJob(job.getId());
        	return userService.findJobsByOrg(job.getOrgUsername());
        }else{
        	return Collections.emptyList();
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
