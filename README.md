# <b><i>LisTrello</i></b>
LisTrello is a Vue.js web application that produces formatted lists of Trello cards suitable for printing or forwarding from a mobile or desktop device. Also, the formatted cards may be copied and pasted into another application (such as Word) for additional manipulation. 

The code demonstrates various techniques, including:
* how to obtain and use authorisation tokens from Trello.com
* how to format output for printing
* how to submit a form when running on Netlify.com 

I use it for generating set lists for my band, I'm sure you can find many applications for it!

This application is available for use at https://listrello.netlify.app

I used a Trello board during the development of this application. The link to it is https://trello.com/b/VqWfpxIi/listrello
## Potential enhancements
I've had some ideas for enhancements to LisTrello that I may or may not implement. These are listed on the project Trello board mentioned above. If you have any others then let me know via the issues page or message me directly.
## Yarn Usage
Install required packages:
```
yarn install
```
Compile for development, with hot-reload capability:
```
yarn serve
```
Compile and minify for production
```
yarn build
```
Lint and fix files:
```
yarn lint
```