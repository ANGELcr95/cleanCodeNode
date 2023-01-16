

export const validateFile = (req = request, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: `Must send a file or key name must be file`
      });
    }

    next()
}