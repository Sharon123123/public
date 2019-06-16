package com.springmvc.service.impl;

import com.springmvc.dao.AdminMapper;
import com.springmvc.entity.Admin;
import com.springmvc.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/10
 * @description：
 * @modified By：
 */

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminMapper mapper;

    @Override
    public int addAdmin(Admin record) {
        return mapper.insert(record);
    }

    // 用户名检测
    @Override
    public boolean checkAdmin(String name) {
        Admin admin = mapper.checkAdmin(name);
        if (admin != null) {
            // 用户名已经存在
            return false;
        }
        //用户名可以使用
        return true;
    }

    @Override
    public int updateByPrimaryKeySelective(Admin admin) {
        return mapper.updateByPrimaryKeySelective(admin);
    }

    @Override
    public boolean adminLogin(Admin admin) {
        Admin newAdmin = mapper.checkAdmin(admin.getaName());
//        System.out.println();
        if (newAdmin != null) {
            if (newAdmin.getaPwd().equals(admin.getaPwd())) {
                return true;
            }
        }
        // 用户登录失败
        return false;
    }
}
