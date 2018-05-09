package cn.lk.newsssh.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.lk.newsssh.bean.News;
import cn.lk.newsssh.dao.BaseDao;

@Service
public class NewsService {

    @Resource
    private BaseDao<News> dao;     
    /////////////增///////////////////////////////////////////////////////
    public void addNews(News news) throws Exception{ 
        dao.save(news); 
    } 
    /////////////删///////////////////////////////////////////////////////
    public void deleteNews(int id,Class<News> news) throws Exception{ 
        News u =(News) dao.get(news, id); 
        dao.delete(u); 
    }
    /////////////改///////////////////////////////////////////////////////
    public void updateNews(News news) throws Exception{ 
        dao.update(news); 
    }
    /////////////查///////////////////////////////////////////////////////
    //按新闻标题分页查询
    public List<News> listDgNews(String title,int page,int rows){
        if(title == null || "".equals(title)) 
        	return dao.find("from News news order by news.tjdate desc", new Object[0], page, rows);
        else 
        	return dao.find("from News news WHERE news.title like ? order by news.tjdate desc", new Object[]{'%' +title+'%'}, page, rows);
    }
    //按id查询/阅读新闻
   public News getNews(Class<News> clazz, int id){ 
    News news=dao.get(clazz, id);
    news.setHitnum(news.getHitnum()+1);//点击量增加
    dao.update(news);
       return  news;
   } 
    //新闻记录数量
    public int getNewsCount(){ 
        try{
            Long a=dao.count("select count(*) from News");
        return  Integer.parseInt(a.toString());
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    } 
}
