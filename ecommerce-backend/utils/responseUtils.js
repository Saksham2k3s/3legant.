const userApiResponse = (res, statusCode, success, message, data = null, token = null) => {
    const response = {
        success: success,
        message: message,
    };

    if (data) {
        response.data = data;
    }

    if (token) {
        response.token = token;
    }

    return res.status(statusCode).json(response);
}

const productApiResponse = (res, statusCode, success, message, products, totalProducts, resultPerPage) => {
      const response = {
        success : success,
        message : message
      }

      if(products){
        response.products = products
      }

      if(totalProducts){
        response.totalProducts = totalProducts
      }

      if(resultPerPage){
        response.resultPerPage = resultPerPage
      }

      return res.status(statusCode).json(response);
}

 const orderApiResponse = (req, statusCode, success, message) => {
    const response = {
        success : success,
        message : message
    }

    return res.status(statusCode).json(response);
}

const cartApiResponse = (res, statusCode, success, message, cart) => {
    const respone = {
        success : success,
        message : message
    }

    if(cart){
        respone.cart = cart;
    }

    return res.status(statusCode).json(respone);
}

module.exports = {
    userApiResponse,
    productApiResponse,
    orderApiResponse,
    cartApiResponse
}
