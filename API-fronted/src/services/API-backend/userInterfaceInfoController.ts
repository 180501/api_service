// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserInterfaceInfo POST /api/UserInterfaceInfo/add */
export async function addUserInterfaceInfoUsingPost(
  body: API.UserInterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/UserInterfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserInterfaceInfo POST /api/UserInterfaceInfo/delete */
export async function deleteUserInterfaceInfoUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/UserInterfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserInterfaceInfoVOById GET /api/UserInterfaceInfo/get/vo */
export async function getUserInterfaceInfoVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserInterfaceInfo_>('/api/UserInterfaceInfo/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserInterfaceInfoByPage POST /api/UserInterfaceInfo/list/page */
export async function listUserInterfaceInfoByPageUsingPost(
  body: API.UserInterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceInfo_>('/api/UserInterfaceInfo/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUserInterfaceInfo POST /api/UserInterfaceInfo/update */
export async function updateUserInterfaceInfoUsingPost(
  body: API.UserInterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/UserInterfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
