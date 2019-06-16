package com.springmvc.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springmvc.entity.Page;

import java.util.Map;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/1
 * @description： 保存一些常量，不变的数据
 * @modified By：
 */
public class Constant {

    public static final String localPath = "E:\\developTools\\Book\\uploaddata";

//    将map 的值转为json
    public static final String JsonByMap(Map map) {
        String jason = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jason = objectMapper.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jason;
    }


}
