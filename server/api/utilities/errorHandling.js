/**
 * Module that handle all the errors
 * @type {Module}
 */
module.exports = {
    /**
     * function that control the various type of error
     * @param  {object} res   [the response of the get requet]
     * @param  {object} error [contain the properties of the error]
     */
 errorType : function(error,res){
    switch(error.status) {
        case 204:
          res.status(error.status);
          res.json({
              error: {
                  message: "No Content"
              }
          })
          break;
    case 301:
      res.status(error.status);
      res.json({
          error: {
              message: "Moved Permanently"
          }
      })
      break;
    case 304:
      res.status(error.status);
      res.json({
          error: {
              message: "Not Modified"
          }
      })
      break;
      case 307:
        res.status(error.status);
        res.json({
            error: {
                message: "Temporary Redirect"
            }
        })
        break;
        case 400:
          res.status(error.status);
          res.json({
              error: {
                  message: "Bad Request"
                  }
          })
        break;
          case 401:
            res.status(error.status);
            res.json({
                error: {
                    message: "Unauthorized"
                    }
            })
            break;
          case 403:
            res.status(error.status);
            res.json({
                error: {
                    message: "Forbidden"
                    }
              })
            break;
            case 404:
              res.status(error.status);
              res.json({
                  error: {
                      message: "Not Found"
                    }
                  })
              break;
            case 405:
              res.status(error.status);
              res.json({
                  error: {
                      message: "Method not Allowed"
                      }
                })
              break;
            case 406:
              res.status(error.status);
              res.json({
                  error: {
                      message: "Not Acceptable"
                      }
                  })
              break;
              case 409:
                res.status(error.status);
                res.json({
                    error: {
                        message: "User email already exist!"
                        }
                    })
                break;
            case 412:
              res.status(error.status);
              res.json({
                  error: {
                      message: "Precondition Failed"
                      }
                    })
              break;
            case 415:
              res.status(error.status);
              res.json({
                  error: {
                      message: "Unsupported Media Type"
                    }
                  })
              break;
            default:
              res.status(500)
              res.json({
                  error: {
                      message: "Internal Server Error"
                  }
                })
            break;
          }
      },
/**
 * function that check the errors in a get request
 * @param  {buffer} data  [a buffer with all the json data]
 * @param  {object} res   [the response of the get requet]
 * @param  {object} error [contain the properties of the error]
 */
    checkErrorForGet: function(data, res, error){
        if(data.length > 4){
            res.status(200).json({
                message: 'handling Get request to /json',
                getJson : JSON.parse(data)
            });
        } else {
            res.status(204).json();
        }
    },
    /**
 * function that check the errors in a put request
 * @param  {object} res   [the response of the get requet]
 * @param  {object} error [contain the properties of the error]
 */
    checkErrorForPut: function(res,req, error){
        if(error){
            errorType(error,res);
        } else {
            res.status(200).json({
                message:'your data has been updated!',
                jsonUpdated: req.body
            });
        }
    },
/**
 * function that check the errors in a post request
 * @param  {object} res   [the response of the get requet]
 * @param  {object} error [contain the properties of the error]
 */
    checkErrorForPost: function(res, error, jsonData, id){
        if(error){
            errorType(error,res);
        } else {
            res.status(200).json({
                message: 'handling POST request to /json',
                createdJson: jsonData,
                id: id
            });
        }
    }

    };
