package cn.lk.newsssh.action;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import cn.lk.newsssh.bean.User;
import cn.lk.newsssh.service.UserService;
import cn.lk.newsssh.utils.GsonUtils;
import cn.lk.newsssh.utils.MyUtils;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@Controller//自动根据bean的类名实例化一个首写字母为小写的bean，如userAct
public class UserAct extends ActionSupport {

    @Resource  //把service注入到action中,不需要new
    private UserService userService;

    private String uid,pwd; //属性值来源于前端同名传输来的数据
    private String jsonResult;
    private HashMap<String,Object> jsonobj=new HashMap<String,Object>();
    //INPUT 和 SUCCESS是actionsupport类提供的两个返回常量。
    //INPUT默认用来返回输入异常，SUCCESS默认是处理数据完成，成功跳转。
    //INPUT从哪里来就回到哪里去？例如登录页面，进入后台后返回input,那就是继续回到登录页面。
    public String doLogin(){ 
        try { 
            HttpServletRequest request = ServletActionContext.getRequest();
            User user = userService.findUserByUidAndPwd(uid, pwd); 
            jsonobj.clear();
            if(user != null){ 
                jsonobj.put("ok", true);
                jsonobj.put("msg", "goIndex");
                ActionContext actionContext = ActionContext.getContext();  
                Map<String,Object>session = actionContext.getSession(); 
                session.put("me", user);
            }else 
                {
                jsonobj.put("ok", false);
                jsonobj.put("msg", "用户不存在");
                }
        } catch (Exception e) { 
            jsonobj.put("ok", false);
            jsonobj.put("msg", "系统错误2"); 
        } 
        jsonResult = GsonUtils.toJson(jsonobj);
        HttpServletResponse response = ServletActionContext.getResponse();
        MyUtils.outPrint(response, jsonResult);
        return null;
    } 
    public String doLogout(){
        ActionContext actionContext = ActionContext.getContext();  
        Map<String,Object> session = actionContext.getSession();
        session.put("me", null);
        return "logout";
    }
    //请求跳转到新闻管理页
    public String goIndex(){
        return "goadmin";
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}