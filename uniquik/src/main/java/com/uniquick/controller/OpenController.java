package com.uniquick.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
}
