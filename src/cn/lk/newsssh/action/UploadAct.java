package cn.lk.newsssh.action;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

@Controller("uploadAct")
public class UploadAct extends ActionSupport {

    private File filedata;      
    private String filedataContentType;         
    private String filedataFileName;        
    private String err= "";      
    private String msg= "''";      
    private String message;      

   /**
     * 返回文件大小，单位MB
     * @param filesize
     * @param scale,小数位数
     * @return
     */
    private double getFileSize(long filesize, int scale) {
        BigDecimal bd1 = new BigDecimal(Long.toString(filesize));
        BigDecimal bd2 = new BigDecimal(Long.toString(1024));
        return bd1.divide(bd2, scale, BigDecimal.ROUND_HALF_UP).divide(bd2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
    }


    public String upload() throws Exception{ 
        if(filedata==null){
            err="空文件";
            msg="''";
        }else{
            long filelen=filedata.length();
            long maxfsize=10485760;//10M
            if(filelen>maxfsize){
                err="文件超出" + getFileSize(maxfsize, 2) + "MB";
                msg="''";
            }else{
                String saveRealFilePath = ServletActionContext.getServletContext().getRealPath("/upload");     
                File fileDir = new File(saveRealFilePath);     
                if (!fileDir.exists()) {  fileDir.mkdirs();   }     
                File savefile;
                String uuid = UUID.randomUUID().toString().replaceAll("-", "");
                String newFileName=uuid+filedataFileName.substring(filedataFileName.lastIndexOf("."),filedataFileName.length());  
                try {
                    savefile = new File(saveRealFilePath + "/" + newFileName); 
                    FileUtils.copyFile(filedata,savefile);
                    msg = "upload/" + newFileName;     
                    err="";
                }catch (IOException e) {  
                    err = "错误"+e.getMessage(); 
                    msg="''";
                    e.printStackTrace();  
                }               
            }
        }
        printInfo( err, msg);//封装json字符串，以适配xheditor
        HttpServletResponse response=ServletActionContext.getResponse();
        response.setContentType("text/html;charset=UTF-8");

        PrintWriter out = null;
        try {
            out = response.getWriter();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        out.print( message);//返回给前端xheditor
        return null;
    } 

     public void printInfo(String err,String newFileName) {
            message = "{\"err\":\"" + err + "\",\"msg\":\"" + newFileName + "\"}";               
     }  



    public File getFiledata() {  
        return filedata;  
    }  
    public void setFiledata(File filedata) {  
        this.filedata = filedata;  
    }  
    public String getFiledataContentType() {  
        return filedataContentType;  
    }  
    public void setFiledataContentType(String filedataContentType) {  
        this.filedataContentType = filedataContentType;  
    }  
    public String getFiledataFileName() {  
        return filedataFileName;  
    }  
    public void setFiledataFileName(String filedataFileName) {  
        this.filedataFileName = filedataFileName;  
    }  
    public String getErr() {  
        return err;  
    }  
    public void setErr(String err) {  
        this.err = err;  
    }  
    public String getMsg() {  
        return msg;  
    }  
    public void setMsg(String msg) {  
        this.msg = msg;  
    }  
    public String getMessage() {  
        return message;  
    }  
    public void setMessage(String message) {  
        this.message = message;  
    }  
}
