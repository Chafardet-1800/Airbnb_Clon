const userControllers = require('./user.controllers.js')

const getAll = (req, res) => {
    userControllers.getAllUsers()

        .then((response) => {
            res.status(200).json({
                items: response.length,
                users: response
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })  
}

const getById = async (req, res) => {
    const id = req.params.id 
    userControllers.getUserById(id)

        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

const register = (req, res) => {
    const data = req.body
    if(!data){
        return res.status(400).json({
            message: 'Missing Data.' 
        })
    }
    else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.phone ||
        !data.birthday_date ||
        !data.country 
    ){
        return res.status(400).json({
            message: 'All fields must be completed.',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                password: 'string',
                birthday_date: 'YYYY/MM/DD',
                country: 'string',
            },
        });
    }else{
        userControllers.createUser(data)
            .then(response => {
                res.status(201).json({
                    message: `User created succesfully with id: ${response.id}`,
                    user: response
                })
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }
}

const remove = (req, res) => {
    const id = req.params.id;
    
    userControllers.deleteUser(id)
        .then(response => {
            if(response) {
                res.status(204).json()
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
        })
}

const edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if(!Object.keys(data).length){
        return res.status(400).json({
            message: 'Missing Data.' 
        })
    } else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.rol ||
        !data.profile_image ||
        !data. birthday_date ||
        !data.contry ||
        !data.is_active
    ){
        return res.status(400).json({
            message: 'All fields must be completed.',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                phone: '+58xxx-xxx-xxxx',
                rol: 'string',
                profile_image: 'string',
                birthday_date: 'DD/MM/YYYY',
                contry: 'string',
                is_active: true
            },
        });
    }else{

        userControllers.editUser(id, data)

        .then(response => {
            res.status(201).json({
                message: `User edited succesfully`,
                user: response
            })
        })

        .catch(err => {
            res.status(404).json(err)
        })
    }
}

const editMyUser = (req, res) => {
    const id = req.user.id;
    const data = req.body;

    if(!Object.keys(data).length){
        return res.status(400).json({
            message: 'Missing Data.' 
        })
    } else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data. birthday_date ||
        !data.contry ||
        !data.is_active
    ){
        return res.status(400).json({
            message: 'All fields must be completed.',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                phone: '+58xxx-xxx-xxxx',
                profile_image: 'string',
                birthday_date: 'DD/MM/YYYY',
                contry: 'string',
                is_active: true
            },
        });
    }else{
        userControllers.editUser(id, data)
            .then(response => {
                res.status(201).json({
                    message: `My user edited succesfully`,
                    user: response
                })
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }
}

const getMyUser = (req, res) => {
    const id = '5a569b70-2be8-4706-9086-920fc4726d7c'
    console.log(id)
    userControllers.getUserById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id;
    userControllers.deleteUser(id)
        .then(response => {
            if(response) {
                res.status(204).json()
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
        })
}

const profileImage = (req, res) => {
    const id = req.user.id
    const imgUrl = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename
    userControllers.editProfileImage(id, imgUrl)
        .then( response => {
            res.status(200).json({
                message: 'Image succesfully Updated',
                user: response
            })
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

module.exports = {
    getAll,
    getById,
    register,
    remove,
    edit,
    getMyUser,
    editMyUser,
    deleteMyUser,
    profileImage
}