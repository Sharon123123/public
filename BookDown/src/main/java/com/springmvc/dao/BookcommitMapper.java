package com.springmvc.dao;

import com.springmvc.entity.Bookcommit;
import com.springmvc.entity.BookcommitPage;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookcommitMapper {
    int deleteByPrimaryKey(Integer bcId);

    int insert(Bookcommit record);

    int insertSelective(Bookcommit record);

    Bookcommit selectByPrimaryKey(Integer bcId);

    int updateByPrimaryKeySelective(Bookcommit record);

    int updateByPrimaryKey(Bookcommit record);

    // 根据书的id  查找用户评论
    List<BookcommitPage> getCommByBid(@Param(value = "bid") int bid);

    // 根据日期查询最新的几条评论
    List<BookcommitPage> getCommByTime();

}