package com.springmvc.dao;

import com.springmvc.entity.Admin;
import com.springmvc.util.Encryption;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import static org.junit.Assert.*;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/10
 * @description：
 * @modified By：
 */
public class AdminMapperTest {

    private ApplicationContext applicationContext;
    @Autowired
    private  AdminMapper adminMapper;

    @Before
    public void setUp() throws Exception {
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
        adminMapper = applicationContext.getBean(AdminMapper.class);
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public  void addTest () throws Exception{
        Admin admin = new Admin();
        admin.setaName("小狮子");
        admin.setaPwd(Encryption.MD5("5201314"));

        int reault =adminMapper.insert(admin);
        assert (reault==1);
    }



}