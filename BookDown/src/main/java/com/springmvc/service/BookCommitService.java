package com.springmvc.service;

import com.springmvc.entity.Bookcommit;
import com.springmvc.entity.BookcommitPage;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/17
 * @description：
 * @modified By：
 */
public interface BookCommitService {

    // 插入用户评论
    int insertSelective(Bookcommit record);
    // 根据书的id  查找用户评论
    List<BookcommitPage> getCommByBid(@Param(value = "bid") int bid);

    // 根据日期查询最新的几条评论
    List<BookcommitPage> getCommByTime();
}
