package com.ljj.springbootinit.inners;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ljj.common.model.entity.User;
import com.ljj.common.service.InnerUserService;
import com.ljj.springbootinit.common.ErrorCode;
import com.ljj.springbootinit.exception.BusinessException;
import com.ljj.springbootinit.mapper.UserMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboService;

import javax.annotation.Resource;
@DubboService // 声明当前类为dubbo服务，可以被注册到注册中心
public class InnerUserServiceImpl implements InnerUserService {
    @Resource
    private UserMapper userMapper;
    @Override
    public User getUserByAkSk(String ak) {
        if(StringUtils.isAnyBlank(ak)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "ak or sk 是空的");
        }
        QueryWrapper<User> eq = new QueryWrapper<User>().eq("accessKey", ak);
        User user = userMapper.selectOne(eq);
        return user;
    }
}
