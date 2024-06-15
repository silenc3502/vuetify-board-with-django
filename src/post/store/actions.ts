import { ActionContext } from 'vuex'
import { PostState, Post } from '@/post/store/states'
import {
    REQUEST_POST_LIST_TO_FASTAPI,
    REQUEST_POST_TO_FASTAPI,
} from './mutation-types'
import axiosInst from '../../utility/axiosInstance'
import { AxiosResponse } from 'axios'
import {Board, BoardState} from "@/board/store/states";
import {REQUEST_BOARD_TO_SPRING} from "@/board/store/mutation-types";

export type PostActions = {
    requestPostListToFastapi(context: ActionContext<PostState, any>): Promise<void>
    requestPostToFastapi(context: ActionContext<PostState, any>, id: number): Promise<void>
    requestRegisterPostToFastapi(
        context: ActionContext<PostState, unknown>,
        payload: { title: string, content: string, }
    ): Promise<AxiosResponse>
}

const actions: PostActions = {
    async requestPostListToFastapi(context: ActionContext<PostState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.fastApiAxiosInst.get('/posts')
            const data: Post[] = res.data
            console.log('data:', data)
            context.commit(REQUEST_POST_LIST_TO_FASTAPI, data)
        } catch (error) {
            console.error('requestPostListToFastapi(): ' + error)
            throw error
        }
    },
    async requestPostToFastapi(context: ActionContext<PostState, any>, id: number): Promise<void> {
        try {
            const res: AxiosResponse<Post> = await axiosInst.fastApiAxiosInst.get(`/posts/read/${id}`)
            console.log('res:', res.data)
            context.commit(REQUEST_POST_TO_FASTAPI, res.data)
        } catch (error) {
            alert('requestPostToFastapi() 문제 발생!')
            throw error
        }
    },
    async requestRegisterPostToFastapi(
        context: ActionContext<PostState, unknown>,
        payload: { title: string, content: string, }
    ): Promise<AxiosResponse> {

        const { title, content, } = payload
        console.log('전송할 데이터:', { title, content, })

        try {
            const res: AxiosResponse = await axiosInst.fastApiAxiosInst.post('/posts', { title, content })
            console.log('응답 데이터:', res.data)
            return res.data
        } catch (error) {
            alert('requestRegisterPostToFastapi() 문제 발생')
            throw error
        }
    },
}

export default actions