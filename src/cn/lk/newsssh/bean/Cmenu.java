package cn.lk.newsssh.bean;

import javax.persistence.Entity;



/**
 * Cmenu entity. @author MyEclipse Persistence Tools
 */

@Entity
public class Cmenu implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer pid;
	private String name;
	private String url;
	private String permission;

	// Constructors

	/** default constructor */
	public Cmenu() {
	}

	/** minimal constructor */
	public Cmenu(Integer pid, String name) {
		this.pid = pid;
		this.name = name;
	}

	/** full constructor */
	public Cmenu(Integer pid, String name, String url, String permission) {
		this.pid = pid;
		this.name = name;
		this.url = url;
		this.permission = permission;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPid() {
		return this.pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPermission() {
		return this.permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

}