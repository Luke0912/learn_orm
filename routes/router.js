import { Router } from "express";
import { db } from '../db/db.js'; // Assuming you have set up the Drizzle ORM connection
import { usersTable } from '../db/schema.js'; 

const router = Router();

router.get("/health", (req, res) => {
    try {
        res.status(200).json({ message: "Everything is good here 👀" });
    } catch (error) {
        throw new Error("Internal Server Error");
    }
});

router.get("/", async (req, res) => {
    try {
        // Seed data for the usersTable
        const seedData = [
            {
                name: "John Doe",
                age: 30,
                email: "shubham@gmail.com",
                mobileNumber: "1234567890",
                pinnum: "1234",
                address: "123 Main St",
                office_address: "456 Office St",
                rollNumber: "ROLL001",
            },
            {
                name: "Jane Smith",
                age: 25,
                email: "himanshDubeyu@gmail.com",
                mobileNumber: "0987654321",
                pinnum: "5678",
                address: "789 Another St",
                office_address: "101 Business Ave",
                rollNumber: "ROLL002",
            },
        ];

        // Insert data into the usersTable
        for (const user of seedData) {
            await db.insert(usersTable).values(user).execute();
        }

        res.json({ message: "Database seeded successfully! 🎉" });
    } catch (error) {
        console.error("Error seeding database:", error);
        res.status(500).json({ message: "Failed to seed database.", error: error.message });
    }
});




export default router;