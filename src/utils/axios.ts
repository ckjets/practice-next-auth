import Axios from "axios";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export const useAxios = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken;

  const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  /** レスポンスが返ってくる前の共通化処理 */
  axios.interceptors.response.use(
    (response) => {
      // onSuccessがキャッチする
      return response;

      // return Promise.resolve(response.data);
    },
    (error) => {
      console.log("error!!!!!!");
      /* 401 Unauthorized */
      if (error.response?.status === 401) {
        router.push("/login");
      }

      /* AxiosError */
      if (error.isAxiosError && error.response?.data?.errors) {
        // if (error.isAxiosError && error.response?.data?.errors) {

        console.log("axios error");
      }

      // rejectを投げないと、onErrorでキャッチできない
      return Promise.reject({
        error: error.response,
      });
    }
  );

  /** GET APIをコールする関数。
   * @type {TFetchParams} パラメータのデータ型
   * @type {TFetchResponse} レスポンスのデータ型
   * @param endPoint: リクエスト先のエンドポイント
   * @param params: リクエストパラメータ
   */

  async function get<TFetchParams, TFetchResponse>(
    endPoint: string,
    params?: TFetchParams
  ) {
    return await axios
      .get<TFetchResponse>(endPoint, { params })
      .then((res) => res.data);
  }

  /** POST API をコールする関数
   * @type {TCreateReqBody} レスポンスのデータ型
   * @param endPoint リクエスト先のエンドポイント
   * @param {TCreateReqBody} body リクエストボディ
   */
  async function post<TCreateReqBody>(endPoint: string, body: TCreateReqBody) {
    return await axios.post<{ status: number; id: number }>(endPoint, body);
  }

  /** PUT API をコールする関数 */
  async function put<TputequestBody, TPromiseCallback>(
    endPoint: string,
    body: TputequestBody,
    callback?: () => Promise<TPromiseCallback>
  ) {
    return await axios.put<{ status: number }>(endPoint, body);
  }

  /** DELETE API をコールする関数 */
  async function deleter<TPromiseCallback, TDeleteReqBody>(
    endPoint: string,
    data?: TDeleteReqBody,
    callback?: () => Promise<TPromiseCallback>
  ) {
    await axios.delete<{ status: number }>(endPoint, {
      data: data,
    });
  }

  return {
    get,
    post,
    put,
    deleter,
    axios,
  };
};
