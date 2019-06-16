package com.springmvc.service;

import com.springmvc.entity.Book;
import com.springmvc.entity.Page;
import com.springmvc.entity.RecodCount;

import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/26
 * @description： 图书数据库操作
 * @modified By：
 */
public interface BookService {
    //    将图书信息保存到数据库中
    int saveBook(Book book);

    int deleteByPrimaryKey(Integer id);

    Book selectByPrimaryKey(Integer id);


//    查找所有的图书
    List<Book> selectBookList();

//    根据书名或者作者查找所有的图书
    List<Book> selectBookByName(String name);

    /**
     *  图书排行榜和图书推荐
     * @param choice
     * @return
     */
    List<Book>selectBookByChoice(int choice);

    int selectCount(Integer tagid);

    // 查找所用图书,
    Page findBypage(int currentPage,int tagid,String u);


    int updataBookByKey(Book book);

    int updateByPrimaryKeySelective(Book book);

    List<RecodCount> countBootNum();

}
