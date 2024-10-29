const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const sendFriendRequest = async (req,res) => {
    const user_id1 = req.user.id; 
    const { user_id2} = req.body

    try{
        const friend = await prisma.friend.create({
            data: {
                user_id1,
                user_id2,
                status: 'Pending'
            }
            
        });

        res.status(200).json({ message: "Friend request sent", friend});
    }catch(error){
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
}


const updateFriendRequest = async (req,res) => {
    
    const { status } = req.body;
    const { id } = req.params;

    try{
        const friend = await prisma.friend.update({
            where: { id },
            data: { status }
            
        });
        
        res.status(200).json({ message: 'Friend request updated!', friend})
    }catch(error){
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
}

const pendingFriendRequests = async (req, res) => {
    const user_id2 = req.user.id;

    try {
        const pendingRequests = await prisma.friend.findMany({
            where: {
                user_id2,
                status: 'Pending'
            },
            include: {
                user1: { select: { id: true, name: true, email: true } }
            }
        });

        res.status(200).json({ message: "Pending friend requests", pendingRequests });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};


const cancelFriendRequest = async (req, res) => {
    const { id } = req.params;  

    try {
        await prisma.friend.delete({
            where: { id }
        });

        res.status(200).json({ message: "Friend request canceled" });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};



const getUserFriends = async (req, res) => {
    const userId = req.user.id
    try {
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { user_id1: userId, status: 'Accepted' },
                    { user_id2: userId, status: 'Accepted' }
                ]
            },
            include: {
                user1: { select: { id: true, name: true } },
                user2: { select: { id: true, name: true } }
            }
        });

        res.status(200).json({ message: "User friends", friends });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};


const deleteUserFriend = async (req, res) => {
    const { id } = req.params;  // Friend request ID

    try {
        await prisma.friend.update({
            where: { id },
            data: { deleted_at: new Date(), status: 'Rejected' }
        });

        res.status(200).json({ message: "Friend removed" });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};

const checkFriendship = async (req, res) => {
    const user_id1 = req.user.id; 
    const { id } = req.params; 

    try {
        const friendship = await prisma.friend.findFirst({
            where: {
                OR: [
                    { user_id1, user_id2: id },
                    { user_id1: id, user_id2: user_id1 }
                ]
            },
            select: {
                status: true
            }
        });

        res.status(200).json({
            status: friendship ? friendship.status : "No Request"
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = {
    sendFriendRequest,
    cancelFriendRequest,
    pendingFriendRequests,
    getUserFriends,
    deleteUserFriend,
    updateFriendRequest,
    checkFriendship
}




