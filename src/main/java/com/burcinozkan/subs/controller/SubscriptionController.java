package com.burcinozkan.subs.controller;

import com.burcinozkan.subs.model.Subscription;
import com.burcinozkan.subs.service.SubscriptionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = " * ")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping
    public List<Subscription> getMySubscriptions(HttpServletRequest request) {
        return subscriptionService.getUserSubscriptions(request);
    }

    @PostMapping
    public Subscription save(@RequestBody Subscription subscription, HttpServletRequest request) {
        return subscriptionService.saveSubscription(request, subscription);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subscription> updateSubscription(
            @PathVariable Long id,
            @RequestBody Subscription updated) {

        return ResponseEntity.ok(subscriptionService.updateSubscription(id, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubscription(@PathVariable Long id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.ok().build();
    }
}
