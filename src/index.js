import header from './header.js'
import content from './content.js'
import footer from './footer.js'
import webpackSrc from './asset/webpack.png'
import createAvatar from './createAvatar';
// import './index.less';
import style from './index.less'

console.log(process.env.NODE_ENV)
createAvatar();
var img = new Image();
img.src = webpackSrc;
img.classList.add(style.avatar); // 添加类名

var dom = document.getElementById('root');
dom.append(img);

header()
content()
footer()