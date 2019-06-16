package com.springmvc.service;

import com.springmvc.entity.Booktype;

import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/21
 * @description： 电子书的类型：小说，文学，传记，青春，动漫，经济，文化，
 * 人工智能，编程语言，操作系统
 * @modified By：
 */
public interface BookTypeService {

    int insertType(Booktype bookType);

    int deleteByID(int id);

    Booktype selectByPrimaryKey(Integer btId);

    List<Booktype> selectBooktag();

}
