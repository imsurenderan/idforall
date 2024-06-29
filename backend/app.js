import express from "express";
import bodyParser from "body-parser";
import { createLibp2p } from "libp2p";
import { createHelia } from "helia";
import { createOrbitDB } from "@orbitdb/core";
import { LevelBlockstore } from "blockstore-level";
import { Libp2pOptions } from "./config/index.js";

const app = express();
app.use(bodyParser.json());

let db;

const init = async () => {
  try {
    // Create an IPFS instance
    const blockstore = new LevelBlockstore("./ipfs/blocks");
    const libp2p = await createLibp2p(Libp2pOptions);
    const ipfs = await createHelia({ libp2p, blockstore });

    // Initialize OrbitDB
    const orbitdb = await createOrbitDB({ ipfs });
    db = await orbitdb.open("users-db", { type: "documents" });

    console.log("Database address:", db.address);
  } catch (error) {
    console.error("Error initializing IPFS and OrbitDB:", error);
  }
};

init();

const generateUID = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uid = "";

  for (let i = 0; i < 3; i++) {
    uid += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  uid += "-";

  for (let i = 0; i < 6; i++) {
    if (i === 3) uid += "-";
    uid += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
  }

  return uid;
};

// Save user data
app.post("/identity", async (req, res) => {
  try {
    const { fullName, nationalID, dateOfBirth } = req.body;
    const user = {
      _id: new Date().toISOString(),
      fullName,
      nationalID,
      dateOfBirth,
      UID: generateUID(),
      timestamp: new Date().toISOString(),
    };
    console.log(user);
    const hash = await db.put(user);
    res.status(200).json({ success: true, hash, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user by UID
app.get("/identity/:id", async (req, res) => {
  try {
    const users = await db.all();
    console.log(users);
    const user = users.find((user) => user.UID === req.params.uid);
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default app;
