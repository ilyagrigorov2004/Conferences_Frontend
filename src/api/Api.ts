/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Attribute {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
}

export interface AttributeAuthor {
  /** ID */
  id?: number;
  /** Attr id */
  attr_id?: number;
  /** Author id */
  author_id?: number;
  /**
   * Value
   * @minLength 1
   */
  value?: string;
}

export interface EditAttrValue {
  /**
   * Value
   * @minLength 1
   */
  value?: string;
}

export interface Author {
  /** Author id */
  author_id?: number;
  /**
   * Name
   * @minLength 1
   */
  name?: string;
  /**
   * Description
   * @minLength 1
   */
  description?: string;
  /**
   * Status
   * @minLength 1
   */
  status?: string;
  /** Url */
  url?: string | null;
  /**
   * Department
   * @minLength 1
   */
  department?: string;
  /**
   * Birthdate
   * @minLength 1
   */
  birthdate?: string;
}

export interface AddPic {
  /**
   * Image
   * @format uri
   */
  image?: string;
}

export interface AuthorsListResponsee {
  authors: Author[];
  /** Draft conference id */
  draft_conference_id: number;
  /** Draft conference authors count */
  draft_conference_authors_count: number;
}

export interface MMwithAuthor {
  author?: Author;
  /** Is corresponding */
  is_corresponding?: boolean | null;
}

export interface SingleConf {
  /** Conference id */
  conference_id?: number;
  /**
   * Status
   * @minLength 1
   */
  status?: string;
  /**
   * Date created
   * @format date-time
   */
  date_created?: string;
  /**
   * Creator
   * @pattern ^[\w.@+-]+$
   */
  creator?: string;
  /**
   * Date formed
   * @format date-time
   */
  date_formed?: string | null;
  /**
   * Date ended
   * @format date-time
   */
  date_ended?: string | null;
  /**
   * Moderator
   * @pattern ^[\w.@+-]+$
   */
  moderator?: string;
  /**
   * Conf start date
   * @format date-time
   */
  conf_start_date?: string | null;
  /**
   * Conf end date
   * @format date-time
   */
  conf_end_date?: string | null;
  /**
   * Members count
   * @min -2147483648
   * @max 2147483647
   */
  members_count?: number | null;
  /**
   * Review result
   * @min -2147483648
   * @max 2147483647
   */
  review_result?: number | null;
  authors?: MMwithAuthor[];
}

export interface UserLK {
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email?: string;
  /**
   * First name
   * @minLength 1
   */
  first_name?: string;
  /**
   * Last name
   * @minLength 1
   */
  last_name?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

export interface User {
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  attribute = {
    /**
     * No description
     *
     * @tags Attribute
     * @name AttributeAddCreate
     * @request POST:/Attribute/add/
     * @secure
     */
    attributeAddCreate: (data: Attribute, params: RequestParams = {}) =>
      this.request<Attribute, any>({
        path: `/Attribute/add/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attribute
     * @name AttributeGetAuthorsAttrList
     * @request GET:/Attribute/{author_id}/getAuthorsAttr/
     * @secure
     */
    attributeGetAuthorsAttrList: (authorId: string, params: RequestParams = {}) =>
      this.request<AttributeAuthor, any>({
        path: `/Attribute/${authorId}/getAuthorsAttr/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attribute
     * @name AttributeAddAuthorsAttrUpdate
     * @request PUT:/Attribute/{author_id}/{attr_id}/addAuthorsAttr/
     * @secure
     */
    attributeAddAuthorsAttrUpdate: (
      authorId: string,
      attrId: string,
      data: EditAttrValue,
      params: RequestParams = {},
    ) =>
      this.request<EditAttrValue, any>({
        path: `/Attribute/${authorId}/${attrId}/addAuthorsAttr/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attribute
     * @name AttributeDelete
     * @request DELETE:/Attribute/{id}/
     * @secure
     */
    attributeDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Attribute/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  author = {
    /**
     * No description
     *
     * @tags Author
     * @name AuthorRead
     * @request GET:/Author/{id}/
     * @secure
     */
    authorRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Author/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name AuthorUpdate
     * @request PUT:/Author/{id}/
     * @secure
     */
    authorUpdate: (id: string, data: Author, params: RequestParams = {}) =>
      this.request<Author, any>({
        path: `/Author/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name AuthorDelete
     * @request DELETE:/Author/{id}/
     * @secure
     */
    authorDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Author/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name AuthorAddToConferenceCreate
     * @request POST:/Author/{id}/addToConference/
     * @secure
     */
    authorAddToConferenceCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Author/${id}/addToConference/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Author
     * @name AuthorImgUploadCreate
     * @request POST:/Author/{id}/imgUpload/
     * @secure
     */
    authorImgUploadCreate: (id: string, params: RequestParams = {}) =>
      this.request<AddPic, any>({
        path: `/Author/${id}/imgUpload/`,
        method: "POST",
        body: params.data,
        secure: true,
        ...params,
      }),
  };
  authorInConf = {
    /**
     * No description
     *
     * @tags AuthorInConf
     * @name AuthorInConfUpdate
     * @request PUT:/AuthorInConf/{conf_id}/{author_id}/
     * @secure
     */
    authorInConfUpdate: (
      confId: string,
      authorId: string,
      query?: {
        is_corresponding?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/AuthorInConf/${confId}/${authorId}/`,
        method: "PUT",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthorInConf
     * @name AuthorInConfDelete
     * @request DELETE:/AuthorInConf/{conf_id}/{author_id}/
     * @secure
     */
    authorInConfDelete: (confId: string, authorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/AuthorInConf/${confId}/${authorId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  authors = {
    /**
     * No description
     *
     * @tags Authors
     * @name AuthorsList
     * @request GET:/Authors/
     * @secure
     */
    authorsList: (
      query?: {
        /** @minLength 1 */
        search_author?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthorsListResponsee, any>({
        path: `/Authors/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authors
     * @name AuthorsCreate
     * @request POST:/Authors/
     * @secure
     */
    authorsCreate: (data: Author, params: RequestParams = {}) =>
      this.request<Author, any>({
        path: `/Authors/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  conference = {
    /**
     * No description
     *
     * @tags Conference
     * @name ConferenceRead
     * @request GET:/Conference/{id}/
     * @secure
     */
    conferenceRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Conference/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conference
     * @name ConferenceUpdate
     * @request PUT:/Conference/{id}/
     * @secure
     */
    conferenceUpdate: (id: string, data: SingleConf, params: RequestParams = {}) =>
      this.request<SingleConf, any>({
        path: `/Conference/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conference
     * @name ConferenceDelete
     * @request DELETE:/Conference/{id}/
     * @secure
     */
    conferenceDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Conference/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conference
     * @name ConferenceConfirmUpdate
     * @request PUT:/Conference/{id}/confirm/
     * @secure
     */
    conferenceConfirmUpdate: (
      id: string,
      query?: {
        is_сonfirmed?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/Conference/${id}/confirm/`,
        method: "PUT",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conference
     * @name ConferenceFormUpdate
     * @request PUT:/Conference/{id}/form/
     * @secure
     */
    conferenceFormUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Conference/${id}/form/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  conferences = {
    /**
     * No description
     *
     * @tags Conferences
     * @name ConferencesList
     * @request GET:/Conferences/
     * @secure
     */
    conferencesList: (
      query?: {
        /** @minLength 1 */
        status?: string;
        /** @format date-time */
        min_date_formed?: string;
        /** @format date-time */
        max_date_formed?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/Conferences/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name UserUpdate
     * @request PUT:/User/
     * @secure
     */
    userUpdate: (data: UserLK, params: RequestParams = {}) =>
      this.request<UserLK, any>({
        path: `/User/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserLoginCreate
     * @request POST:/User/login/
     * @secure
     */
    userLoginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/User/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserLogoutCreate
     * @request POST:/User/logout/
     * @secure
     */
    userLogoutCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/User/logout/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserRegisterCreate
     * @request POST:/User/register/
     * @secure
     */
    userRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/User/register/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
