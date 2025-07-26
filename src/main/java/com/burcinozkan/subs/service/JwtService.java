package com.burcinozkan.subs.service;


import io.jsonwebtoken.*;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;


import java.security.Key;
import java.security.Signature;
import java.util.Date;

@Service
public class JwtService {

    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final long EXPIRATION_TIME = 1000*60*60*24;

    //TOKEN oluştur
    public static String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }
    //emaili tokendan çıkar

    public String extractEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    //token geçerli mi

    public boolean isTokenValid(String token, String email){
        try {
            String extractedEmail = extractEmail(token);
            return email.equals(extractedEmail) && !isTokenExpried(token);
        }catch (Exception e){
            return false;
        }
    }
    private boolean isTokenExpried(String token){
        Date expirationDate = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token).getBody().getExpiration();
        return expirationDate.before(new Date());
    }

    public String extractTokenFromRequest(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }

    public String extractUsername(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

}
