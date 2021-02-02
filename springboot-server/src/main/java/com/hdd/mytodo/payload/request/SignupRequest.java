package com.hdd.mytodo.payload.request;

import java.util.Set;

import lombok.Data;
 
@Data
public class SignupRequest {

    private String username;
 
    private String fullname;
    
    private String phoneNumber;

    private String email;
    
    private Set<String> role;

    private String password;
 
}
