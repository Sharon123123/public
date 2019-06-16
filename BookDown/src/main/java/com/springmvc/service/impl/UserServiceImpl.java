package com.springmvc.service.impl;

import com.springmvc.dao.DutyMapper;
import com.springmvc.dao.UserMapper;
import com.springmvc.entity.Page;
import com.springmvc.entity.RecodCount;
import com.springmvc.entity.User;
import com.springmvc.entity.UserType;
import com.springmvc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 用户服务端，添加用户信息，用户注册
 */

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper mapper;
    @Autowired
    private DutyMapper dutyMapper;

    public int insert(User record) {
        return mapper.insert(record);
    }

    @Override
    public int deleteUser(String id) {
        return mapper.deleteByPrimaryKey(id);
    }

    @Override
    public User select(String id) {
        return mapper.selectByPrimaryKey(id);
    }

    @Override
    public ArrayList<User> selectSelective(User record) {
        return mapper.selectSelective(record);
    }

    @Override
    public User getUserByName(String name, String pwd) {
        User user = mapper.getUserByName(name);
        if (user != null && user.getuPwd().equals(pwd)) {
//           用户和密码输入正确登录成功
            return user;
        }
        return null;


    }

    @Override
    public boolean checkUserName(String name) {
        User user = mapper.getUserByName(name);
        if (user !=null){
            return false;
        }
        // 用户名称不存在就返回 true
        return true;
    }

    @Override
    public int updateByPrimaryKeySelective(User recode) {
        return mapper.updateByPrimaryKeySelective(recode);
    }

    @Override
    public int selectCount() {
        return mapper.countUser();
    }

    @Override
    public Page<UserType> findByPage(int currentPage) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        Page<UserType> page = new Page<UserType>();

        page.setCurrPage(currentPage);

        // 每页显示20条数据
        int pageSize = 20;
        page.setPageSize(pageSize);

        // 封装总记录数
        int totalCount = mapper.countUser();
        page.setTotalCount(totalCount);

        // 封装总页数
        double tc = totalCount;
//         向上取整
        Double num = Math.ceil(tc / pageSize);
        page.setTotalPage(num.intValue());

        map.put("start", (currentPage - 1) * pageSize);
        map.put("size", page.getPageSize());

        // 封装每页显示的数据
        List<UserType> lists = mapper.findByPage(map);
        page.setLists(lists);
        return page;
    }


}
