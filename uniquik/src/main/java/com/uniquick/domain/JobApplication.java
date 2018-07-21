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
@Table(name = "jobApplication")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "job_id")
    private Long jobId;
    @Column(name = "candidate_user_name")
    private String candidateUsername;
    @Column(name = "applied_date")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date appliedDate;
    @Column(name = "status_text")
    private String statusText;
    @Column(name = "last_updated")
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date lastUpdated;
    @Column(name = "Job_title")
    private String jobTitle;

    
    public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getJobId() {
		return jobId;
	}
	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
	public String getCandidateUsername() {
		return candidateUsername;
	}
	public void setCandidateUsername(String candidateUsername) {
		this.candidateUsername = candidateUsername;
	}
	public Date getAppliedDate() {
		return appliedDate;
	}
	public void setAppliedDate(Date appliedDate) {
		this.appliedDate = appliedDate;
	}
	public String getStatusText() {
		return statusText;
	}
	public void setStatusText(String statusText) {
		this.statusText = statusText;
	}
	public Date getLastUpdated() {
		return lastUpdated;
	}
	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}
}
