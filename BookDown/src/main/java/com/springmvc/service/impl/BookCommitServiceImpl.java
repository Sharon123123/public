package com.springmvc.service.impl;

import com.springmvc.dao.BookcommitMapper;
import com.springmvc.entity.Bookcommit;
import com.springmvc.entity.BookcommitPage;
import com.springmvc.service.BookCommitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/17
 * @description：
 * @modified By：
 */
@Service
public class BookCommitServiceImpl implements BookCommitService {

    @Autowired
    private BookcommitMapper mapper;

    @Override
    public int insertSelective(Bookcommit record) {
        return mapper.insertSelective(record);
    }

    @Override
    public List<BookcommitPage> getCommByBid(int bid) {
        return mapper.getCommByBid(bid);
    }

    @Override
    public List<BookcommitPage> getCommByTime() {
        return mapper.getCommByTime();
    }
}
