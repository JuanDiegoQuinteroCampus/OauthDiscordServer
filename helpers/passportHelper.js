import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { con } from "../db/atlas.js";
import { ObjectId } from "mongodb";

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.discordId);
});

passport.deserializeUser(async (id, done) => {
    try {
      const db = await con();
      const collection = db.collection("discord");
      const user = await collection.find({ discordId: id });
      if (!user) {
        return done(new Error('Usuario no encontrado'), null);
      }
  
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error, null);
    }
  });


const scopes= ['identify', 'email', 'guilds', 'guilds.join']


passport.use(
    new DiscordStrategy(
        {
        clientID: '1154107364937584702',
        clientSecret: 'lPNf_BSoBqG25CRUSResX55NM9QwYAmu',
        callbackURL: 'http://localhost:4000/Bienvenidos/discord/callback',
        scope: scopes,
},
async(accessToken, refreshToken, profile, cb)=> {
    try {
        let db = await con();
        let collection = db.collection("discord");
        let existUser =  await collection.findOne({discordId:profile.id})
        if (existUser) {
            return cb(null, existUser);
        }  
            const newUser = {
                discordId: profile.id,
                username: profile.username,
                global_name:profile.global_name,
                email: profile.email,
                guilds: profile.guilds,
            };
            const result = await collection.insertOne(newUser);

            if (!result.acknowledged) return cb(new Error('Error al crear un nuevo usuario'), null);
               
console.log(profile);
           
             return cb(null, newUser);
        
    } catch (error) {
        console.log(error);
        return cb(error, null)
    }
    
}));



  
// https://discord.com/api/oauth2/authorize?client_id=1133737163553509387&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FBienvenidos%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email%20guilds%20guilds.join

export default passport;
