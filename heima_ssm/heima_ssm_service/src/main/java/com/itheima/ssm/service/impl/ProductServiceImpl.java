package com.itheima.ssm.service.impl;

import com.itheima.ssm.dao.IProductDao;
import com.itheima.ssm.domain.Product;
import com.itheima.ssm.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements IProductService{
    @Autowired
    private IProductDao productDao;

    public List<Product> findAll() {

        /**
         * 查询产品
         */

        return productDao.findAll();
    }

    /**
     * 保存产品
     */

    @Override
    public void save(Product product) {
        productDao.save(product);
    }
}
