import { Router } from "express";
import { variables } from "../../../variables.json";
import { PrismaClient } from "@prisma/client";
require("isomorphic-fetch");
const api = Router();

const prisma = new PrismaClient();

async function fetchUser(username) {
  const response = await fetch(variables.GITHUB_URL + username, {
    headers: {
      Authorization: `token ` + variables.GITHUB_TOKEN,
    },
  });
  return await response.json();
}

api.get("/:username", async (request, response) => {
  const { username } = request.params;
  const ifUserIsInData = await prisma.user.findUnique({
    where: { login: username.toLowerCase() },
  });
  if (!ifUserIsInData) {
    const userJson = await fetchUser(username);
    if(userJson.login){
      userJson.login = userJson.login.toLowerCase();
      await prisma.user.create({
        data: {
          id_github: userJson.id,
          login: userJson.login,
          node_id: userJson.node_id,
          avatar_url: userJson.avatar_url,
          gravatar_id: userJson.gravatar_id,
          url: userJson.url,
          html_url: userJson.html_url,
          followers_url: userJson.followers_url,
          following_url: userJson.followers_url,
          gists_url: userJson.gists_url,
          starred_url: userJson.starred_url,
          subscriptions_url: userJson.subscriptions_url,
          organizations_url: userJson.organizations_url,
          repos_url: userJson.repos_url,
          events_url: userJson.events_url,
          received_events_url: userJson.received_events_url,
          type: userJson.type,
          site_admin: userJson.site_admin,
          name: userJson.name,
          company: userJson.company,
          blog: userJson.blog,
          location: userJson.location,
          email: userJson.email,
          bio: userJson.bio,
          twitter_username: userJson.twitter_username,
          public_repos: userJson.public_repos,
          public_gists: userJson.public_gists,
          followers: userJson.followers,
          following: userJson.following,
          created_at: userJson.created_at,
          updated_at: userJson.updated_at,
        },
      });
      const userCreated = await prisma.user.findUnique({
        where: { login: username.toLowerCase() },
      });
      
      response.status(200).json({
        user: userCreated,
      });
    }
  } else{
    response.status(200).json({
      user: ifUserIsInData,
    });
  }
});

export default api;
