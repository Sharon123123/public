package com.springmvc.controller;

import com.springmvc.entity.Admin;
import com.springmvc.entity.Booktype;
import com.springmvc.service.BookTypeService;
import com.springmvc.util.Constant;
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
 * @date ：Created in 2019/3/21
 * @description：
 * @modified By：
 */
@Controller
public class bookTypeController {

    @Autowired
    private BookTypeService bookTypeService;

    /**
     * 管理员添加图书标签
     *
     * @param tag
     * @return
     */
    @RequestMapping(value = "/admin_add_tag", method = RequestMethod.POST)
    @ResponseBody
    public String insertBookType(@RequestParam(value = "tag") String tag) {
        Booktype recode = new Booktype();
        recode.setBtName(tag);
        Map<String, Integer> map = new HashMap<>();
        int message = 0;
        if (bookTypeService.insertType(recode) == 1) {
            message = 1;
            map.put("message", message);
            return Constant.JsonByMap(map);
        }
        map.put("message", message);
        return Constant.JsonByMap(map);
    }


    /**
     * 管理员 查询所有图书标签
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "/admintag")
    public String bookTagMange(HttpSession session, Model model) {
        Admin admin = (Admin) session.getAttribute("admin");
        model.addAttribute("admin", admin);
        List<Booktype> booktypeList = bookTypeService.selectBooktag();
        model.addAttribute("bookType", booktypeList);
        return "admintag";
    }


    /**
     * 查询所有的图书标签
     *
     * @return
     */
    @RequestMapping(value = "getAlltag")
    @ResponseBody
    public List<Booktype> getAllTag() {
        return bookTypeService.selectBooktag();
    }

    @RequestMapping(value = "deleteTag")
    @ResponseBody
    public int deleteTag(@RequestParam(value = "tagId") int tagId, Model model) {
        int result = bookTypeService.deleteByID(tagId);
        return result;

    }

}
