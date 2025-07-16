require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ]
});

const WELCOME_ROLE_NAME = '유저'; // 역할 이름
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID; // 채널 ID는 .env에서 불러옴

client.on('ready', () => {
  console.log(`✅ 로그인 완료: ${client.user.tag}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  console.log(`[DEBUG] 역할 업데이트 발생: ${newMember.user.tag}`);

  // 추가된 역할 찾기
  const addedRoles = newMember.roles.cache.filter(
    role => !oldMember.roles.cache.has(role.id)
  );

  // 어떤 역할이 추가됐는지 로그 출력
  if (addedRoles.size > 0) {
    console.log(`[DEBUG] 추가된 역할: ${[...addedRoles.values()].map(r => r.name).join(', ')}`);
  } else {
    console.log(`[DEBUG] 추가된 역할 없음`);
  }

  // '유저' 역할이 새로 추가된 경우에만 메시지 출력
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
      console.log(`[DEBUG] 환영 메시지를 보냅니다.`);
      channel.send(message);
    } else {
      console.log(`[ERROR] 채널을 찾을 수 없습니다. ID: ${WELCOME_CHANNEL_ID}`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
