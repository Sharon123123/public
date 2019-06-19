package com.itheima.ssm.service;

import com.itheima.ssm.domain.Product;

import java.util.List;

public interface IProductService {
    /**
     * 查询所有产品
     */

    public List<Product> findAll();


    /**
     * 保存产品
     */

    public void save(Product product);
}
