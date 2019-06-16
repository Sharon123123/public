package com.springmvc.service;

import com.springmvc.entity.Page;
import com.springmvc.entity.User;
import com.springmvc.entity.UserType;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户服务接口
 * <p>
 * 存放业务逻辑处理，也是一些关于数据库处理的操作，
 * 其主要是存放了查询数据的各种方法，但它不是直接和数据库打交道，
 * 他有一个接口和还有接口的实现方法，在接口的实现方法中需要导入mapper层，
 * 而这个mapper层是直接跟数据库打交道的，他也是个接口，只有方法名字，
 * 具体实现在mapper.xml文件里，service只是供我们使用的方法。
 */

public interface UserService {
    //    用户注册
    int insert(User record);

    int deleteUser(String id);

    User select(String id);

    //    查询方法
    ArrayList<User> selectSelective(User record);

    User getUserByName(String name, String pwd);

    boolean checkUserName(String name);

    int updateByPrimaryKeySelective(User recode);

    // 查询用户总数
    int selectCount();
    Page<UserType> findByPage(int currentPage);

}
