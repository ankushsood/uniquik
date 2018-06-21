package com.uniquick.repository;

import org.springframework.data.repository.CrudRepository;

import com.uniquick.domain.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
	
	public Role findByRoleName(String roleName);

}
