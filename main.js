const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const xx = window.localStorage.getItem('x')
const xxObject = JSON.parse(xx)

const hashMap = xxObject || [
    { logo: 'H', url: 'https://haikei.app'},
    { logo: 'L',  url: 'https://layout.bradwoods.io'},
    { logo: 'C',  url: 'https://cssgradient.io'},
    { logo: 'B',  url: 'https://bennettfeely.com/clippy'}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('hettp://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//删除 /开头的内容
}

//html
const render = () => {//重新渲染hash
    $siteList.find('li:not(.last').remove()//删除旧数据
    hashMap.forEach((node, index) => {//获取索引
        console.log(index)
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class='close'>
                     <svg class="icon">
                         <use xlink:href="#icon-guanbi"></use>
                     </svg>
                </div>
            </div>    
        </li>`).insertBefore($lastLi)//从前面插进去

        $li.on('click', () => {//打开新窗口
            window.open(node.url)
        })

// 删除模块
        $li.on('click', '.close', (e) => {
            console.log('删除执行成功')
            e.stopPropagation()//阻止冒泡
            console.log(hashMap)
            hashMap.splice(index,1)//删除当前选择的网页
            render()
        })
    })
}
render()

//添加模块
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是？')
    if (url.indexOf('http') !== 0) {//检测是否添加https，没有就自动补上
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})


//监听网页，自动保存模块
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

//键盘监听
$(document).on('keypress',(e)=>{
    const {key} = e
    for(i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})
