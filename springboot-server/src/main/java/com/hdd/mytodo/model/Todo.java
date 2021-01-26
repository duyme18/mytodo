package com.hdd.mytodo.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class Todo {

	@Id
	@GeneratedValue
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String title;

	private Boolean completed = false;

    private Date createdAt = new Date();
}
