package com.springmvc.controller;

import com.springmvc.entity.*;
import com.springmvc.service.AdminService;
import com.springmvc.service.BookService;
import com.springmvc.service.DutyService;
import com.springmvc.service.UserService;
import com.springmvc.util.Constant;
import com.springmvc.util.Encryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/9
 * @description： 管理员
 * @modified By：
 */
@Controller
public class adminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private DutyService dutyService;
    @Autowired
    private BookService bookService;
    @Autowired
    private UserService userService;


    // 跳转到管理员首页首页
    @RequestMapping(value = "/adminIndex")
    public String adminIndex(HttpSession session, Model model) {
        Admin admin = (Admin) session.getAttribute("admin");
        List<RecodCount> userNum = dutyService.countNum();
        List<RecodCount> bookNum = bookService.countBootNum();
        if (admin != null) {
            model.addAttribute("admin", admin);
            model.addAttribute("userNum", userNum);
            model.addAttribute("bookNum", bookNum);
        }
        return "adminIndex";
    }

    /**
     *  用户管理
     * @param model
     * @return
     */
    @RequestMapping(value = "/adminUser_list")
    public String userManage(Model model, HttpSession session, @RequestParam(value = "pn",defaultValue = "1")int pn){
        Admin admin = (Admin) session.getAttribute("admin");
        model.addAttribute("admin",admin);
        Page<UserType> pageUser = userService.findByPage(pn);
        model.addAttribute("pageUser",pageUser);

        return "adminUser_list";
    }

    /**
     * 统计用户类型，数量
     *
     * @return
     */
    @RequestMapping(value = "/showUserNum")
    @ResponseBody
    public List<RecodCount> countUser() {
        List<RecodCount> countList = dutyService.countNum();
        return countSum(countList);
    }

    public  List<RecodCount> countSum(List<RecodCount> counts){
        RecodCount sumCount = new RecodCount();
        sumCount.setName("总 计");
        // 统计数量
        int sum = 0;
        for (RecodCount count : counts
        ) {
            sum += count.getNum();
        }
        sumCount.setNum(sum);
        counts.add(sumCount);
        return counts;
    }

    /**
     *  返回图书的类型，以及数量
     * @return
     */
    @RequestMapping(value = "/showBookNum")
    @ResponseBody
    public List<RecodCount> countBook(){
        List<RecodCount> countList = bookService.countBootNum();
       return countSum(countList);
    }


    /**
     * 管理员登录
     *
     * @param admin
     * @return
     */
    @RequestMapping(value = "/admin/login", method = RequestMethod.POST)
    @ResponseBody
    public String adminLogin(Admin admin, HttpSession session) {
        Map<String, String> map = new HashMap<>();
        System.out.println("用户名：" + admin.getaName());
        //取出用户输入的密码，并进行加密，和数据库里的密码进行比对。
        admin.setaPwd(Encryption.MD5(admin.getaPwd()));
        boolean result = adminService.adminLogin(admin);
        if (result) {
            map.put("message", "success");
            session.setAttribute("admin", admin);
        } else {
            map.put("message", "error");
        }
        System.out.println(map);
        return Constant.JsonByMap(map);
    }


    /**
     * 管理员，用户名检测
     *
     * @param admin
     * @return
     */
    @RequestMapping(value = "/admin/checkAdmin", method = RequestMethod.POST)
    @ResponseBody
    public String checkName(Admin admin) {
        Map<String, Boolean> map = new HashMap<>();
        boolean result = adminService.checkAdmin(admin.getaName());
        map.put("valid", result);
        return Constant.JsonByMap(map);
    }


    @RequestMapping(value = "/admin/logout")
    public String logoutAdmin(HttpSession session) {
        // 管理用户退出
        session.invalidate();
        // 跳转到书城网页登录界面
        return "login";
    }


    /**
     * 管理员用户注册
     *
     * @param admin
     * @return
     */
    @RequestMapping(value = "/admin/register", method = RequestMethod.POST)
    @ResponseBody
    public String adminRegister(Admin admin, HttpSession session) {
        Map<String, String> map = new HashMap<>();
        admin.setaPwd(Encryption.MD5(admin.getaPwd()));
        System.out.println("当前用户名：" + admin.getaName() + "，当前密码：" + admin.getaPwd());
        int result = adminService.addAdmin(admin);
        if (result == 1) {
            map.put("message", "success");
            session.setAttribute("admin", admin);
        } else {
            map.put("message", "error");
        }

        return Constant.JsonByMap(map);

    }


}
