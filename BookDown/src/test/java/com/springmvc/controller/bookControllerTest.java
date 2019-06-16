package com.springmvc.controller;

import com.springmvc.entity.AdminBook;
import com.springmvc.entity.Page;
import com.springmvc.entity.RecodCount;
import com.springmvc.service.AdminService;
import com.springmvc.service.BookService;
import com.springmvc.service.DutyService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

import static org.junit.Assert.*;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/16
 * @description：
 * @modified By：
 */
public class bookControllerTest {

    private ApplicationContext applicationContext;
    @Autowired
    private BookService adminService;


    @Test
    public void bookMange() {

        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
        adminService = applicationContext.getBean(BookService.class);
        Page<AdminBook> list = adminService.findBypage(1,0,"a");
        for (AdminBook recod:list.getLists()
        ) {
            System.out.println(recod.getbName()+":" +recod.getbBooktag());
        }

    }
}