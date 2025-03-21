package com.ljj.springbootinit.inners;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ljj.common.model.entity.InterfaceInfo;
import com.ljj.common.service.InnerInterfaceInfoService;
import com.ljj.springbootinit.common.ErrorCode;
import com.ljj.springbootinit.exception.BusinessException;
import com.ljj.springbootinit.mapper.InterfaceInfoMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboService;

import javax.annotation.Resource;
@DubboService
public class InnerInterfaceInfoServiceImpl implements InnerInterfaceInfoService {
    @Resource
    private InterfaceInfoMapper interfaceInfoMapper;
    @Override
    public InterfaceInfo getInterfaceInfo(String url, String method) {
        if(StringUtils.isAnyBlank(url, method)){
            throw  new BusinessException(ErrorCode.PARAMS_ERROR,"url or method is null");
        }
        QueryWrapper<InterfaceInfo> eq = new QueryWrapper<InterfaceInfo>().eq("url", url).eq("method", method);
        InterfaceInfo interfaceInfo = interfaceInfoMapper.selectOne(eq);

        return interfaceInfo;
    }
}
