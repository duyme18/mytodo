package com.hdd.mytodo.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
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
import com.hdd.mytodo.model.Comment;
import com.hdd.mytodo.model.Todo;
import com.hdd.mytodo.repository.CommentRepository;
import com.hdd.mytodo.repository.TodoRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth/")
public class CommentController {

	@Autowired
	private TodoRepository todoRepository;

	@Autowired
	private CommentRepository commentRepository;

	@GetMapping("comments")
	public ResponseEntity<?> findAllComment() {
		
		Sort sortEntity = Sort.by(Direction.ASC,"id");
		List<Comment> comments = commentRepository.findAll(sortEntity);
		if (comments.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("comment/{id}")
	public ResponseEntity<?> getCommentById(@PathVariable Long id) throws ResourceNotFoundException {
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comment not found for this id :: " + id));

		return ResponseEntity.ok().body(comment);
	}

	@PostMapping("comment/{id}")
	public ResponseEntity<Comment> addComment(@PathVariable Long id, @RequestBody Comment comment)
			throws ResourceNotFoundException {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + id));

		LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String date = now.format(formatter);
        
		comment.setIsEdit(false);
		comment.setCommentDate(date);
		comment.setTodo(todo);
		commentRepository.save(comment);
		return new ResponseEntity<>(comment, HttpStatus.CREATED);
	}

	@PutMapping("comment/{id}")
	public ResponseEntity<Comment> updateComment(@PathVariable("id") Long id, @RequestBody Comment commentDetails)
			throws ResourceNotFoundException {

		LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String date = now.format(formatter);
        
		
		return commentRepository.findById(id).map(commentData ->{
			commentData.setContent(commentDetails.getContent());
			commentData.setCommentDate(date);
			Comment updatedComment = commentRepository.save(commentData);
			return ResponseEntity.ok().body(updatedComment);
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("comment/{id}")
	public Map<String, Boolean> deleteComment(@PathVariable Long id) throws ResourceNotFoundException {

		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comment not found for this id :: " + id));

		commentRepository.delete(comment);

		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);

		return response;

	}

	@GetMapping("todo/comments/{id}")
	public ResponseEntity<?> findByAuthor(@PathVariable Long id) throws ResourceNotFoundException {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + id));

		List<Comment> comments = commentRepository.findByTodo(todo);

		return ResponseEntity.ok().body(comments);
	}
	
}
