package com.ljj.springbootinit.model.dto.userinterfaceinfo;

import lombok.Data;

import java.io.Serializable;
/**
 * 创建请求
 *
 * @author <a href="https://github.com/180501/Ai_Bi">程序员ljj</a>
 * 
 */
@Data
public class UserInterfaceInfoAddRequest implements Serializable {

    /**
     * 调用用户 id
     */
    private Long userId;

    /**
     * 接口 id
     */
    private Long interfaceInfoId;

    /**
     * 总调用次数
     */
    private Integer totalNum;

    /**
     * 剩余调用次数
     */
    private Integer leftNum;

}