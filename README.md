# Ma Personal Website

     messy af

## Features
- user account register, login, logout
- user password is encrypted
- loginned user can create new post
- user can delete own post
- pagination system
- search feature
- sitemap system
- storing image to webp format (better format for web)
- theme toggler (can switch to dark mode!)


## How?
- register to [mongodb atlas](https://www.mongodb.com/cloud/atlas)
- Make the .env according to .env.example
  - fill username, password, clustername
  - fill web_url for sitemap
  

## Thanks to

[node js blog tutorial](https://vegibit.com/node-js-blog-tutorial/) for nodejs blog tutorial

[startbootstrap clean blog](https://github.com/BlackrockDigital/startbootstrap-clean-blog) for website theme

[blacksuan material ocean](https://blacksuan19.me/material-ocean) for color in this website

[minifier css](https://cssminifier.com/) for minifying my css files

[animate.css](https://github.com/daneden/animate.css) for some animation

[stackoverflow](https://stackoverflow.com/), [codepen.io](https://codepen.io/) for code debug and test

[sitemap](https://www.lazee.xyz/blog/express-sitemap-case-study/) sitemap tuts

[sharp](https://github.com/lovell/sharp) for image saving and converter

[bcrypt](https://github.com/dcodeIO/bcrypt.js) for password encryption


## Note

- when the glitch memory is full,

      git gc
      git prune
      rm -rf .git

  source: [how to free up little space for glitch](https://support.glitch.com/t/running-out-of-disk-space/3009)
  
- register your site to google search console
  there is many way, but this method is easy to do

    - check in folder views > layout > app.edge
    - on the line 6, there is
  
          <meta name="google-site-verification" content="l9ku77J9I_e0gC9Qwd9ZPJ_OeUWotXVGI21tlVVn104" />
          
    - you need change that line with provided meta from google search console
    - you will get that meta when you register

  source: [google search console](https://search.google.com/search-console)


