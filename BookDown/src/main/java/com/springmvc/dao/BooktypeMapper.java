package com.springmvc.dao;

import com.springmvc.entity.Booktype;
import com.springmvc.entity.RecodCount;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface BooktypeMapper {
    int deleteByPrimaryKey(Integer btId);

    int insert(Booktype record);

    int insertSelective(Booktype record);

    Booktype selectByPrimaryKey(Integer btId);

    int updateByPrimaryKeySelective(Booktype record);

    int updateByPrimaryKey(Booktype record);

    // 查询图书各个类型的数量
    List<RecodCount> connectSelect();

//    查询所用图书标签
    List<Booktype>selectBooktag();
}