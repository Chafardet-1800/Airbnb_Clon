const router = require('express').Router()
const passport = require('passport')
const { rolAdminMiddleware } = require('../middleware/admin.Middelware')
const upload = require('../tools/multer').upload
require('../middleware/auth.middleware')(passport)

const userServices = require('./user.http')

router.route('/')  //*/api/v1/users
    .get(userServices.getAll)

router.route('/:id')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getById
        )
    .delete(
        passport.authenticate('jwt', {session: false}),
        rolAdminMiddleware, 
        userServices.remove
    )
    .put(
        passport.authenticate('jwt', {session: false}),
        rolAdminMiddleware, 
        userServices.edit
    )
    
    
router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getMyUser
    )
    .put(
        passport.authenticate('jwt', {session: false}),
        userServices.editMyUser
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        userServices.deleteMyUser
    )

router.route('/me/profile-img')
    .post(
        passport.authenticate('jwt', {session: false}),
        upload.single('profile_img'),
        userServices.profileImage
    )
    
            
                
                
exports.router = router