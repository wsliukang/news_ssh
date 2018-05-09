package cn.lk.newsssh.utils;

import java.io.PrintWriter;
import java.lang.reflect.Type;

import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.crypto.hash.Sha256Hash;

import com.google.gson.Gson;
import com.google.gson.JsonNull;

public class MyUtils {
	 /**
     *    获取Sha256Hash加密密码
     */
    public static String lkCode(String password,String salt){
            if(salt==""){
                  salt="abcdefghijklmnopqrstuvwx";
            }
            return new Sha256Hash(password, salt, 1024).toBase64();
      }
    /** 
     *  
     * @Title: outJson 
     * @Description: 输出结果到前台 
     * @param: response 
     * @param: result 设定文件 
     * @return void 返回类型 
     * @throws 
     */  
    public static void outPrint(HttpServletResponse response, String data) {  
        response.setContentType("application/json;charset=UTF-8");  
        response.setCharacterEncoding("UTF-8");  
        try {  
            PrintWriter out = response.getWriter();  
            out.print(data);  
            out.flush();  
            out.close();  
        } catch (Exception e) {  
            System.out.println(e.getMessage());  
        }  
    }     
    /** 
     * 判断字符串是否为空 
     *  
     * @param str 字符串 
     * @return true：为空； false：非空 
     */  
    public static boolean isNull(String str) {  
        if (str != null && !str.trim().equals("")) {  
            return false;  
        } else {  
            return true;  
        }  
    }    
    
  //采取单例模式  
    private static Gson gson=new Gson();  
  
    /**  
     * @MethodName : toJson  
     * @Description : 将对象转为JSON串，此方法能够满足大部分需求  
     * @param src  
     *            :将要被转化的对象  
     * @return :转化后的JSON串  
     */  
    public static String toJson(Object src) {  
        if (src == null) {  
            return gson.toJson(JsonNull.INSTANCE);  
        }  
        return gson.toJson(src);  
    }  

    /**  
     * @MethodName : fromJson  
     * @Description : 用来将JSON串转为对象，但此方法不可用来转带泛型的集合  
     * @param json  
     * @param classOfT  
     * @return  
     */  
    public static <T> Object fromJson(String json, Class<T> classOfT) {  
        return gson.fromJson(json, (Type) classOfT);  
    }  

    /**  
     * @MethodName : fromJson  
     * @Description : 用来将JSON串转为对象，此方法可用来转带泛型的集合，如：Type为   
     *              new TypeToken<List<T>>(){}.getType()  
     *              ，其它类也可以用此方法调用，就是将List<T>替换为你想要转成的类  
     * @param json  
     * @param typeOfT  
     * @return  
     */  
    public static Object fromJson(String json, Type typeOfT) {  
        return gson.fromJson(json, typeOfT);  
    }  
}
