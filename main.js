const electron=require("electron");
const url=require("url");
const path=require("path");

const {app, BrowserWindow, Menu }=electron;

let mainWindow;

app.on('ready',()=>{
mainWindow=new BrowserWindow({});
console.log(process.platform);

mainWindow.loadURL(
    url.format({
        pathname:path.join(__dirname,"main.html"),
        protocol:"file",
        slashes:true
    }));
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate=[
    {
        label : "Dosya İşlemleri",
        subMenu : [
            {
                label:"Yeni Todo Ekle"
            },
            {
                label:"Tümünü Sil"
            },
            {
                label:"Çıkış",
                acceletor:process.platform=="cmd"?"ctrl+Q":"Command+Q",
                role:"quit"
            }
        ]
    },
    
]

if(process.platform=="win32"){
    mainMenuTemplate.unshift(
        {
            label:app.getName(),
            role:"TODO"
        }
    )
}

if(process.env.NODE_ENV !=="Production"){
    mainMenuTemplate.push(
        {
            label :"Dev Tools",
            subMenu:(
                {
                    label:"Geliştirici Penceresi",
                    click(item,focusedWindow){
                        focusedWindow.toogleDevTools();
                    },
                    label:"Yenile",
                    role:"reload"
                }
            )
        }
    )
}