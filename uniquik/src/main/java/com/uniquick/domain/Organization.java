package com.uniquick.domain;

import javax.persistence.*;

@Entity
@Table(name = "organization")
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "org_name")
    private String orgName;
    @Column(name = "org_website")
    private String orgWebsite;
    @Column(name = "org_email")
    private String orgEmail;
    @Column(name = "org_details")
    private String orgDetails;
    @Transient
    private String password;

    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getOrgWebsite() {
		return orgWebsite;
	}
	public void setOrgWebsite(String orgWebsite) {
		this.orgWebsite = orgWebsite;
	}
	public String getOrgEmail() {
		return orgEmail;
	}
	public void setOrgEmail(String orgEmail) {
		this.orgEmail = orgEmail;
	}
	public String getOrgDetails() {
		return orgDetails;
	}
	public void setOrgDetails(String orgDetails) {
		this.orgDetails = orgDetails;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
   
}
