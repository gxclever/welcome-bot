require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`🤖 로그인 완료: ${client.user.tag}`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  const oldRoles = oldMember.roles.cache;
  const newRoles = newMember.roles.cache;

  const addedRole = newRoles.find(role => !oldRoles.has(role.id));
  if (!addedRole) return;

  console.log(`[DEBUG] 추가된 역할: ${addedRole.name}`);

  if (addedRole.name === "유저") {
    const channel = newMember.guild.channels.cache.find(ch => ch.name === "💬ㅣ메인채팅방");
    if (!channel) {
      console.log("[ERROR] 채널을 찾을 수 없습니다.");
      return;
    }

    channel.send(
      `⊶⊷⊶⊷⊶⊷⋆⊶⊷⊶⊷⊶⊶⊷⊶⊷⊶⊷⋆⊶⊷⊶⊷⊶\n` +
      `${newMember.user} 저희 서버에 오신 걸 환영합니다 !!\n` +
      `모두들 환영해주세요~\n\n` +
      `@here 새로운 사람이 왔어요\n` +
      `⊶⊷⊶⊷⊶⊷⋆⊶⊷⊶⊷⊶⊶⊷⊶⊷⊶⊷⋆⊶⊷⊶⊷⊶\n` +
      `📣 주목!\n` +
      `여길 확인해 주세요!`
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
