package com.hdd.mytodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.hdd.mytodo.model.Todo;

@RepositoryRestResource
public interface TodoRepository extends JpaRepository<Todo, Long> {

}
