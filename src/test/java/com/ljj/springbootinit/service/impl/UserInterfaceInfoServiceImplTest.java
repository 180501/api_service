package com.ljj.springbootinit.service.impl;


import com.ljj.common.service.InnerUserInterfaceInfoService;
import com.ljj.springbootinit.service.UserInterfaceInfoService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class UserInterfaceInfoServiceImplTest {
@Resource
    private InnerUserInterfaceInfoService innerUserInterfaceInfoService;
    @Test
    public void invokeCount() {
        boolean b = innerUserInterfaceInfoService.invokeCount(2568L, 1L);
        Assert.assertTrue(b);

    }
}