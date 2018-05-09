package cn.lk.newsssh.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.lk.newsssh.bean.User;
import cn.lk.newsssh.dao.BaseDao;
import cn.lk.newsssh.utils.MyUtils;

@Service
public class UserService {
    @Resource
    private BaseDao<User> dao;

    private void addUser(User user){
    	dao.save(user);
    }
    
    public User findUserByUidAndPwd(String uid, String pwd) {  
        return dao.get(" from User u where u.uid = ? and u.pwd = ? ", new Object[] { uid, MyUtils.lkCode(pwd, "") });  
    }  
    
    public Long getCount(){
    	return dao.count("select count(*) from User");
    }
}