package com.springmvc.service;

import com.springmvc.entity.Admin;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/9
 * @description：
 * @modified By：
 */
public interface AdminService {

        // 添加用户
        int addAdmin(Admin record);

        // 用户名检测
        boolean checkAdmin(String recode);

        // 根据用户主键更新用户密码
        int updateByPrimaryKeySelective(Admin admin );

        // 用户登录
        boolean adminLogin(Admin admin);

}
