package com.ljj.springbootinit.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;

import com.ljj.common.model.dto.userinterfaceinfo.UserInterfaceInfoQueryRequest;
import com.ljj.common.model.entity.UserInterfaceInfo;
import io.swagger.models.auth.In;
import lombok.Synchronized;

/**
* @author DELL
* @description 针对表【user_interface_info(用户调用接口关系)】的数据库操作Service
* @createDate 2025-01-31 21:01:28
*/
public interface UserInterfaceInfoService extends IService<UserInterfaceInfo> {

    void validInterfaceInfo(UserInterfaceInfo userInterfaceInfo, boolean add);

    QueryWrapper<UserInterfaceInfo> getQueryWrapper(UserInterfaceInfoQueryRequest userInterfaceInfoQueryRequest);


    //防止用户在同一时间执行超量调用，加锁来限制
//这个注解是用来解决多线程并发访问同一个方法时，保证线程安全的一种方法。
    boolean invokeCount(long interfaceInfoId, long userId);

}



