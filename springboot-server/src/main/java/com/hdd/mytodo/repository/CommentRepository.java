package com.hdd.mytodo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hdd.mytodo.model.Comment;
import com.hdd.mytodo.model.Todo;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
	List<Comment> findByTodo(Todo todo);
}
