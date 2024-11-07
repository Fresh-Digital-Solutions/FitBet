const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const stripe = require('stripe')(process.env.STRIPE_KEY);

const SendBetRequest = async (req, res) => {
    const id = req.user.id;
    const { user_id2, amount, start_at, ends_at, goal_time, goal_start_time, goal_end_time } = req.body;

    if (!user_id2 || !amount || !start_at || !ends_at || !goal_time || !goal_start_time || !goal_end_time) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount value" });
    }
    if (new Date(start_at) >= new Date(ends_at)) {
        return res.status(400).json({ message: "End date must be after start date" });
    }

    // Determine if the bet should be active
    const now = new Date();
    const startDate = new Date(start_at);
    const endDate = new Date(ends_at);
    const isActive = startDate >= now && now < endDate;

    try {
        const [bet, workoutGoal] = await prisma.$transaction([
            prisma.bet.create({
                data: {
                    user_id1: id,
                    user_id2,
                    amount,
                    status: "Pending",
                    active: isActive,
                    start_at: startDate,
                    ends_at: endDate,
                }
            }),
            prisma.workoutgoal.create({
                data: {
                    user_id1: id,
                    goal_time,
                    goal_start_time: new Date(goal_start_time),
                    goal_end_time: new Date(goal_end_time)
                }
            })
        ]);

        // If both bet and workoutGoal were created successfully
        if (bet && workoutGoal) {
            // Update the bet with the workoutGoalId to establish a relationship if needed
            await prisma.bet.update({
                where: { id: bet.id },
                data: { workoutGoalId: workoutGoal.id }
            });

            res.status(200).json({ message: "Success", workoutGoal, bet });
        } else {
            res.status(500).json({ message: "Failed to create bet and workout goal" });
        }
    } catch (error) {
        console.error("Error in SendBetRequest:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
// This updates the bet request either accepted or rejected if accepted then we need to setup payment intent with stripe
const UpdateBetRequest = async (req,res) => {
    const { status } = req.body;
    const { id } = req.params;

    try{
        const bet = await prisma.bet.update({
            where: { id },
            data: { status },
            select: {
                user_id1: true,
                user_id2: true,
                amount: true
            }
            
        });

        let paymentIntentUser1;
        let paymentIntentUser2;

        if(bet.status == "Accepted"){
            try{
                const [user1, user2] = await prisma.$transaction([
                    prisma.user.findUnique({
                        where: { id: bet.user_id1 },
                        select: { stripeId: true}
                    }),
                    prisma.user.findUnique({
                        where: { id: bet.user_id2 },
                        select: { stripeId: true}
                    })
                ])
                paymentIntentUser1 = await stripe.paymentIntents.create({
                    amount: bet.amount * 100,
                    currency: 'usd',
                    customer: user1.stripeId
                });

                paymentIntentUser2 = await stripe.paymentIntents.create({
                    amount: bet.amount * 100,
                    currency: 'usd',
                    customer: user2.stripeId
                });
            }catch(err){
                console.error("Stripe API error:", err);
                res.status(500).json({message: "Error with Stripe API call:" , err})
            }
        }
        
        res.status(200).json({
            message: 'Bet request updated!',
            bet,
            paymentIntentUser1: paymentIntentUser1 || null,
            paymentIntentUser2: paymentIntentUser2 || null
          });
    }catch(error){
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
}
// this gets the pending request of the user
const PendingBetRequest = async (req,res) => {
    const user_id2 = req.user.id;

    try {
        const pendingRequests = await prisma.bet.findMany({
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

// This allows the user to reject the bet request
const CancelBetRequest = async (req,res) => {
    const { id } = req.params;  

    try {
        await prisma.bet.delete({
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

const GetUserAllBets = async (req, res) => {
    const userId = req.user.id;

    try {
        const bets = await prisma.bet.findMany({
            where: {
                OR: [
                    { user_id1: userId, status: 'Accepted' },
                    { user_id2: userId, status: 'Accepted' }
                ]
            },
            include: {
                user1: { select: { id: true, name: true } },
                user2: { select: { id: true, name: true } },
                workoutGoal: { select: { goal: true } } // include goal details if needed
            }
        });

        const betList = bets.map(bet => {
            if (bet.user_id1 === userId) {
                // If user_id1 is the authenticated user, show user2 as the counterpart
                return { 
                    id: bet.id, 
                    counterpart: { id: bet.user2.id, name: bet.user2.name },
                    amount: bet.amount,
                    status: bet.status,
                    active: bet.active,
                    workoutGoal: bet.workoutGoal
                };
            } else {
                // Otherwise, show user1 as the counterpart
                return { 
                    id: bet.id, 
                    counterpart: { id: bet.user1.id, name: bet.user1.name },
                    amount: bet.amount,
                    status: bet.status,
                    active: bet.active,
                    workoutGoal: bet.workoutGoal
                };
            }
        });

        res.status(200).json({ message: "User bets", bets: betList });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};


//This gets the users active bet
const GetUserBet = async (req, res) => {
    const userId = req.user.id;

    try {
        // Fetch the active bet for the user
        const activeBet = await prisma.bet.findFirst({
            where: {
                active: true,
                OR: [
                    { user_id1: userId },
                    { user_id2: userId }
                ]
            },
            include: {
                user1: { select: { id: true, name: true } },
                user2: { select: { id: true, name: true } },
                workoutGoal: { select: { goal: true } } // Include goal details if needed
            }
        });

        if (!activeBet) {
            return res.status(404).json({ message: "No active bet found for the user" });
        }

        // Format response to show counterpart details
        const betData = {
            id: activeBet.id,
            counterpart: activeBet.user_id1 === userId 
                ? { id: activeBet.user2.id, name: activeBet.user2.name } 
                : { id: activeBet.user1.id, name: activeBet.user1.name },
            amount: activeBet.amount,
            status: activeBet.status,
            start_at: activeBet.start_at,
            ends_at: activeBet.ends_at,
            workoutGoal: activeBet.workoutGoal
        };

        res.status(200).json({ message: "User active bet", bet: betData });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};

//Retrieve all completed bets for a user. active needs to be false and anything before the date.Now()
const GetUserCompletedBets = async (req, res) => {
    const userId = req.user.id;

    try {
        const completedBets = await prisma.bet.findMany({
            where: {
                active: false,
                ends_at: { lt: new Date() },
                OR: [
                    { user_id1: userId },
                    { user_id2: userId }
                ]
            },
            include: {
                user1: { select: { id: true, name: true } },
                user2: { select: { id: true, name: true } },
                workoutGoal: { select: { goal: true } } // Include goal details if needed
            }
        });

        const completedBetList = completedBets.map(bet => {
            return {
                id: bet.id,
                counterpart: bet.user_id1 === userId
                    ? { id: bet.user2.id, name: bet.user2.name }
                    : { id: bet.user1.id, name: bet.user1.name },
                amount: bet.amount,
                status: bet.status,
                start_at: bet.start_at,
                ends_at: bet.ends_at,
                workoutGoal: bet.workoutGoal
            };
        });

        res.status(200).json({ message: "User completed bets", bets: completedBetList });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};

//Retrieve all pending bet requests sent by the user.
const GetUserPendingBetsSent = async (req, res) => {
    const userId = req.user.id;

    try {
        const pendingBetsSent = await prisma.bet.findMany({
            where: {
                user_id1: userId,
                status: 'Pending'
            },
            include: {
                user2: { select: { id: true, name: true } }, // Include the counterpart (receiver) details
                workoutGoal: { select: { goal: true } } // Include workout goal details if needed
            }
        });

        const pendingBetList = pendingBetsSent.map(bet => ({
            id: bet.id,
            counterpart: { id: bet.user2.id, name: bet.user2.name },
            amount: bet.amount,
            status: bet.status,
            start_at: bet.start_at,
            ends_at: bet.ends_at,
            workoutGoal: bet.workoutGoal
        }));

        res.status(200).json({ message: "User pending bets sent", bets: pendingBetList });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};

//Retrieve a workout goal associated with a specific bet.
const GetUserWorkoutGoal = async (req, res) => {
    const { betId } = req.params; // Assuming betId is provided as a URL parameter

    try {
        // Find the specific bet and include its associated workout goal
        const bet = await prisma.bet.findUnique({
            where: { id: betId },
            include: { workoutGoal: true }
        });

        // Check if the bet exists and has an associated workout goal
        if (!bet) {
            return res.status(404).json({ message: "Bet not found" });
        }
        
        if (!bet.workoutGoal) {
            return res.status(404).json({ message: "No workout goal associated with this bet" });
        }

        // Respond with workout goal details
        res.status(200).json({ message: "Workout goal retrieved successfully", workoutGoal: bet.workoutGoal });
    } catch (error) {
        res.status(500).json({
            message: "Error with Server",
            error: error.message
        });
    }
};


module.exports = {
    SendBetRequest,
    UpdateBetRequest,
    PendingBetRequest,
    GetUserAllBets,
    CancelBetRequest,
    GetUserBet,
    GetUserCompletedBets,
    GetUserPendingBetsSent,
    GetUserWorkoutGoal
};
