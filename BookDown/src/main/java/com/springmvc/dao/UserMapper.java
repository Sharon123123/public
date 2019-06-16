package com.springmvc.dao;

import com.springmvc.entity.User;
import com.springmvc.entity.UserType;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
public interface UserMapper {

//    用户删除
    int deleteByPrimaryKey(String uId);

//    用户注册
    int insert(User record);

//    用户更新信息
    int insertSelective(User record);

//    根据用户ID 返回用户所有数据
    User selectByPrimaryKey(String uId);

//    根据用户ID更新用户部分信息
    int updateByPrimaryKeySelective(User record);

//    根据用户的某些数据查询用户
    ArrayList<User> selectSelective(User record);

//    根据用户的ID更新用户所有信息
    int updateByPrimaryKey(User record);

//    根据用户名得到用户
    User getUserByName(String name);


    // 查询所有用户
    List<User> selectAllUser();
    //查询用户总数
    int countUser();

    // 分页查找用户
    List<UserType> findByPage(HashMap<String, Object> map);

}