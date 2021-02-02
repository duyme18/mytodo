package com.hdd.mytodo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hdd.mytodo.model.User;
import com.hdd.mytodo.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	@DeleteMapping(value = "/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
		return userRepository.findById(id).map(user -> {
			userRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}
