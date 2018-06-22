DROP DATABASE IF EXISTS 'uniquick';
CREATE DATABASE 'uniquick';
USE 'uniquick';
# TABLE: uniquick.app_role
CREATE TABLE 'app_role' (
  'id' bigint(20) NOT NULL AUTO_INCREMENT,
  'description' varchar(255) DEFAULT NULL,
  'role_name' varchar(255) DEFAULT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
# TABLE: uniquick.app_user
CREATE TABLE 'app_user' (
  'id' bigint(20) NOT NULL AUTO_INCREMENT,
  'first_name' varchar(255) NOT NULL,
  'last_name' varchar(255) NOT NULL,
  'password' varchar(255) NOT NULL,
  'username' varchar(255) NOT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
# TABLE: uniquick.candidate
CREATE TABLE 'candidate' (
  'id' bigint(20) NOT NULL AUTO_INCREMENT,
  'first_name' varchar(1255) NOT NULL,
  'last_name' varchar(1255) NOT NULL,
  'email' varchar(1255) NOT NULL,
  'phone' varchar(1255) NOT NULL,
  'address' varchar(10000) NOT NULL,
  'qualification' bigint(20) NOT NULL,
  'experience' bigint(20) NOT NULL,
  'current_salary' bigint(20) NOT NULL,
  'expected_salay' bigint(20) NOT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
# TABLE: uniquick.candidate_experience
CREATE TABLE 'candidate_experience' (
  'id' bigint(20) NOT NULL AUTO_INCREMENT,
  'candidate_Id' bigint(20) DEFAULT NULL,
  'company_name' varchar(1255) NOT NULL,
  'joining_date' varchar(1255) NOT NULL,
  'relieving_date' varchar(1255) NOT NULL,
  'designation' varchar(1255) NOT NULL,
  'role' varchar(10000) NOT NULL,
  'remarks' varchar(10000) NOT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
# TABLE: uniquick.candidate_Qualification
CREATE TABLE 'candidate_Qualification' (
  'id' bigint(20) NOT NULL AUTO_INCREMENT,
  'Candidate_Id' bigint(20) DEFAULT NULL,
  'Qualification_Title' varchar(1255) NOT NULL,
  'Passing_Year' varchar(1255) NOT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
# TABLE: uniquick.job
CREATE TABLE 'job' (
  'id' bigint(20) NOT NULL AUTO_INCREMENT,
  'org_username' varchar(5000) DEFAULT NULL,
  'job_email' varchar(5000) DEFAULT NULL,
  'job_title' varchar(5000) DEFAULT NULL,
  'job_description' varchar(30000) DEFAULT NULL,
  'job_location' varchar(5000) DEFAULT NULL,
  'job_min_exp' int(11) DEFAULT NULL,
  'job_max_exp' int(11) DEFAULT NULL,
  'job_designation' varchar(5000) DEFAULT NULL,
  'job_employment_type' varchar(500) DEFAULT NULL,
  'job_annual_compensation' bigint(20) DEFAULT NULL,
  'job_tag' varchar(5000) DEFAULT NULL,
  'job_closing_date' date DEFAULT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
# TABLE: uniquick.organization
CREATE TABLE 'organization' (
  'org_name' varchar(5000) DEFAULT NULL,
  'org_website' varchar(5000) DEFAULT NULL,
  'org_email' varchar(5000) DEFAULT NULL,
  'org_details' varchar(10000) DEFAULT NULL,
  'id' bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY ('id')
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
# TABLE: uniquick.random_city
CREATE TABLE 'random_city' (
  'id' bigint(20) NOT NULL AUTO_INCREMENT,
  'name' varchar(255) DEFAULT NULL,
  PRIMARY KEY ('id')
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
# TABLE: uniquick.user_role
CREATE TABLE 'user_role' (
  'user_id' bigint(20) NOT NULL,
  'role_id' bigint(20) NOT NULL,
  KEY 'FK859n2jvi8ivhui0rl0esws6o' ('user_id'),
  KEY 'FKa68196081fvovjhkek5m97n3y' ('role_id')
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
