import api from "../utils/api";
import * as types from "../constants/post.constants";
import { commonUiActions } from "./commonUiAction";

const getPostList = (searchQuery) => async (dispatch) => {
    console.log(searchQuery)
    try {
        dispatch({type: types.POST_GET_REQUEST})
        const res = await api.get(`/post/all`, {
            params: {...searchQuery},
        });
        if(res.status !== 200) {
            throw new Error('포스트를 불러오는데 실패하였습니다.')
        } else {
            dispatch({type: types.POST_GET_SUCCESS, payload: res.data.data.allPost})
        }
    } catch (error) {
        dispatch({type: types.POST_GET_FAIL, payload: error.message})
        // dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const getPostDetail = (id) => async (dispatch) => {
    try {
        dispatch({type: types.GET_POST_DETAIL_REQUEST})
        const res = await api.get(`/post/${id}`);
        if(res.status !== 200) {
            throw new Error('포스트를 불러오는데 실패하였습니다.')
        } else {
            dispatch({type: types.GET_POST_DETAIL_SUCCESS, payload: res.data.data.post})
        }
    } catch (error) {
        dispatch({type: types.GET_POST_DETAIL_FAIL, payload: error.message})
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const createPost = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({type: types.POST_CREATE_REQUEST})
        const res = await api.post('/post', formData);
        if(res.status !== 200) {
            throw new Error('새 포스트 등록에 실패하였습니다. 다시 시도해주세요.')
        } else {
            dispatch({type: types.POST_CREATE_SUCCESS, payload: res.data.data})
            dispatch(commonUiActions.showToastMessage("새 포스트가 등록되었습니다.", "success"))
            navigate(`/post/${res.data.data.newPost._id}`)
        }
    } catch (error) {
        dispatch({type: types.POST_CREATE_FAIL, payload: error.message})
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const deletePost = (id, navigate) => async (dispatch) => {
    try {
        dispatch({type: types.POST_DELETE_REQUEST})
        const res = await api.delete(`/post/${id}`);
        if(res.status !== 200) {
            throw new Error('포스트 삭제에 실패하였습니다.')
        } else {
            dispatch({type: types.POST_DELETE_SUCCESS})
            dispatch(commonUiActions.showToastMessage("포스트를 삭제하였습니다.", "success"))
            navigate(`/post`)
        }
    } catch (error) {
        dispatch({type: types.POST_DELETE_FAIL, payload: error.message})
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const updatePost = (id, formData, navigate) => async (dispatch) => {
    try {
        dispatch({type: types.POST_EDIT_REQUEST});
        const res = await api.put(`/post/${id}`, formData);
        if(res.status !== 200) {
            throw new Error('포스트 수정에 실패하였습니다.')
        } else {
            dispatch({type: types.POST_EDIT_SUCCESS})
            dispatch(commonUiActions.showToastMessage("포스트가 수정되었습니다.", "success"))
            navigate(`/post/${id}`)
        }
    } catch (error) {
        dispatch({type: types.POST_EDIT_FAIL, payload: error.message})
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const createComment = (id, newComment) => async (dispatch) => {
    try {
        dispatch({type: types.CREATE_POST_COMMENT_REQUEST})
        const res = await api.post(`/post/comment`, { postId:id, content:newComment });
        if(res.status !== 200) {
            throw new Error('댓글 등록에 실패하였습니다.')
        } else {
            dispatch({type: types.CREATE_POST_COMMENT_SUCCESS})
            dispatch(commonUiActions.showToastMessage("댓글이 등록되었습니다.", "success"))
            dispatch(getPostDetail(id))
        }
    } catch (error) {
        dispatch({type: types.CREATE_POST_COMMENT_FAIL, payload: error.message})
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
}

const addLike = (id) => async (dispatch) => {
    try {
        dispatch({type: types.ADD_LIKE_ON_POST_REQUEST});
        const res = await api.post(`/post/like`, { postId: id });
        if(res.status !== 200) {
            throw new Error('좋아요에 실패하였습니다.')
        } else {
            console.log(res)
            dispatch({type: types.ADD_LIKE_ON_POST_SUCCESS});
            dispatch(getPostList());
            dispatch(getPostDetail(id));
        }
    } catch (error) {
        dispatch({type: types.ADD_LIKE_ON_POST_FAIL, payload: error.message})
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
}


export const postActions = {
  getPostList,
  createPost,
  deletePost,
  updatePost,
  getPostDetail,
  createComment,
  addLike
};
