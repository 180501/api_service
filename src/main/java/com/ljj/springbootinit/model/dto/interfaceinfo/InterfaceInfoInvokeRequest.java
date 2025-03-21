package com.ljj.springbootinit.model.dto.interfaceinfo;

import lombok.Data;

/**
 * @Author ljj
 * @Date 2021/1/15 10:50
 * @Description 模拟接口请求参数分装对象
 *
 */
@Data
public class InterfaceInfoInvokeRequest {
    /**
     * 用户请求参数
     */
    private String userRequestParams;
    /**
     * 对应接口id
     */
    private Long id;

}
