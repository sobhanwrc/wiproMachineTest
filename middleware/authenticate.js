export default async function allowIfLoggedIn (req, res, next) {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
            return res.status(401).json({
                error: "You need to be logged in to access this route or need to pass the auth token."
            });
            req.user = user;
            next();
    }catch (error) {
            next(error);
    }
}