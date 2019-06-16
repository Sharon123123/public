package com.springmvc.dao;

import com.springmvc.entity.Duty;
import com.springmvc.entity.RecodCount;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DutyMapper {

    int deleteByPrimaryKey(Integer dId);

    int insert(Duty record);

    int insertSelective(Duty record);

    Duty selectByPrimaryKey(Integer dId);

    int updateByPrimaryKeySelective(Duty record);

    int updateByPrimaryKey(Duty record);

    List<Duty> selectAll();

    // 统计会员数量
    List<RecodCount> countNum();
}