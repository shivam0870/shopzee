import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express';
import userRouter from "./routes/user.js"
import pokemonRouter from "./routes/pokemon.js"
import cors from "cors"
import { Adopted } from './models/adopted.js';

export const app = express();

config({
    path: "./data/config.env",
});



app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pokemon", pokemonRouter);


const checkFeedStatus = async ()=>{
    const adoptedPokemons = await Adopted.find();
    console.log(adoptedPokemons);
    for (let adoptedPokemon of adoptedPokemons){
        const timeDifference = Math.abs(Date.now() - adoptedPokemon.createdAt);
        const isGreaterThan24Hours = timeDifference > 1000 * 60 * 60 * 24; 
        if (isGreaterThan24Hours) await updatePokemonHealth(adoptedPokemon._id) 
    }
}

const updatePokemonHealth = async (id) =>{
    const pokemonToUpdate = await Adopted.findById(id);
    pokemonToUpdate.healthStatus -= 25;
    
    await pokemonToUpdate.save();
}

setInterval(checkFeedStatus, 1000 * 60 * 60); 


app.get("/", (req,res)=>{
    res.send("Home")
})
