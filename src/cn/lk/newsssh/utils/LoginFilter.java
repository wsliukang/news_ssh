package cn.lk.newsssh.utils;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import cn.lk.newsssh.bean.User;

public class LoginFilter extends HttpServlet implements Filter {  
    public FilterConfig config; 

    public static boolean isContains(String container, String[] regx) {  
        boolean result = false;    
        for (int i = 0; i < regx.length; i++) {  
            if (container.indexOf(regx[i]) != -1) {  
                return true;  
            }  
        }  
        return result;  
    }  

    public void doFilter(ServletRequest request, ServletResponse response,  
                            FilterChain chain) throws IOException, ServletException {  
        HttpServletRequest hrequest = (HttpServletRequest)request;
        String ctx=hrequest.getContextPath();// /examssh
        String uri=hrequest.getRequestURI();// /examssh/...
        HttpServletResponseWrapper wrapper = new HttpServletResponseWrapper((HttpServletResponse) response);  

        String excludeStrings = config.getInitParameter("excludeStrings");   
        String includeStrings = config.getInitParameter("includeStrings");
        String redirectPath = ctx + config.getInitParameter("redirectPath");
        String[] excludeList = excludeStrings.split(";");  
        String[] includeList = includeStrings.split(";");
        //确定免过滤的
        if (this.isContains(uri, excludeList) || uri.equals(ctx+"/")) {
            chain.doFilter(request, response);  
            return;  
        }
        User user = ( User ) hrequest.getSession().getAttribute("me");
        if (user == null && this.isContains(uri, includeList)) {
            System.out.println("成功拦截到非法用户企图入侵网站后台   :  " + uri);
            wrapper.sendRedirect(redirectPath);  
            return;  
        }
        chain.doFilter(request, response);  
    }  

    public void init(FilterConfig filterConfig) throws ServletException {
        config = filterConfig;
    } 
    public void destory(){
        this.config = null;
    }  
}
