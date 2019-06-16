package com.springmvc.dao;

import com.springmvc.entity.User;
import com.springmvc.util.Encryption;
import com.springmvc.util.GenerateID;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


/**
 * @author ：yyWang
 * @date ：Created in 2019/3/19
 * @description： 测试userMapper
 * @modified By：
 */
public class UserMapperTest {

    private ApplicationContext applicationContext;

    @Autowired
    private UserMapper mapper;

    @Before
    public void setUp() throws Exception {

        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");

        mapper = applicationContext.getBean(UserMapper.class);

    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public  void testInsert() throws Exception {
        User user = new User();
        user.setuId(GenerateID.generateShortUuid());
        user.setuName("张三");
        user.setuTypeid(11);
        user.setuPwd(Encryption.MD5("111111"));

        int result = mapper.insertSelective(user);
        System.out.println(result);
        assert (result == 1);
    }

    @Test
    public  void deleteTest() throws Exception{
        User user= new User();
        user.setuId("w4dnUCfu");
        int result = mapper.deleteByPrimaryKey("kbP6xzSf");
        System.out.println(result);
        assert (result ==1);
        System.out.println("输出");
    }

    @Test
    public  void getUserByname()throws Exception{
        User user = mapper.getUserByName("大山");
        System.out.println(user.getuName());
    }
}