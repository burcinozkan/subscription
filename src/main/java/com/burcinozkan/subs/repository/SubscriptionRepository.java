package com.burcinozkan.subs.repository;

import com.burcinozkan.subs.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository  extends JpaRepository <Subscription, Long>{

    List<Subscription> findByUserId(Long userId);

}
