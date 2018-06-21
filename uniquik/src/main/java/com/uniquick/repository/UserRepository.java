package com.uniquick.repository;

import org.springframework.data.repository.CrudRepository;

import com.uniquick.domain.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
