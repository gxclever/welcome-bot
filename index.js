require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ]
});

const WELCOME_ROLE_NAME = '유저';
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;

client.on('ready', () => {
  console.log(`✅ 로그인 완료: ${client.user.tag}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  const welcomeRole = addedRoles.find(role => role.name === WELCOME_ROLE_NAME);

  if (welcomeRole) {
    const channel = newMember.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (channel) {
      const message = `
⊶⊷⊶⊷⊶⊷⋆⊶⊷⊶⊷⊶⊶⊷⊶⊷⊶⊷⋆⊶⊷⊶⊷⊶  
${newMember} 저희 서버에 오신 걸 환영합니다 !!  
모두들 환영해주세요~  

@here 새로운 사람이 왔어요  
⊶⊷⊶⊷⊶⊷⋆⊶⊷⊶⊷⊶⊶⊷⊶⊷⊶⊷⋆⊶⊷⊶⊷⊶  
📣 **주목!**  
여길 확인해 주세요!
      `;
      channel.send(message);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
