package com.springmvc.util;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/19
 * @description：
 * @modified By：
 */
public class GenerateIDTest {

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public  void userID() throws  Exception{
        String id = GenerateID.generateShortUuid();

        System.out.println(id);
    }

}