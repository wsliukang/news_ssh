package cn.lk.newsssh.bean;

import java.util.Date;

import javax.persistence.Entity;

/**
 * News entity. @author MyEclipse Persistence Tools
 */

@Entity
public class News implements java.io.Serializable {

	// Fields

	private Integer id;
	private String title;
	private String content;
	private Date tjdate;
	private String cruser;
	private Integer hitnum;

	// Constructors

	/** default constructor */
	public News() {
	}

	/** full constructor */
	public News(String title, String content, Date tjdate, String cruser,
			Integer hitnum) {
		this.title = title;
		this.content = content;
		this.tjdate = tjdate;
		this.cruser = cruser;
		this.hitnum = hitnum;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getTjdate() {
		return this.tjdate;
	}

	public void setTjdate(Date tjdate) {
		this.tjdate = tjdate;
	}

	public String getCruser() {
		return this.cruser;
	}

	public void setCruser(String cruser) {
		this.cruser = cruser;
	}

	public Integer getHitnum() {
		return this.hitnum;
	}

	public void setHitnum(Integer hitnum) {
		this.hitnum = hitnum;
	}

}