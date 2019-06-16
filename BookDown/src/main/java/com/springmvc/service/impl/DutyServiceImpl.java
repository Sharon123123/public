package com.springmvc.service.impl;

import com.springmvc.dao.DutyMapper;
import com.springmvc.entity.Duty;
import com.springmvc.entity.RecodCount;
import com.springmvc.service.DutyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/11
 * @description：
 * @modified By：
 */

@Service
public class DutyServiceImpl implements DutyService {

    @Autowired
    private DutyMapper dutyMapper;

    @Override
    public int deleteByPrimaryKey(Integer dId) {
        return dutyMapper.deleteByPrimaryKey(dId);
    }

    @Override
    public int insertSelective(Duty record) {
        return dutyMapper.insertSelective(record);
    }

    @Override
    public int updateByPrimaryKeySelective(Duty record) {
        return dutyMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<Duty> selectAll() {
        return dutyMapper.selectAll();
    }

    @Override
    public List<RecodCount> countNum() {
        return dutyMapper.countNum();
    }
}
