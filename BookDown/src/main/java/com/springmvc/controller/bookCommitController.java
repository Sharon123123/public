package com.springmvc.controller;

import com.springmvc.entity.Bookcommit;
import com.springmvc.entity.BookcommitPage;
import com.springmvc.service.BookCommitService;
import com.springmvc.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/17
 * @description：
 * @modified By：
 */
@Controller
public class bookCommitController {

    @Autowired
    private BookCommitService bookCommitService;

    /**
     *  根据图书的ID获取留言
     * @return
     */
    @RequestMapping(value = "/get_chat")
    @ResponseBody
    public List<BookcommitPage> getChats(@RequestParam(value = "bId")int bid){

        List<BookcommitPage> list = bookCommitService.getCommByBid(bid);
        System.out.println("获取评论");
        return list ;
    }

    /**
     *  获取最新评论
     * @return
     */
    @RequestMapping(value = "/get_chat_time")
    @ResponseBody
    public List<BookcommitPage> getChatsBytimes(){
        return bookCommitService.getCommByTime();
    }


    /**
     *  用户添加评论
     * @param bookcommit
     * @return
     */
    @RequestMapping(value = "/addchat",method = RequestMethod.POST)
    @ResponseBody
    public String addChat(@ModelAttribute Bookcommit bookcommit){

        // 取出评论里的空格
        bookcommit.setComm(bookcommit.getComm().trim());
        Date date = new Date();
        bookcommit.setCommtime(new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss").format(date));
        int result = bookCommitService.insertSelective(bookcommit);
        Map<String,Integer> map = new HashMap<>();
        map.put("statue",result);
        return Constant.JsonByMap(map);
    }

}
