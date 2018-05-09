package cn.lk.newsssh.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import cn.lk.newsssh.bean.Cmenu;
import cn.lk.newsssh.bean.EasyUITree;
import cn.lk.newsssh.bean.User;
import cn.lk.newsssh.service.MenuService;
import cn.lk.newsssh.utils.MyUtils;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Controller
public class MenuAct extends ActionSupport {
	@Resource
	private MenuService menuSvc;
	private String jsonResult;

	public String menutree() {
		Map<String, Object> session = ActionContext.getContext().getSession();
		User user = (User) session.get("me");
		String role = user.getRole();
		// =========一级菜单=================
		List<Cmenu> menulist = menuSvc.listMenu(0);
		List<EasyUITree> eList = new ArrayList<EasyUITree>();
		if (menulist.size() != 0) {
			for (int i = 0; i < menulist.size(); i++) {
				Cmenu t = menulist.get(i);
				if (!t.getPermission().contains(role))
					continue;
				EasyUITree e = new EasyUITree();
				e.setId(t.getId() + "");
				e.setText(t.getName());
				List<EasyUITree> eList2 = new ArrayList<EasyUITree>();
				// ===========二级菜单===============
				List<Cmenu> menu2 = menuSvc.listMenu(t.getId());
				for (int j = 0; j < menu2.size(); j++) {
					Cmenu t2 = menu2.get(j);
					if (!t2.getPermission().contains(role))
						continue;
					Map<String, Object> attributes = new HashMap<String, Object>();
					attributes.put("url", t2.getUrl());
					attributes.put("role", t2.getPermission());
					EasyUITree e1 = new EasyUITree();
					e1.setAttributes(attributes);
					e1.setId(t2.getId() + "");
					e1.setText(t2.getName());
					e1.setState("open");
					eList2.add(e1);
				}
				e.setChildren(eList2);
				e.setState("closed");
				eList.add(e);
			}
		}
		jsonResult = MyUtils.toJson(eList);
		HttpServletResponse response = ServletActionContext.getResponse();
		MyUtils.outPrint(response, jsonResult);
		return null;
	}
}