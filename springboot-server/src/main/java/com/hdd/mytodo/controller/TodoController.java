package com.hdd.mytodo.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

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
import com.hdd.mytodo.repository.TodoRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class TodoController {

	@Autowired
	private TodoRepository repository;

	public TodoController(TodoRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/todos")
	public Collection<Todo> getAll() {

		return repository.findAll().stream().collect(Collectors.toList());
	}

	@PostMapping(value = "/todo")
	public Todo add(@RequestBody Todo todo) {

		repository.save(todo);
		return todo;
	}

	@PutMapping(value = "/todo/{id}")
	public Todo update(@PathVariable("id") String id, @RequestBody Todo todo) {

		repository.save(todo);
		return todo;
	}

	@GetMapping("/todo/complete")
	public Collection<Todo> getComplete() {

		return repository.findAll().stream().filter(todo -> todo.getCompleted()).collect(Collectors.toList());
	}

	@GetMapping("/todo/pending")
	public Collection<Todo> getPending() {

		return repository.findAll().stream().filter(todo -> !todo.getCompleted()).collect(Collectors.toList());
	}

	@GetMapping(value = "/todo/{id}")
	public ResponseEntity<Todo> findById(@PathVariable("id") Long id) throws ResourceNotFoundException {

		Todo todo = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("todo not found for this id :: " + id));

		return ResponseEntity.ok().body(todo);
	}

	@DeleteMapping(value = "/todo/{id}")
	public Map<String, Boolean> deleteAuthor(@PathVariable Long id) throws ResourceNotFoundException {

		Todo todo = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + id));

		repository.delete(todo);

		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);

		return response;

	}

}
