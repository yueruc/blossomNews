# INFO30005_BlossomNews

## Group: Blossom

## Group Member: Yiming Ren, Yueru Cheng, Tianyu Zhang, Shican Wu

## Introduction:
This is a web application that is used for poeple who enjoy reading news under different categories, and remember their liked news by just cliking the heart icon.

## Main Functions:

_ "Log in": A user can log in to our system using one out of four combination (username,password) we provided. It will go to the Main Page if the user successfully login in. If the login is failed, it will still stay in the Login Page. 

_ "Log in session": After the user logged in, system will remember his log-in status, thus, when clicking on the log in button again, he will receive a message "Already Logged in" and an option to log out.

_ "Find News by Category": When poeple are browsing our website, their will be six main categories available for them to browse, and under each category there are nine pieces of news fetching directly from an online news api. When user click on each news, it would send them directly to the news webpage.

_ "Like News": When user is browsing the website, a grey heart shape will appear at the top left corner of each piece of news. When user clicks on that, it will turn red.

## Routes:

_ "Login": `/login`
***
Example: https://blossomnews.herokuapp.com/login

Provided combination (username & password): yimingr  900760
                                            yueruc   900709
                                            shicanWu 900940
                                            tianyuz6 901056

_ "News Category": `/:category`
***
Example: https://blossomnews.herokuapp.com/entertainment

_ "Like News": JQuery used in this function, no routes required.


## Reference to source code:

_ "Login":
`controller/controller.js`
`/views/login.pug`
`/public/style.css`

_ "Login Session":
`controller/controller.js`
`/views/logined.pug`
`/public/style.css`

_ "News Category":
`/controller/controller.js`
`/views/default.pug`
`/views/index.pug`
`/views/news.pug`
`/public/style.css`

_ "Like News"
`/views/news.pug`
`/public/style.css`