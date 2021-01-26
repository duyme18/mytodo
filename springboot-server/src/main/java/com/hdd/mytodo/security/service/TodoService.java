package com.hdd.mytodo.security.service;

import java.util.List;

import com.hdd.mytodo.exception.ResourceNotFoundException;
import com.hdd.mytodo.model.Todo;

public interface TodoService {
	public Todo save(Todo todoItem);

	public List<Todo> findAll();

	public void delete(Long todoId);

	public Todo update(Long todoId, Todo todo) throws ResourceNotFoundException;
}
