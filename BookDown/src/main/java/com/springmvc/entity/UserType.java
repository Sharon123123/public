package com.springmvc.entity;

/**
 * @author ：yyWang
 * @date ：Created in 2019/4/12
 * @description： 查询数据库，将用户类型转换为对应的字符
 * @modified By：
 */
public class UserType {

    private String uId;
    private String uName;
    private String uPhone;
    private String uEmail;
    private String uTypeid;

    public String getuId() {
        return uId;
    }

    public void setuId(String uId) {
        this.uId = uId;
    }

    public String getuName() {
        return uName;
    }

    public void setuName(String uName) {
        this.uName = uName;
    }

    public String getuPhone() {
        return uPhone;
    }

    public void setuPhone(String uPhone) {
        this.uPhone = uPhone;
    }

    public String getuEmail() {
        return uEmail;
    }

    public void setuEmail(String uEmail) {
        this.uEmail = uEmail;
    }

    public String getuTypeid() {
        return uTypeid;
    }

    public void setuTypeid(String uTypeid) {
        this.uTypeid = uTypeid;
    }
}
