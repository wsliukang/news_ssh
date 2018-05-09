package cn.lk.newsssh.bean;

import java.util.List;
import java.util.Map;

/**
 * @author CharlesLiu
 *
 */
public class EasyUITree {
	private String id;
    private String text;
    private Boolean checked = false;
    private Map<String,Object> attributes;
    private String state = "closed";
    public List<EasyUITree> children;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Boolean getChecked() {
		return checked;
	}
	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	public Map<String, Object> getAttributes() {
		return attributes;
	}
	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public List<EasyUITree> getChildren() {
		return children;
	}
	public void setChildren(List<EasyUITree> children) {
		this.children = children;
	}   
    
}
