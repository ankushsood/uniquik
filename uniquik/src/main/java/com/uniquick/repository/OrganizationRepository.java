package com.uniquick.repository;

import org.springframework.data.repository.CrudRepository;

import com.uniquick.domain.Organization;

public interface OrganizationRepository extends CrudRepository<Organization, Long> {
}
