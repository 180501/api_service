package com.ljj.springbootinit.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ljj.common.model.entity.InterfaceInfo;
import com.ljj.springbootinit.model.dto.interfaceinfo.InterfaceInfoQueryRequest;

/**
* @author DELL
* @description 针对表【interface_info(接口信息)】的数据库操作Service
* @createDate 2025-01-25 20:43:56
*/
public interface InterfaceInfoService extends IService<InterfaceInfo> {
    public void validInterfaceInfo(InterfaceInfo interfaceInfo, boolean add);
    public QueryWrapper<InterfaceInfo> getQueryWrapper(InterfaceInfoQueryRequest postQueryRequest);

}
