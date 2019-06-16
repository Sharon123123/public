package com.springmvc.controller;

import com.springmvc.entity.Duty;
import com.springmvc.service.DutyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/19
 * @description：
 * @modified By：
 */
@Controller
public class dutyController {

    @Autowired
    private DutyService dutyService;

    /**
     *  获取所有用户类型
     * @return
     */
    @RequestMapping(value = "get_user_type",method = RequestMethod.POST)
    @ResponseBody
    public List<Duty> getUserType(){
        return dutyService.selectAll();
    }

}
