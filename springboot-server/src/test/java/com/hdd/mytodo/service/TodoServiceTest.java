package com.hdd.mytodo.service;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.hdd.mytodo.exception.ResourceNotFoundException;
import com.hdd.mytodo.model.Todo;
import com.hdd.mytodo.repository.TodoRepository;
import com.hdd.mytodo.security.service.TodoServiceImpl;

@RunWith(MockitoJUnitRunner.class)
public class TodoServiceTest {

	@InjectMocks
	TodoServiceImpl subject;

	@Mock
	TodoRepository todoRepository;

	@Test
	public void testSaveShouldReturntodo() {
		final Todo todo = new Todo();
		todo.setDescription("This is a task");

		final Todo todoResponse = new Todo();
		todoResponse.setId(100L);
		todoResponse.setDescription("This is a task");

		when(todoRepository.save(todo)).thenReturn(todoResponse);

		final Todo response = subject.save(todo);
		assertThat(response.getId(), equalTo(100L));
		assertThat(response.getDescription(), equalTo("This is a task"));

	}

	@Test
	public void testFindAllShouldReturnList() {
		final List<Todo> todos = new ArrayList<Todo>();

		final Todo todo = new Todo();
		todo.setDescription("I am a todo list item");
		todo.setId(100L);

		todos.add(todo);

		when(todoRepository.findAll()).thenReturn(todos);

		final List<Todo> result = subject.findAll();

		assertThat(result.size(), equalTo(1));
	}

	@Test
	public void deleteShouldCallDeleteRepository() {
		final long idToDelete = 42L;

		doNothing().when(todoRepository).deleteById(idToDelete);

		subject.delete(idToDelete);

		verify(todoRepository).deleteById(idToDelete);
	}

	@Test
	public void testShouldReturnUpdatedtodo() throws ResourceNotFoundException {
		long idToUpdate = 42L;

		final Todo newtodo = new Todo();
		newtodo.setDescription("I am a todo list item");
		newtodo.setId(42L);

		final Todo oldtodo = new Todo();
		oldtodo.setDescription("I am old");
		oldtodo.setId(42L);

		when(todoRepository.findById(idToUpdate).orElseThrow()).thenReturn(oldtodo);
		when(todoRepository.save(oldtodo)).thenReturn(newtodo);

		Todo response = subject.update(idToUpdate, newtodo);

		assertThat(response.getDescription(), equalTo("I am a todo list item"));
		assertThat(response.getId(), equalTo(42L));
	}
}
