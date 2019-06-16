package com.springmvc.controller;

import com.springmvc.dao.AdminMapper;
import com.springmvc.entity.Admin;
import com.springmvc.entity.RecodCount;
import com.springmvc.service.AdminService;
import com.springmvc.service.DutyService;
import com.springmvc.util.Encryption;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

import static org.junit.Assert.*;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/10
 * @description：
 * @modified By：
 */
public class adminControllerTest {

    private ApplicationContext applicationContext;
    @Autowired
    private AdminService adminService;
    @Autowired
    private DutyService dutyService;
    @Test
    public void adminLogin() {
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
        adminService = applicationContext.getBean(AdminService.class);

        Admin admin = new Admin();
        admin.setaName("小可爱");
        admin.setaPwd(Encryption.MD5("5201314"));
        boolean result = adminService.adminLogin(admin);
        System.out.println("当前结果"+result);
    }

    @Test
    public void countNum(){
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
        dutyService = applicationContext.getBean(DutyService.class);
        List<RecodCount> list = dutyService.countNum();
        for (RecodCount recod:list
             ) {
            System.out.println(recod.getName()+":" +recod.getNum());
        }

    }
}