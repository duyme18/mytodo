package com.hdd.mytodo.controller;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hdd.mytodo.exception.ResourceNotFoundException;
import com.hdd.mytodo.model.Todo;
import com.hdd.mytodo.model.User;
import com.hdd.mytodo.repository.TodoRepository;
import com.hdd.mytodo.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class TodoController {

	@Autowired
	private TodoRepository todoRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/todos")
	public List<Todo> getAllTodos() {
		return todoRepository.findAll();
	}

	@GetMapping(value = "/todos/user/{userId}")
	public ResponseEntity<?> findByUser(@PathVariable Long userId) throws ResourceNotFoundException {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));

		List<Todo> todos = todoRepository.findByUser(user);
		return ResponseEntity.ok().body(todos);
	}

	@PostMapping("/todos/{userId}")
	public Todo createTodo(@PathVariable Long userId, @RequestBody Todo todo) throws ResourceNotFoundException {

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));

		todo.setUser(user);
		todo.setCompleted(false);
		return todoRepository.save(todo);
	}

	@GetMapping(value = "/todos/{id}")
	public ResponseEntity<Todo> getTodoById(@PathVariable("id") Long id) {
		return todoRepository.findById(id).map(todo -> ResponseEntity.ok().body(todo))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping(value = "/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable("id") Long id, @Valid @RequestBody Todo todo) {
		Date now = new Date();
		return todoRepository.findById(id).map(todoData -> {
			todoData.setTitle(todo.getTitle());
			todoData.setCreatedAt(now);
			todoData.setCompleted(todo.getCompleted());
			Todo updatedTodo = todoRepository.save(todoData);
			return ResponseEntity.ok().body(updatedTodo);
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping(value = "/todos/{id}")
	public ResponseEntity<?> deleteTodo(@PathVariable("id") Long id) {
		return todoRepository.findById(id).map(todo -> {
			todoRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}

}
