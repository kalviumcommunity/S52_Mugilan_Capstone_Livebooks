export const CatchAsyncError = (thefucn ) => (req, res, next)=>{
    Promise.resolve(thefucn(req,res,next)).catch(next)

}