package cn.lk.newsssh.action;


import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import cn.lk.newsssh.bean.News;
import cn.lk.newsssh.service.NewsService;
import cn.lk.newsssh.utils.GsonUtils;
import cn.lk.newsssh.utils.MyUtils;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Controller("news")
public class NewsAct extends ActionSupport {

    @Resource 
    private NewsService newsService; 

    private News news;//一条新闻,来源于前端
    private int page,rows,id;//分页参数及新闻ID,来源于前端
    private String s_name; //查询的关键词：新闻标题,来源于前端
    private String jsonResult;
    private HashMap<String,Object> jsonobj=new HashMap<String,Object>();
///////////////////增/////////////////////////////////////////////////////////
    //请求跳转到添加新闻页面
    public String goAdd(){
        return "goadd";
    }
    //保存添加的新闻
    public String saveAdd(){ 
        jsonobj.clear();
        try { 
            news.setTjdate(new Date());//提交日期由后端生成
            news.setHitnum(0);
            newsService.addNews(news); 
            jsonobj.put("ok", true);
            jsonobj.put("msg", "goadmin");
        } catch (Exception e) { 
            e.printStackTrace(); 
            jsonobj.put("ok", false);
            jsonobj.put("msg", "系统错误2");
        }
        jsonResult = GsonUtils.toJson(jsonobj);
        HttpServletResponse response = ServletActionContext.getResponse();
        MyUtils.outPrint(response, jsonResult);
        return null; 
    } 
///////////////////删/////////////////////////////////////////////////////////
    //删除一条新闻
    public String doDel1(){
        jsonobj.clear();
        boolean delflag=false;
        try{
            newsService.deleteNews(id, News.class);
            delflag=true;
        }catch(Exception e){
            e.printStackTrace();
            delflag=false;
        }
        jsonobj.put("delflag", delflag);
        HttpServletResponse response = ServletActionContext.getResponse();
        MyUtils.outPrint(response, GsonUtils.toJson(jsonobj));
        return null;
    }
///////////////////改/////////////////////////////////////////////////////////
    //请求跳转到修改新闻页
    public String goEdit(){
        news=newsService.getNews(News.class, id);
        return "goedit";
    }
    //保存修改后的新闻
    public String saveEdit(){ 
        jsonobj.clear();
        try { 
            News news0=newsService.getNews(News.class, news.getId());
            news0.setContent(news.getContent());
            news0.setCruser(news.getCruser());
            news0.setTitle(news.getTitle());
            newsService.updateNews(news0);
            jsonobj.put("ok", true);
            jsonobj.put("msg", "goadmin");
        } catch (Exception e) { 
            e.printStackTrace(); 
            jsonobj.put("ok", false);
            jsonobj.put("msg", "系统错误2");
        }
        jsonResult = GsonUtils.toJson(jsonobj);
        HttpServletResponse response = ServletActionContext.getResponse();
        MyUtils.outPrint(response, jsonResult);
        return null; 
    } 
///////////////////查/////////////////////////////////////////////////////////
    //统计新闻总数量
    public String getnewsCount(){
        int c=0;
        try{    
            c=newsService.getNewsCount();
        }catch(Exception e){
            e.printStackTrace();
            c=0;
        }
        jsonobj.clear();
        jsonobj.put("newscount", c);
        jsonResult = GsonUtils.toJson(jsonobj);
        HttpServletResponse response = ServletActionContext.getResponse();
        MyUtils.outPrint(response, jsonResult);
        return null;
    }
  //请求跳转到后台新闻列表页
    public String goList(){
    return "golist";
    }
    //统计新闻总数量
    public String getCount(){
    int c=0;
    try{
    c=newsService.getNewsCount();
    }catch(Exception e){
    e.printStackTrace();
    c=0;
    }
    jsonobj.clear();
    jsonobj.put("newscount", c);
    jsonResult = MyUtils.toJson(jsonobj);
    HttpServletResponse response =
    ServletActionContext.getResponse();
    MyUtils.outPrint(response, jsonResult);
    return null;
    }
    //阅读一条新闻
    public String getaNews(){
    news=newsService.getNews(News.class, id);
    return "goread";
    }
    //分页查询新闻
    public String listNews(){
    List<News>newslist=newsService.listDgNews(s_name,page,rows);
    jsonobj.clear();
    jsonobj.put("total", newslist.size());
    jsonobj.put("rows", newslist);
    jsonResult = MyUtils.toJson(jsonobj);
    HttpServletResponse response =ServletActionContext.getResponse();
		MyUtils.outPrint(response, jsonResult);
		return null;
	}

	// /////////////////属性的get/set方法
	// /////////////////////////////////////////////////////
	//
	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

	public String getS_name() {
		return s_name;
	}

	public void setS_name(String s_name) {
		this.s_name = s_name;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
