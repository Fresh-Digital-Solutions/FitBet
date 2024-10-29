const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (req, res) => {
    const id  = req.user.id;

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        });

        if(!user) {
            return res.status(404).json({message: "User not found"});

        }

        
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    const  id  = req.user.id;

    try {
        const user = await prisma.user.delete({
            where: {
                id: id,
            }
        });

        res.status(200).json({ user: user, message: "User deleted" });
    } catch (error) {
        if (error.code === 'P2025') { // prisma error code 
            return res.status(404).json({ message: "User not found" });
        }
        res.status(500).json({
            message: "Error with server",
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    const id = req.user.id;
    const { name, email } = req.body;

    try {
        const data = {};

        if (name) data.name = name;
        if (email) data.email = email;
        
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: data,
        });

        res.status(200).json({ user: user, message: "User updated" });
    } catch (error) {
        if (error.code === 'P2025') { // prisma error code
            return res.status(404).json({ message: "User not found" });
        }

        // This should be outside the 'if' block and inside the catch block
        res.status(500).json({
            message: "Error with server",
            error: error.message
        });
    }
};


const searchUsers = async (req, res) => {
    const { query } = req.query;  // Query parameter, e.g., a name or email substring
    const id  = req.user.id
    try {
        const users = await prisma.user.findMany({
            where: {
              AND: [
                {
                  OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                  ]
                },
                { id: { not: id } } 
              ]
            },
            select: {
              id: true,
              name: true,
              email: true,
            }
          });
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error with searching users", error: error.message });
    }
};

const getAUser = async (req, res) => {
    const { id }  = req.params;

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        });

        if(!user) {
            return res.status(404).json({message: "User not found"});

        }

        
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
}




module.exports = {
    getUser,
    deleteUser,
    updateUser,
    searchUsers, 
    getAUser
}