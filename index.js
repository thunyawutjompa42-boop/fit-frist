// Import stylesheets
import './style.css';

// Body element
const body = document.querySelector('#body');

// Button elements
const btnSend = document.querySelector('#btnSend');
const btnShare = document.querySelector('#btnShare');
const btnLogIn = document.querySelector('#btnLogIn');
const btnLogOut = document.querySelector('#btnLogOut');
const btnScanCode = document.querySelector('#btnScanCode');
const btnOpenWindow = document.querySelector('#btnOpenWindow');
const btnShortcut = document.querySelector('#btnShortcut');

// Profile elements
const email = document.querySelector('#email');
const userId = document.querySelector('#userId');
const pictureUrl = document.querySelector('#pictureUrl');
const displayName = document.querySelector('#displayName');
const statusMessage = document.querySelector('#statusMessage');

// QR element
const code = document.querySelector('#code');

// Friendship element
const friendShip = document.querySelector('#friendShip');

async function main() {
  // Initialize LIFF SDK
  await liff.init({ liffId: '2012527838-dWpu2I3H' });

  // Try a function
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#FFFF99';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
    case 'web':
      body.style.backgroundColor = '#0066CC';
      break;
  }
  if (liff.isInClient()) {
    btnSend.style.display = 'block';
    btnShare.style.display = 'block';
    btnScanCode.style.display = 'block';
    btnShortcut.style.display = 'block';
    getFriendship();
    getUserProfile();
  } else {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
      btnShare.style.display = 'block';
      btnScanCode.style.display = 'block';
      btnShortcut.style.display = 'block';
      getUserProfile();
      getFriendship();
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  }
  btnOpenWindow.style.display = 'block';
}
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl
    ? profile.pictureUrl
    : 'https://vos.line-scdn.net/imgs/apis/ic_mini.png';
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;
}

btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

btnSend.onclick = () => {
  sendMsg();
};

btnShare.onclick = () => {
  shareMsg();
};

btnScanCode.onclick = () => {
  scanCode();
};

btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: window.location.href,
    external: true,
  });
};

btnShortcut.onclick = async () => {
  await liff.createShortcutOnHomeScreen({
    url: 'https://miniapp.line.me/2012527838-dWpu2I3H',
  });
};

async function sendMsg() {
  if (liff.getContext().type !== 'none') {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'Link',
      },
    ]);
    liff.closeWindow();
  }
}

async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: 'flex',
      altText: 'ส่ง flex message แล้ว...',
      contents: {
        type: 'bubble',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'image',
                  url: 'https://s.imgz.io/2026/10/29/image-288d8f0a989770b18a.png',
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '20:11',
                  gravity: 'center',
                },
                {
                  type: 'image',
                  url: 'https://s.imgz.io/2026/10/30/ezgif-cropped47c78083f8b74bb5.png',
                  position: 'absolute',
                  animated: true,
                  margin: 'none',
                  size: 'sm',
                },
              ],
            },
          ],
          paddingAll: '0px',
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      contents: [],
                      size: 'md',
                      wrap: true,
                      text: 'BetterMaker EP.32',
                      color: '#ffffff',
                      weight: 'bold',
                      margin: 'none',
                      style: 'normal',
                    },
                    {
                      type: 'text',
                      text: 'ความสำเร็จที่ใช่ ต้องพาเราไปใกล้ชีวิตที่อยากมี',
                      color: '#ffffffcc',
                      size: 'sm',
                    },
                    {
                      type: 'button',
                      action: {
                        type: 'uri',
                        label: 'click',
                        uri: 'https://youtube.com/playlist?list=PLN1WaDioztR8&si=s8rOxnk4epk-Pp1h',
                      },
                      style: 'secondary',
                      scaling: true,
                      height: 'sm',
                      color: '#FFA500',
                    },
                    {
                      type: 'button',
                      action: {
                        type: 'uri',
                        label: 'แชร์ต่อให้เพื่อน',
                        uri: 'https://miniapp.line.me/2012527838-dWpu2I3H',
                      },
                      style: 'secondary',
                      height: 'sm',
                      color: '#FF8C00',
                      scaling: true,
                    },
                  ],
                  spacing: 'sm',
                },
              ],
            },
          ],
          paddingAll: '20px',
          backgroundColor: '#464F69',
          background: {
            type: 'linearGradient',
            angle: '0deg',
            startColor: '#696969',
            endColor: '#000000',
          },
        },
      },
    },
  ]);
  liff.closeWindow();
}

async function scanCode() {
  const result = await liff.scanCodeV2();
  code.innerHTML = '<b>Code: </b>' + result.value;
}

async function getFriendship() {
  let msg = 'คุณเป็นเพื่อนกับไลน์แชตบอทแล้ว...';
  const friend = await liff.getFriendship();
  if (!friend.friendFlag) {
    msg =
      '<a href="https://line.me/R/ti/p/@196joznh">Follow our chatbot here!</a>';
  }
  friendShip.innerHTML = msg;
}
