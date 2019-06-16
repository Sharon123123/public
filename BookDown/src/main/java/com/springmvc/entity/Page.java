package com.springmvc.entity;

import java.util.HashMap;
import java.util.List;

/**
 * @author ：yyWang
 * @date ：Created in 2019/3/30
 * @description： 用于首页分页,分页实体类
 * @modified By：
 */
public class Page<T> {
    private int currPage;// 当前页数
    private int pageSize;// 每页显示的记录数
    private  int totalCount;// 总记录数
    private  int totalPage; // 总页数
    private List<T> lists;// 每页的显示的数据

    /* 存放一些消息*/
    private HashMap<String,Object> map;

    public HashMap<String, Object> getMap() {
        return map;
    }

    public void setMap(HashMap<String, Object> map) {
        this.map = map;
    }

    public Page(){
        super();
    }

    public int getCurrPage() {
        return currPage;
    }

    public void setCurrPage(int currPage) {
        this.currPage = currPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public List<T> getLists() {
        return lists;
    }

    public void setLists(List<T> lists) {
        this.lists = lists;
    }



}
