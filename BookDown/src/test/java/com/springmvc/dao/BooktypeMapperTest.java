package com.springmvc.dao;

import com.springmvc.entity.Booktype;
import com.springmvc.entity.RecodCount;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/26
 * @description：
 * @modified By：
 */
public class BooktypeMapperTest {

    private ApplicationContext applicationContext;

    @Autowired
    private BooktypeMapper mapper;

    @Before
    public void setUp() throws Exception {
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
        mapper = applicationContext.getBean(BooktypeMapper.class);
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void insertTest() throws Exception {
        ArrayList<String> files = new ArrayList<String>();
        String path = "E:\\developTools\\python\\Deployment\\nove\\novelphoto";
        File file = new File(path);
        File[] temlist = file.listFiles();
        Booktype book ;
        for (File item : temlist
        ) {
            if (item.isDirectory()) {
                book = new Booktype();
//                添加图书类别
                book.setBtName(item.getName().split(" ")[0]);
                mapper.insertSelective(book);
//                System.out.println(item.getName().split(" ")[0]);
            }


        }
        System.out.println("可以测试");
    }

    @Test
    public  void connectSelect() throws  Exception{
//        Map<String,String> map = mapper.connectSelect();
//        Iterator<Map.Entry<String, String>> iterable = map.entrySet().iterator();
//        while (iterable.hasNext()){
//            Map.Entry<String,String> entry = iterable.next();
//            System.out.println(entry.getKey()+":"+entry.getValue());
//        }

        List<RecodCount> rc = mapper.connectSelect();
        for (RecodCount count:rc
             ) {
            System.out.println(count.getName()+":" + count.getNum());
        }

    }

}