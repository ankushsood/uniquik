package com.uniquick.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "job")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "org_username")
    private String orgUsername;
    @Column(name = "job_email")
    private String jobEmail;
    @Column(name = "job_title")
    private String jobTitle;
    @Column(name = "job_description")
    private String jobDescription;
    @Column(name = "job_location")
    private String jobLocation;
    @Column(name = "job_min_exp")
    private int jobMinExp;
    @Column(name = "job_max_exp")
    private int jobMaxExp;
    @Column(name = "job_designation")
    private String jobDesignation;
    @Column(name = "job_employment_type")
    private String jobEmploymentType;
    @Column(name = "job_annual_compensation")
    private Long jobAnnualCompensation;
    @Column(name = "job_tag")
    private String jobTag;
    @Column(name = "job_closing_date")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date jobClosingDate;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getOrgUsername() {
		return orgUsername;
	}
	public void setOrgUsername(String orgUsername) {
		this.orgUsername = orgUsername;
	}
	public String getJobEmail() {
		return jobEmail;
	}
	public void setJobEmail(String jobEmail) {
		this.jobEmail = jobEmail;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	public String getJobLocation() {
		return jobLocation;
	}
	public void setJobLocation(String jobLocation) {
		this.jobLocation = jobLocation;
	}
	public int getJobMinExp() {
		return jobMinExp;
	}
	public void setJobMinExp(int jobMinExp) {
		this.jobMinExp = jobMinExp;
	}
	public int getJobMaxExp() {
		return jobMaxExp;
	}
	public void setJobMaxExp(int jobMaxExp) {
		this.jobMaxExp = jobMaxExp;
	}
	public String getJobDesignation() {
		return jobDesignation;
	}
	public void setJobDesignation(String jobDesignation) {
		this.jobDesignation = jobDesignation;
	}
	public String getJobEmploymentType() {
		return jobEmploymentType;
	}
	public void setJobEmploymentType(String jobEmploymentType) {
		this.jobEmploymentType = jobEmploymentType;
	}
	public Long getJobAnnualCompensation() {
		return jobAnnualCompensation;
	}
	public void setJobAnnualCompensation(Long jobAnnualCompensation) {
		this.jobAnnualCompensation = jobAnnualCompensation;
	}
	public String getJobTag() {
		return jobTag;
	}
	public void setJobTag(String jobTag) {
		this.jobTag = jobTag;
	}
	public Date getJobClosingDate() {
		return jobClosingDate;
	}
	public void setJobClosingDate(Date jobClosingDate) {
		this.jobClosingDate = jobClosingDate;
	}
}
