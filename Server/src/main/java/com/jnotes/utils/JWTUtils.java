package com.jnotes.utils;

import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class JWTUtils {

    // 7 days expiration (milliseconds)
    private static final long EXPIRATION_TIME = 1000L * 60 * 60 * 24 * 7;

    private final String secretKey = "aiWt3wGg74oSC/py7nb6P00qu3i5CjgCml95f7fQguA=";

    public JWTUtils() {

    }
    
    public String generateToken(UserDetails userDetails) {
        Algorithm algorithm = Algorithm.HMAC256(this.secretKey);
        System.out.println("generating toiken");
        return JWT.create()
                .withIssuer("auth0")
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withClaim("name", userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(algorithm);
    }

    public String extractUsername(String token) {
        //return extractClaims(token, Claims::getSubject);
        DecodedJWT decoded = extractClaims(token);
        String decodedJWT = decoded.getClaim("name").asString();
        return decodedJWT;
    }

    private DecodedJWT extractClaims(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(this.secretKey))
                .withIssuer("auth0")
                .build();
        return verifier.verify(token);
    }

    public boolean isValidToken(String token, UserDetails userDetails) {
        DecodedJWT decoded = extractClaims(token);
        final String username = decoded.getClaim("name").asString();
        return (username.equals(userDetails.getUsername()) && isTokenExpired(decoded));
    }

    private boolean isTokenExpired(DecodedJWT token) {
        return !((token.getExpiresAt()).before(new Date()));
    }

}
