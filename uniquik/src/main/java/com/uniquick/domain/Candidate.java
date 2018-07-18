package com.uniquick.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "candidate")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name_of_the_candidate")
    private String candidateName;
    @Column(name = "resume_id")
    private String resumeId;
    @Column(name = "postal_address")
    private String postalAddress;
    @Column(name = "telephone_no")
    private String telephoneNo;
    @Column(name = "mobile_no")
    private String mobileNo;
    @Column(name = "date_of_birth")
    private Date dateOfBirth;
    @Column(name = "email")
    private String email;
    @Column(name = "work_experience")
    private String workExperience;
    @Column(name = "resume_title")
    private String resumeTitle;
    @Column(name = "current_location")
    private String currentLocation;
    @Column(name = "preferred_location")
    private String preferredLocation;
    @Column(name = "current_employer")
    private String currentEmployer;
    @Column(name = "current_designation")
    private String currentDesignation;
    @Column(name = "annual_salary")
    private Long annualSalary;
    @Column(name = "ug_course")
    private String ugCourse;
    @Column(name = "p_g_course")
    private String PGCourse;
    @Column(name = "ppg_course")
    private String PPGCourse;
    @Column(name = "last_active_date")
    private Date lastActiveDate;
    @Column(name = "comment_1")
    private String comment1;
    @Column(name = "subuser_1")
    private String subuser1;
    @Column(name = "timestamp_1")
    private String timestamp1;
    @Column(name = "comment_2")
    private String comment2;
    @Column(name = "subuser_2")
    private String subuser2;
    @Column(name = "timestamp_2")
    private String timestamp2;
    @Column(name = "comment_3")
    private String comment3;
    @Column(name = "subuser_3")
    private String subuser3;
    @Column(name = "timestamp_3")
    private String timestamp3;
    @Column(name = "comment_4")
    private String comment4;
    @Column(name = "subuser_4")
    private String subuser4;
    @Column(name = "timestamp_4")
    private String timestamp4;
    @Column(name = "comment_5")
    private String comment5;
    @Column(name = "subuser_5")
    private String subuser5;
    @Column(name = "timestamp_5")
    private String timestamp5;
    
    @Column(name = "employment_details")
    private String employmentDetailsJSON;
    @Column(name = "qualification_details")
    private String qualificationDetailsJSON;
    
    
    @Transient
    private Integer matchedScore;
    
	public Integer getMatchedScore() {
		return matchedScore;
	}
	public void setMatchedScore(Integer matchedScore) {
		this.matchedScore = matchedScore;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCandidateName() {
		return candidateName;
	}
	public void setCandidateName(String candidateName) {
		this.candidateName = candidateName;
	}
	public String getResumeId() {
		return resumeId;
	}
	public void setResumeId(String resumeId) {
		this.resumeId = resumeId;
	}
	public String getPostalAddress() {
		return postalAddress;
	}
	public void setPostalAddress(String postalAddress) {
		this.postalAddress = postalAddress;
	}
	public String getTelephoneNo() {
		return telephoneNo;
	}
	public void setTelephoneNo(String telephoneNo) {
		this.telephoneNo = telephoneNo;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getWorkExperience() {
		return workExperience;
	}
	public void setWorkExperience(String workExperience) {
		this.workExperience = workExperience;
	}
	public String getResumeTitle() {
		return resumeTitle;
	}
	public void setResumeTitle(String resumeTitle) {
		this.resumeTitle = resumeTitle;
	}
	public String getCurrentLocation() {
		return currentLocation;
	}
	public void setCurrentLocation(String currentLocation) {
		this.currentLocation = currentLocation;
	}
	public String getPreferredLocation() {
		return preferredLocation;
	}
	public void setPreferredLocation(String preferredLocation) {
		this.preferredLocation = preferredLocation;
	}
	public String getCurrentEmployer() {
		return currentEmployer;
	}
	public void setCurrentEmployer(String currentEmployer) {
		this.currentEmployer = currentEmployer;
	}
	public String getCurrentDesignation() {
		return currentDesignation;
	}
	public void setCurrentDesignation(String currentDesignation) {
		this.currentDesignation = currentDesignation;
	}
	public Long getAnnualSalary() {
		return annualSalary;
	}
	public void setAnnualSalary(Long annualSalary) {
		this.annualSalary = annualSalary;
	}
	public String getUgCourse() {
		return ugCourse;
	}
	public void setUgCourse(String ugCourse) {
		this.ugCourse = ugCourse;
	}
	public String getPGCourse() {
		return PGCourse;
	}
	public void setPGCourse(String pGCourse) {
		PGCourse = pGCourse;
	}
	public String getPPGCourse() {
		return PPGCourse;
	}
	public void setPPGCourse(String pPGCourse) {
		PPGCourse = pPGCourse;
	}
	public Date getLastActiveDate() {
		return lastActiveDate;
	}
	public void setLastActiveDate(Date lastActiveDate) {
		this.lastActiveDate = lastActiveDate;
	}
	public String getComment1() {
		return comment1;
	}
	public void setComment1(String comment1) {
		this.comment1 = comment1;
	}
	public String getSubuser1() {
		return subuser1;
	}
	public void setSubuser1(String subuser1) {
		this.subuser1 = subuser1;
	}
	public String getTimestamp1() {
		return timestamp1;
	}
	public void setTimestamp1(String timestamp1) {
		this.timestamp1 = timestamp1;
	}
	public String getComment2() {
		return comment2;
	}
	public void setComment2(String comment2) {
		this.comment2 = comment2;
	}
	public String getSubuser2() {
		return subuser2;
	}
	public void setSubuser2(String subuser2) {
		this.subuser2 = subuser2;
	}
	public String getTimestamp2() {
		return timestamp2;
	}
	public void setTimestamp2(String timestamp2) {
		this.timestamp2 = timestamp2;
	}
	public String getComment3() {
		return comment3;
	}
	public void setComment3(String comment3) {
		this.comment3 = comment3;
	}
	public String getSubuser3() {
		return subuser3;
	}
	public void setSubuser3(String subuser3) {
		this.subuser3 = subuser3;
	}
	public String getTimestamp3() {
		return timestamp3;
	}
	public void setTimestamp3(String timestamp3) {
		this.timestamp3 = timestamp3;
	}
	public String getComment4() {
		return comment4;
	}
	public void setComment4(String comment4) {
		this.comment4 = comment4;
	}
	public String getSubuser4() {
		return subuser4;
	}
	public void setSubuser4(String subuser4) {
		this.subuser4 = subuser4;
	}
	public String getTimestamp4() {
		return timestamp4;
	}
	public void setTimestamp4(String timestamp4) {
		this.timestamp4 = timestamp4;
	}
	public String getComment5() {
		return comment5;
	}
	public void setComment5(String comment5) {
		this.comment5 = comment5;
	}
	public String getSubuser5() {
		return subuser5;
	}
	public void setSubuser5(String subuser5) {
		this.subuser5 = subuser5;
	}
	public String getTimestamp5() {
		return timestamp5;
	}
	public void setTimestamp5(String timestamp5) {
		this.timestamp5 = timestamp5;
	}

	
}
