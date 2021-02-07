package com.hdd.mytodo.model;

import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@Table(name = "todo")
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class Todo {

	@Id
	@GeneratedValue
	private Long id;

	private String title;

	private Boolean completed = false;

    private Date createdAt = new Date();

	@JsonIgnore
	@OneToMany(mappedBy = "todo", cascade = CascadeType.ALL)
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Collection<Comment> comments;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private User user;
	
}
