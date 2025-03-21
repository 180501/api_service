package com.ljj.springbootinit.common;

import lombok.Data;

import java.io.Serializable;

/**
 * 简单的基本类型便于json参数传递
 */
@Data
public class IdRequest implements Serializable {
    private Long id;
    private static final long serialVersionUID = 1L;
}
