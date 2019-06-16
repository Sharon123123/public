package com.springmvc.dao;

import com.springmvc.entity.Userinfo;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Date;

import static org.junit.Assert.*;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/18
 * @description：
 * @modified By：
 */
public class UserinfoMapperTest {

    private  ApplicationContext applicationContext;
    @Autowired
    private  UserinfoMapper mapper;

    @Before
    public void setUp() throws Exception {

        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");

        mapper = applicationContext.getBean(UserinfoMapper.class);

    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public  void testInsternt() throws Exception{
        Userinfo userinfo = new Userinfo();
        userinfo.setName("111111");
        userinfo.setPw("111111");
        userinfo.setSex(false);
        userinfo.setCreatetime(new Date());
        int result  = mapper.insert(userinfo);
        System.out.println(result);
        assert (result == 1);


    }
}