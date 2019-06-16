package com.springmvc.service;

import com.springmvc.entity.Duty;
import com.springmvc.entity.RecodCount;

import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/11
 * @description：
 * @modified By：
 */
public interface DutyService {


    // 根据主键删除会员类型
    int deleteByPrimaryKey(Integer dId);

    // 添加会员类型
    int insertSelective(Duty record);

    int updateByPrimaryKeySelective(Duty record);

    // 查询所有会员类型
    List<Duty> selectAll();

    // 统计会员数量
    List<RecodCount> countNum();


}
