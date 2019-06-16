package com.springmvc.dao;

import com.springmvc.entity.Bookcommit;
import com.springmvc.entity.BookcommitPage;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/18
 * @description：
 * @modified By：
 */
public class BookcommitMapperTest {

    private ApplicationContext applicationContext;
    @Autowired
    private BookcommitMapper adminMapper;

    @Before
    public void setUp() throws Exception {
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext.xml");
        adminMapper = applicationContext.getBean(BookcommitMapper.class);
    }

    @Test
    public void insert() throws Exception {
        Bookcommit bookcommit = new Bookcommit();
        Date date = new Date();
        bookcommit.setbId(1177);
        bookcommit.setuId("HTeba9ym");
        bookcommit.setComm("真本书真好看！");
        bookcommit.setCommtime(new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss").format(date));

        int result = adminMapper.insertSelective(bookcommit);
        assert (result==1);
    }

    @Test
    public void testSelect() throws Exception{
        List<BookcommitPage> list = adminMapper.getCommByBid(1011);
        for (BookcommitPage page:list
             ) {
            System.out.println(page.getUserName() +":" + page.getBookName()+","+page.getComm());
        }
    }
}