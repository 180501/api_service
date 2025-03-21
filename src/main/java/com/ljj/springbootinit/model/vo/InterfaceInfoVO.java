package com.ljj.springbootinit.model.vo;


import com.ljj.common.model.entity.InterfaceInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 接口信息封装视图,包装了InterfaceInfo的实体类，并增加了调用次数的字段，这个是用于视图分析的包装请求
 * @author yupi
 * @TableName product
 */
@EqualsAndHashCode(callSuper = true)
@Data
// 这里就继承InterfaceInfo，再补充一个调用次数的字段
public class InterfaceInfoVO extends InterfaceInfo {

    /**
     * 调用次数
     */
    private Integer totalNum;

    private static final long serialVersionUID = 1L;
}
