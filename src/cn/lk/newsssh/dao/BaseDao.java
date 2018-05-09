package cn.lk.newsssh.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@SuppressWarnings("all")
public class BaseDao<T>  {//泛型
    private SessionFactory sessionFactory;     
    public SessionFactory getSessionFactory() {  
        return sessionFactory;  
    }  

    @Autowired  
    public void setSessionFactory(SessionFactory sessionFactory) {  
        this.sessionFactory = sessionFactory;  
    }  
  //获取当前上下文一个session对象，当第一次使用此方法时，会自动产生一个session对象，并且连续使用多次时，得到的session都是同一个对象
    private Session getCurrentSession() {  
        return sessionFactory.getCurrentSession();  
    }
    /////////////增///////////////////////////////////////////////////////
    /** 
     * 保存一个对象 
     *  
     * @param o 
     * @return 
     */    
    public Serializable save(T o) {  
        return this.getCurrentSession().save(o);  
    }  
    /////////////删///////////////////////////////////////////////////////
    /** 
     * 删除一个对象 
     *  
     * @param o 
     */   
    public void delete(T o) {  
        this.getCurrentSession().delete(o);  
    }  
    /////////////改///////////////////////////////////////////////////////
    /** 
     * 更新一个对象 
     *  
     * @param o 
     */  
    public void update(T o) { 
        this.getCurrentSession().update(o);  
        //this.getCurrentSession().merge(o);
    }  
    /** 
     * 保存或更新对象 
     *  
     * @param o 
     */    
    public void saveOrUpdate(T o) {  
        this.getCurrentSession().saveOrUpdate(o);  
    }  
    /////////////查：若干对象、单个对象、记录数///////////////////////////////////////////////////////
    /** 
     * 查询 
     *  
     * @param hql 
     * @return 
     */    
    public List<T> find(String hql) {  
        return this.getCurrentSession().createQuery(hql).list();  
    }  
    /** 
     * 查询集合 
     *  
     * @param hql 
     * @param param 
     * @return 
     */    
    public List<T> find(String hql, Object[] param) {  
        Query q = this.getCurrentSession().createQuery(hql);  
        if (param != null && param.length > 0) {  
            for (int i = 0; i < param.length; i++) {  
                q.setParameter(i, param[i]);  
            }  
        }  
        return q.list();  
    }  
    /** 
     * 查询集合 
     *  
     * @param hql 
     * @param param 
     * @return 
     */    
    public List<T> find(String hql, List<Object> param) {  
        Query q = this.getCurrentSession().createQuery(hql);  
        if (param != null && param.size() > 0) {  
            for (int i = 0; i < param.size(); i++) {  
                q.setParameter(i, param.get(i));  
            }  
        }  
        return q.list();  
    }  
    /** 
     * 查询集合(带分页) 
     *  
     * @param hql 
     * @param param 
     * @param page 
     *            查询第几页 
     * @param rows 
     *            每页显示几条记录 
     * @return 
     */    
    public List<T> find(String hql, Object[] param, Integer page, Integer rows) {  
        if (page == null || page < 1) {  
            page = 1;  
        }  
        if (rows == null || rows < 1) {  
            rows = 10;  
        }  
        Query q = this.getCurrentSession().createQuery(hql);  
        if (param != null && param.length > 0) {  
            for (int i = 0; i < param.length; i++) {  
                q.setParameter(i, param[i]);  
            }  
        }  
        return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();  
    }  
    /** 
     * 查询集合(带分页) 
     *  
     * @param hql 
     * @param param 
     * @param page 
     * @param rows 
     * @return 
     */    
    public List<T> find(String hql, List<Object> param, Integer page, Integer rows) {  
        if (page == null || page < 1) {  
            page = 1;  
        }  
        if (rows == null || rows < 1) {  
            rows = 10;  
        }  
        Query q = this.getCurrentSession().createQuery(hql);  
        if (param != null && param.size() > 0) {  
            for (int i = 0; i < param.size(); i++) {  
                q.setParameter(i, param.get(i));  
            }  
        }  
        return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();  
    }  
    /** 
     * 获得一个对象 
     *  
     * @param c 
     *            对象类型 
     * @param id 
     * @return Object 
     */    
    public T get(Class<T> c, Serializable id) {  
        return (T) this.getCurrentSession().get(c, id);  
    }  
    /** 
     * 获得一个对象 
     *  
     * @param hql 
     * @param param 
     * @return Object 
     */    
    public T get(String hql, Object[] param) {  
        List<T> l = this.find(hql, param);  
        if (l != null && l.size() > 0) {  
            return l.get(0);  
        } else {  
            return null;  
        }  
    }  
    /** 
     * 获得一个对象 
     *  
     * @param hql 
     * @param param 
     * @return 
     */    
    public T get(String hql, List<Object> param) {  
        List<T> l = this.find(hql, param);  
        if (l != null && l.size() > 0) {  
            return l.get(0);  
        } else {  
            return null;  
        }  
    }  
    /** 
     * select count(*) from 类 
     *  
     * @param hql 
     * @return 
     */ 
    //当查询的数据条数大于1的时候使用uniqueResult()方法就会出现异常:
    //org.hibernate.NonUniqueResultException: query did not return a unique result
    public Long count(String hql) { 
        try{
        return (Long) this.getCurrentSession().createQuery(hql).uniqueResult();  
        }catch(Exception e){
            e.printStackTrace();
            return 0L;
        }
    }  
    /** 
     * select count(*) from 类 
     *  
     * @param hql 
     * @param param 
     * @return 
     */   
    public Long count(String hql, Object[] param) {  
        Query q = this.getCurrentSession().createQuery(hql);  
        if (param != null && param.length > 0) {  
            for (int i = 0; i < param.length; i++) {  
                q.setParameter(i, param[i]);  
            }  
        }  
        return (Long) q.uniqueResult();  
    }  
    /** 
     * select count(*) from 类 
     *  
     * @param hql 
     * @param param 
     * @return 
     */   
    public Long count(String hql, List<Object> param) {  
        Query q = this.getCurrentSession().createQuery(hql);  
        if (param != null && param.size() > 0) {  
            for (int i = 0; i < param.size(); i++) {  
                q.setParameter(i, param.get(i));  
            }  
        }  
        return (Long) q.uniqueResult();  
    }  
    /////////////特殊hql语句的执行///////////////////////////////////////////////////////
    /** 
     * 执行HQL语句 
     *  
     * @param hql 
     * @return 响应数目 
     */    
    public Integer executeHql(String hql) {  
        return this.getCurrentSession().createQuery(hql).executeUpdate();  
    }  
    /** 
     * 执行HQL语句 
     *  
     * @param hql 
     * @param param 
     * @return 响应数目 
     */    
    public Integer executeHql(String hql, Object[] param) {  
        Query q = this.getCurrentSession().createQuery(hql);  
        if (param != null && param.length > 0) {  
            for (int i = 0; i < param.length; i++) {  
                q.setParameter(i, param[i]);  
            }  
        }  
        return q.executeUpdate();  
    }  
    /** 
     * 执行HQL语句 
     *  
     * @param hql 
     * @param param 
     * @return 
     */    
    public Integer executeHql(String hql, List<Object> param) {  
        Query q = this.getCurrentSession().createQuery(hql);  
        if (param != null && param.size() > 0) {  
            for (int i = 0; i < param.size(); i++) {  
                q.setParameter(i, param.get(i));  
            }  
        }  
        return q.executeUpdate();  
    }
}