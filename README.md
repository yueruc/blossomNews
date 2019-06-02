# INFO30005_BlossomNews

## Group: Blossom

## Group Member: Yiming Ren, Yueru Cheng, Tianyu Zhang, Shican Wu

## Introduction:
This is a web application that is used for people who enjoy reading news under different categories, and remember their liked news by just clicking the heart icon.

## Main Functions:

_ "Sign up": User can create an account in our app for future use. After user signed up, he will directly be logged in.

_ "Log in": A user can log in to our system by registering an account. It will go to the Main Page if the user successfully login in. If the login is failed, it will still stay in the Login Page. 

_ "Search": User can type in words in the search bar to search news from our database.

_ "Find News by Category": When poeple are browsing our website, their will be six main categories available for them to browse, and under each category there are nine pieces of news fetching directly from an online news api. When user click on each news, it would send them directly to the news webpage.

_ "Like News & Dislike News": After user click on the news tab, they will be redirected to news detail page, and they can like news. If the user want to dislike the news, they can click on the heart again. The news will become unliked.

_ "Comment News": In news detail page, people can post their comment to the news.

_ "Recommendation": System can display recommending news based on user's preference.

## Routes:
***
_ "Sign up":`/signup`

Example: https://blossomnews.herokuapp.com/signup

***
_ "Login": `/login`

Example: https://blossomnews.herokuapp.com/login

Provided combination (username & password): yimingr  900760
                                            yueruc   900709
                                            shicanWu 900940
                                            tianyuz6 901056
***
_ "News Category": `/:category`

Example: https://blossomnews.herokuapp.com/entertainment

***
_ "Like/Dislike News & Comment News": `/:newsdetail`

Example: http://blossomnews.herokuapp.com/newsdetail/5cd2bf50e1637902ef6ff8cf

***
_ "Search": `/search`

Example: http://blossomnews.herokuapp.com/search

***
_ "Recommendation": `/index`

http://blossomnews.herokuapp.com/index

## Reference to source code:

_ "Login":
`controller/controller.js`
`xontroller/user.js`
`/views/login.pug`
`/public/style.css`

_ "News Category":
`/controller/controller.js`
`/controller/news.js`
`/views/default.pug`
`/views/index.pug`
`/views/news.pug`
`/public/style.css`

_ "Like News & Comment News"
`/controller/controller.js`
`/views/newsdetail.pug`
`/views/news.pug`
`/public/style.css`

_ "Search"
`/controller/controller.js`
`/views/search.pug & searchNotFound.pug`
`/public/style.css`

_ "Recommendation"
`/controller/controller.js`
`/controller/news.js`
`/views/index.pug & default.pug`
`/public/style.css`
