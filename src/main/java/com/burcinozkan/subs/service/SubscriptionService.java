package com.burcinozkan.subs.service;

import com.burcinozkan.subs.model.Subscription;
import com.burcinozkan.subs.model.User;
import com.burcinozkan.subs.repository.SubscriptionRepository;
import com.burcinozkan.subs.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public SubscriptionService(SubscriptionRepository subscriptionRepository,
                               UserRepository userRepository,
                               JwtService jwtService) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public List<Subscription> getUserSubscriptions(HttpServletRequest request) {
        User user = getUserFromRequest(request);
        return subscriptionRepository.findByUserId(user.getId());
    }

    public Subscription saveSubscription(HttpServletRequest request, Subscription subscription) {
        User user = getUserFromRequest(request);
        subscription.setUser(user);
        return subscriptionRepository.save(subscription);
    }

    public Subscription updateSubscription(Long id, Subscription updated) {
        return subscriptionRepository.findById(id)
                .map(subscription -> {
                    subscription.setServiceName(updated.getServiceName());
                    subscription.setPrice(updated.getPrice());
                    subscription.setStartDate(updated.getStartDate());
                    subscription.setRecurrencePeriod(updated.getRecurrencePeriod());
                    return subscriptionRepository.save(subscription);
                })
                .orElseThrow(() -> new RuntimeException("Subscription not found with id: " + id));
    }

    public void deleteSubscription(Long id) {
        if (subscriptionRepository.existsById(id)) {
            subscriptionRepository.deleteById(id);
        } else {
            throw new RuntimeException("Subscription not found with id: " + id);
        }
    }

    private User getUserFromRequest(HttpServletRequest request) {
        String token = jwtService.extractTokenFromRequest(request);
        String email = jwtService.extractUsername(token);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}
