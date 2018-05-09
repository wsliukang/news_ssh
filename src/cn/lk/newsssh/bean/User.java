package cn.lk.newsssh.bean;

import javax.persistence.Entity;

/**
 * User entity. @author MyEclipse Persistence Tools
 */

@Entity
public class User implements java.io.Serializable {

	// Fields

	private String uid;
	private String xm;
	private String pwd;
	private String bj;
	private String role;

	// Constructors

	/** default constructor */
	public User() {
	}

	/** full constructor */
	public User(String uid, String xm, String pwd, String bj, String role) {
		this.uid = uid;
		this.xm = xm;
		this.pwd = pwd;
		this.bj = bj;
		this.role = role;
	}

	// Property accessors

	public String getUid() {
		return this.uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getXm() {
		return this.xm;
	}

	public void setXm(String xm) {
		this.xm = xm;
	}

	public String getPwd() {
		return this.pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getBj() {
		return this.bj;
	}

	public void setBj(String bj) {
		this.bj = bj;
	}

	public String user() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getRole() {
		return role;
	}
	
	

}