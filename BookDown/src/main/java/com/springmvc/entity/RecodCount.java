package com.springmvc.entity;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/11
 * @description：  联合查询，统计类型的数量，比如根据图书的类型，统计各个图书类型的数量
 * @modified By：
 */
public class RecodCount {
    private String name;
    private Integer num;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
}
