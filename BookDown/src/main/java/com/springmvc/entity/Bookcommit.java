package com.springmvc.entity;

public class Bookcommit {
    private Integer bcId;

    private Integer bId;

    private String uId;

    private String commtime;

    private String comm;

    public Integer getBcId() {
        return bcId;
    }

    public void setBcId(Integer bcId) {
        this.bcId = bcId;
    }

    public Integer getbId() {
        return bId;
    }

    public void setbId(Integer bId) {
        this.bId = bId;
    }

    public String getuId() {
        return uId;
    }

    public void setuId(String uId) {
        this.uId = uId;
    }

    public String getCommtime() {
        return commtime;
    }

    public void setCommtime(String commtime) {
        this.commtime = commtime;
    }

    public String getComm() {
        return comm;
    }

    public void setComm(String comm) {
        this.comm = comm;
    }
}