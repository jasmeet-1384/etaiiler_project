import * as PostService from '../services/post.service';

export const addPost = async (req, res, next) => {
  try {
    const data = await PostService.addPost(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const removePost = async (req, res, next) => {
  try {
    const data = await PostService.removePost(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const data = await PostService.getAllPosts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPostsHome = async (req, res, next) => {
  try {
    const data = await PostService.getAllPostsHome(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
}

export const relatedPosts = async (req, res, next) => {
  try {
    const data = await PostService.getRelatedPosts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error)
  }
}

export const getPostById = async (req, res, next) => {
  try {
    const data = await PostService.getPostById(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error)
  }
}

export const sharePost = async (req, res, next) => {
  try {
    const data = await PostService.sharePost(req.params);
    // let url = `https://www.google.com`
    let url = `iuniverse://post/${data.data}`
    res.redirect(url);
    console.log("sdfhbhs ==========>>>>>>>>    ", url)
  } catch (error) {
    next(error)
  }
}

export const getOwnPosts = async (req, res, next) => {
  try {
    console.log(req)
    const data = await PostService.getOwnPosts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnPostsCounts = async (req, res, next) => {
  try {
    const data = await PostService.getOwnPostsCounts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const addPostLike = async (req, res, next) => {
  try {
    const data = await PostService.addPostLike(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const removePostLike = async (req, res, next) => {
  try {
    const data = await PostService.removePostLike(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPostLikes = async (req, res, next) => {
  try {
    const data = await PostService.getPostLikes(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPostLikes = async (req, res, next) => {
  try {
    const data = await PostService.getAllPostLikes(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPostLikeCount = async (req, res, next) => {
  try {
    const data = await PostService.getPostLikeCount(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getLikesByUser = async (req, res, next) => {
  try {
    const data = await PostService.getLikesByUser(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
}

export const addPostComment = async (req, res, next) => {
  try {
    const data = await PostService.addPostComment(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPostComment = async (req, res, next) => {
  try {
    const data = await PostService.getPostComment(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPostCommentCount = async (req, res, next) => {
  try {
    const data = await PostService.getPostCommentCount(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const removePostComment = async (req, res, next) => {
  try {
    const data = await PostService.removePostComment(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};



export const sharePosts = async (req, res, next) => {
  try {
    const data = await PostService.sharePosts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPostShares = async (req, res, next) => {
  try {
    const data = await PostService.getPostShares(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPostTags = async (req, res, next) => {
  try {
    const data = await PostService.getPostTags(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const addHidePost = async (req, res, next) => {
  try {
    const data = await PostService.addHidePost(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getHiddenPosts = async (req, res, next) => {
  try {
    const data = await PostService.getHiddenPosts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const reportPosts = async (req, res, next) => {
  try {
    const data = await PostService.reportPosts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const deletePosts = async (req, res, next) => {
  try {
    const data = await PostService.deletePosts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};


export const getPromoPosts = async (req, res, next) => {
  try {
    const data = await PostService.getPromoPosts(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPromoPlans = async (req, res, next) => {
  try {
    const data = await PostService.getPromoPlans(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getDiscountPlans = async (req, res, next) => {
  try {
    const data = await PostService.getDiscountPlans(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPayment = async (req, res, next) => {
  try {
    const data = await PostService.getPayment(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentOrderId = async (req, res, next) => {
  try {
    const data = await PostService.getPaymentOrderId(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
    // console.log(data,"kookokoko")
  } catch (error) {
    next(error);
  }
};

export const getRazorpayDetails = async (req, res, next) => {
  try {
    const data = await PostService.getRazorpayDetails(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};