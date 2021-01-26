package com.hdd.mytodo.controller;

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
import com.hdd.mytodo.security.service.TodoService;

@RunWith(MockitoJUnitRunner.class)
public class TodoControllerTest {

	@InjectMocks
	TodoController subject;

	@Mock
	TodoService todoService;

	@Test
	public void testCreatedTodoItemReturnsSavedTodoItem() {
		final Todo todoRequest = new Todo();
		final Todo todoResponse = new Todo();
		todoResponse.setId(100L);

		when(todoService.save(todoRequest)).thenReturn(todoResponse);

		assertThat(subject.createTodo(todoRequest).getId(), equalTo(100L));

	}

	@Test
	public void testFindAllShouldReturnPopulatedList() {
		final List<Todo> todos = new ArrayList<Todo>();

		final Todo todo = new Todo();
		todo.setDescription("I am a todo list item");
		todo.setId(100L);

		todos.add(todo);

		when(todoService.findAll()).thenReturn(todos);

		final List<Todo> result = subject.findAll();

		assertThat(result.size(), equalTo(1));
	}

	@Test
	public void testDeleteShouldCallDeleteFunction() {
		final long idToDelete = 42L;

		doNothing().when(todoService).delete(idToDelete);

		subject.delete(idToDelete);

		verify(todoService).delete(idToDelete);
	}

	@Test
	public void testUpdateShouldReturnUpdatedTodoItem() throws ResourceNotFoundException {
		final long idToUpdate = 42L;

		final Todo todoRequest = new Todo();
		todoRequest.setId(idToUpdate);
		todoRequest.setDescription("old description");

		final Todo todoResponse = new Todo();
		todoResponse.setId(idToUpdate);
		todoResponse.setDescription("updated description");

		when(todoService.update(idToUpdate, todoRequest)).thenReturn(todoResponse);

		Todo response = subject.update(idToUpdate, todoRequest);
		assertThat(response.getId(), equalTo(42L));
		assertThat(response.getDescription(), equalTo("updated description"));
	}
}
