# Ma Personal Website

<p style="text-align: center;">
  <img alt="commit activity" src="https://img.shields.io/github/commit-activity/m/EriecTanijaya/personal-website?style=for-the-badge" />
  <img alt="last commit" src="https://img.shields.io/github/last-commit/EriecTanijaya/personal-website.svg?style=for-the-badge" />
  <img alt="version" src="https://img.shields.io/badge/dynamic/json?color=blue&label=version&style=for-the-badge&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FEriecTanijaya%2Fpersonal-website%2Fmaster%2Fpackage.json" />
  
  <a href="https://github.com/EriecTanijaya/personal-website/stargazers" title="stars">
    <img alt="stars" src="https://img.shields.io/github/stars/EriecTanijaya/personal-website?style=for-the-badge" />
  </a>
  
  <a href="https://github.com/EriecTanijaya/personal-website/issues" title="issues">
    <img alt="open issues" src="https://img.shields.io/github/issues/EriecTanijaya/personal-website?style=for-the-badge" />
  </a>
  
  <a href="  https://github.com/EriecTanijaya/personal-website/blob/glitch/LICENSE" title="license">
    <img alt="license" src="https://img.shields.io/github/license/EriecTanijaya/personal-website?style=for-the-badge" />
  </a>
</p>

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
- comment system

## Screenshot

[desktop-default]: https://cdn.glitch.com/f6f41a3d-4a40-45ac-86a0-52ef0a496c26%2Fdesktop-default.png?v=1574323753674 "desktop default"
[desktop-dark]: https://cdn.glitch.com/f6f41a3d-4a40-45ac-86a0-52ef0a496c26%2Fdesktop-dark.png?v=1574323786032 "desktop dark"
[mobile-default]: https://cdn.glitch.com/f6f41a3d-4a40-45ac-86a0-52ef0a496c26%2Fmobile-default.png?v=1574323937908 "mobile default"
[mobile-dark]: https://cdn.glitch.com/f6f41a3d-4a40-45ac-86a0-52ef0a496c26%2Fmobile-dark.png?v=1574323994015 "mobile dark"

<details>
  <summary>Desktop Default</summary>
  
  ![desktop default][desktop-default]
</details>

<details>
  <summary>Desktop Dark</summary>
  
  ![desktop dark][desktop-dark]
</details>

<details>
  <summary>Mobile Default</summary>
  
  ![mobile default][mobile-default]
</details>

<details>
  <summary>Mobile Dark</summary>
  
  ![mobile dark][mobile-dark]
</details>

## How?
- register to [mongodb atlas](https://www.mongodb.com/cloud/atlas)
- Make the .env according to .env.example
  - fill username, password, clustername
  - fill web_url for sitemap
  

## Thanks to

- [node js blog tutorial](https://vegibit.com/node-js-blog-tutorial/) for nodejs blog tutorial

- [express](https://github.com/expressjs/express) for web framework

- [edge](https://github.com/edge-js/edge) for template engine

- [startbootstrap clean blog](https://github.com/BlackrockDigital/startbootstrap-clean-blog) for website theme

- [blacksuan material ocean](https://blacksuan19.me/material-ocean) for color in this website

- [minifier css](https://cssminifier.com/) for minifying my css files

- [animate.css](https://github.com/daneden/animate.css) for some animation

- [stackoverflow](https://stackoverflow.com/), [codepen.io](https://codepen.io/) for code debug and test

- [sitemap](https://www.lazee.xyz/blog/express-sitemap-case-study/) sitemap tuts

- [sharp](https://github.com/lovell/sharp) for image saving and converter

- [bcrypt](https://github.com/dcodeIO/bcrypt.js) for password encryption


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


