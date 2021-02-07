package com.hdd.mytodo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hdd.mytodo.model.Todo;
import com.hdd.mytodo.model.User;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
	List<Todo> findByUser(User user);
}
