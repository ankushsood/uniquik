package com.uniquick.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    
    @RequestMapping(value ="/findMatchingCandidates", method={RequestMethod.POST},consumes={"application/json" },produces={"application/json" })
    @PreAuthorize("hasAuthority('STANDARD_USER')")
    public List<Candidate> findMatchingCandidates( @RequestBody Job job){
        	return userService.findMatchingCandidates(job);
    }
    
    

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public List<Candidate> handleFileUpload( @RequestBody String excelfile) throws IOException {
    	 
    	
    	HashMap<String, Candidate> candidateEmails = new HashMap<>();
    	InputStream targetStream = new ByteArrayInputStream(Base64.getDecoder().decode(excelfile));

    	
    	
		List<Candidate> candidateList = new ArrayList<>();
    	try {
    		int i = 3;
    		XSSFWorkbook workbook = new XSSFWorkbook(targetStream);
    		XSSFSheet worksheet = workbook.getSheetAt(0);
    		while (i <= worksheet.getLastRowNum()) {
    			Candidate candidate = new Candidate();
    			XSSFRow row = worksheet.getRow(i++);

    			candidate.setCandidateName(getCellValue(row, 1));
    			candidate.setResumeId(getCellValue(row, 2));
    			candidate.setPostalAddress(getCellValue(row, 3));
    			candidate.setTelephoneNo(getCellValue(row, 4));
    			candidate.setMobileNo(getCellValue(row, 5));
    			candidate.setDateOfBirth(getDateFromString(getCellValue(row, 6).replaceAll("'", "")));
    			candidate.setEmail(getCellValue(row, 7));
    			
    			String exp = getCellValue(row, 8);
    			exp = exp.toLowerCase().replace(" year(s) ", ":").replace(" month(s)", "");
    			Integer totalMonths = (Integer.parseInt(exp.split(":")[0].trim())) * 12;
    			totalMonths = totalMonths+ (Integer.parseInt(exp.split(":")[1].trim()));
    			
    			candidate.setWorkExperience(totalMonths.toString());
    			candidate.setResumeTitle(getCellValue(row, 9));
    			candidate.setCurrentLocation(getCellValue(row, 10));
    			candidate.setPreferredLocation(getCellValue(row, 11));
    			candidate.setCurrentEmployer(getCellValue(row, 12));
    			candidate.setCurrentDesignation(getCellValue(row, 13));
    			
    			String salaryString = getCellValue(row, 14);
    			salaryString = salaryString.replaceAll("INR ", "");
    			salaryString = salaryString.replaceAll(" Lac\\(s\\)", "");
    			Double d = Double.parseDouble(salaryString);
    			Long salary = (long)(d * 100000);
    			candidate.setAnnualSalary(salary);
    			candidate.setUgCourse(getCellValue(row, 15));
    			candidate.setPGCourse(getCellValue(row, 16));
    			candidate.setPPGCourse(getCellValue(row, 17));
    			candidate.setLastActiveDate(getDateFromString(getCellValue(row, 18).replaceAll("'", "")));
    			candidate.setComment1(getCellValue(row, 19));
    			candidate.setSubuser1(getCellValue(row, 20));
    			candidate.setTimestamp1(getCellValue(row, 21));
    			candidate.setComment2(getCellValue(row, 22));
    			candidate.setSubuser2(getCellValue(row, 23));
    			candidate.setTimestamp2(getCellValue(row, 24));
    			candidate.setComment3(getCellValue(row, 25));
    			candidate.setSubuser3(getCellValue(row, 26));
    			candidate.setTimestamp3(getCellValue(row, 27));
    			candidate.setComment4(getCellValue(row, 28));
    			candidate.setSubuser4(getCellValue(row, 29));
    			candidate.setTimestamp4(getCellValue(row, 30));
    			candidate.setComment5(getCellValue(row, 31));
    			candidate.setSubuser5(getCellValue(row, 32));
    			candidate.setTimestamp5(getCellValue(row, 33));
    			candidateEmails.put(candidate.getEmail(), candidate);
    		}			
    		workbook.close();

    		List<Candidate> dbCandidateList = userService.findbyEmail(candidateEmails.keySet());

    		for(Candidate dbCandidate : dbCandidateList){
				Candidate candidate = candidateEmails.get(dbCandidate.getEmail());
				candidateEmails.remove(dbCandidate.getEmail());
				if(candidate != null){
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
				}
    		}
    		
    		for(Entry<String, Candidate> entry : candidateEmails.entrySet()){
    			if(entry.getValue() != null){
    				candidateList.add(entry.getValue());
    			}
    		}
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
    
    private String getCellValue(XSSFRow row, int cellId){
    	Cell c = row.getCell(cellId);
    	
		if(c != null ){
			if(c.getCellType() == Cell.CELL_TYPE_NUMERIC){
	    		return Long.valueOf((long)c.getNumericCellValue()).toString();
	    	}else{
	    		return c.getStringCellValue() == null ?  "" :c.toString();
			} 
		}
    	
    	return "";
    }
    
    private Date getDateFromString(String dateFormat) throws ParseException{
    	if(dateFormat.equals(""))return null;
    	
    	return this.sdfLastActive.parse(dateFormat);	
    }
}
