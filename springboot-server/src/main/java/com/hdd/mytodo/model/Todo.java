package com.hdd.mytodo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Todo {

	@Id
	@GeneratedValue
	private Long id;
	private String description;
	private Boolean completed;

}
