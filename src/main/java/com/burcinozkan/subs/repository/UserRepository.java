package com.burcinozkan.subs.repository;

import com.burcinozkan.subs.model.Subscription;
import com.burcinozkan.subs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long > {
    Optional<User> findByEmail(String email);
}
