package com.hdd.mytodo.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hdd.mytodo.exception.ResourceNotFoundException;
import com.hdd.mytodo.model.Todo;
import com.hdd.mytodo.repository.TodoRepository;

@Service
public class TodoServiceImpl implements TodoService {

	@Autowired
	TodoRepository todoRepository;

	@Override
	public Todo save(Todo todo) {
		return this.todoRepository.save(todo);
	}

	@Override
	public List<Todo> findAll() {
		return todoRepository.findAll();
	}

	@Override
	public void delete(Long todoId) {
		todoRepository.deleteById(todoId);
	}

	@Override
	public Todo update(Long todoId, Todo todo) throws ResourceNotFoundException {

		Todo todoToUpdate = todoRepository.findById(todoId)
				.orElseThrow(() -> new ResourceNotFoundException("todo not found for this id :: " + todoId));

		todoToUpdate.setDescription(todo.getDescription());

		return this.save(todoToUpdate);

	}
}
