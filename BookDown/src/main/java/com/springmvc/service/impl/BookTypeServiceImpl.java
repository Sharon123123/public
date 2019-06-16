package com.springmvc.service.impl;

import com.springmvc.dao.BooktypeMapper;
import com.springmvc.entity.Booktype;
import com.springmvc.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/21
 * @description：
 * @modified By：
 */

@Service
public class BookTypeServiceImpl implements BookTypeService {

    @Autowired
    private BooktypeMapper mapper;

    @Override
    public int insertType(Booktype bookType) {
        return mapper.insertSelective(bookType);
    }

    @Override
    public int deleteByID(int id) {
        return mapper.deleteByPrimaryKey(id);
    }

    @Override
    public Booktype selectByPrimaryKey(Integer btId) {
        return mapper.selectByPrimaryKey(btId);
    }

    @Override
    public List<Booktype> selectBooktag() {
        return mapper.selectBooktag();
    }
}
